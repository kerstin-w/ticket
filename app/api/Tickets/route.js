import Ticket from '../../(models)/Ticket';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { writeFile } from 'fs/promises';
import path from 'path';
import dbConnect from '@/app/lib/dbConnect';
import { getCategoryLevels } from '@/app/utils/categoryUtils';

async function encodeFileToBase64(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function POST(req) {
  await dbConnect();
  try {
    const formData = await req.formData();
    const ticketData = Object.fromEntries(formData.entries());

    // Handle file uploads
    const screenshots = [];
    for (let i = 0; formData.get(`file${i}`); i++) {
      const file = formData.get(`file${i}`);
      const base64 = await encodeFileToBase64(file);
      screenshots.push(base64);
    }

    ticketData.screenshots = screenshots;

    // Convert hours and costs to numbers
    if (ticketData.hours) ticketData.hours = Number(ticketData.hours);

    // Add category levels
    const categoryLevels = getCategoryLevels(ticketData.category);
    Object.assign(ticketData, categoryLevels);

    await Ticket.create(ticketData);
    return NextResponse.json({ message: 'Ticket Created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const tickets = await Ticket.find();
    console.log(`Found ${tickets.length} tickets`);
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
