import Ticket from '@/app/(models)/Ticket';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { writeFile } from 'fs/promises';
import path from 'path';
import dbConnect from '@/app/lib/dbConnect';

async function encodeFileToBase64(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

// Add this utility function at the top of your file
function getCategoryLevels(category) {
  const year = category.slice(-4);
  const month = category.slice(0, 2);
  const quarter = `Q${Math.ceil(parseInt(month) / 3)}${year}`;

  return {
    categoryMonth: category,
    categoryQuarter: quarter,
    categoryYear: year,
  };
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundTicket = await Ticket.findOne({ _id: id });

    if (!foundTicket) {
      return NextResponse.json(
        { message: 'Ticket not found' },
        { status: 404 }
      );
    }

    // The estimatedCosts will be automatically included due to the virtual property
    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    await Ticket.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Ticket Deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;
    let ticketData;

    // Check the content type of the request
    const contentType = req.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      // If it's JSON data (likely from drag-and-drop)
      ticketData = await req.json();
    } else {
      // If it's form data (likely from screenshot upload)
      const formData = await req.formData();
      ticketData = Object.fromEntries(formData.entries());

      // Handle screenshots
      let screenshots = [];
      if (ticketData.screenshots) {
        screenshots = JSON.parse(ticketData.screenshots);
      }

      // Handle new file uploads
      for (let i = 0; formData.get(`file${i}`); i++) {
        const file = formData.get(`file${i}`);
        const base64 = await encodeFileToBase64(file);
        screenshots.push(base64);
      }

      ticketData.screenshots = screenshots;
    }

    // Convert hours to number
    if (ticketData.hours) ticketData.hours = Number(ticketData.hours);

    // Update category levels if category has changed
    if (ticketData.category) {
      const categoryLevels = getCategoryLevels(ticketData.category);
      Object.assign(ticketData, categoryLevels);
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(id, ticketData, {
      new: true,
      runValidators: true,
    });

    console.log('Ticket updated:', updatedTicket);

    return NextResponse.json(
      { message: 'Ticket Updated', ticket: updatedTicket },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error', error: error.message },
      { status: 500 }
    );
  }
}
