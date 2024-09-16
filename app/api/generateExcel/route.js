// pages/api/generateExcel.js
import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import Ticket from '../../(models)/Ticket';

export async function GET() {
  try {
    // Fetch all tickets from the database
    const tickets = await Ticket.find();

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tickets');

    // Add headers
    worksheet.addRow([
      'Title',
      'Description',
      'Category',
      'Priority',
      'Progress',
      'Status',
      'Type',
      'Hours',
      'Costs',
      'Created At',
      'Updated At',
    ]);

    // Add data
    tickets.forEach((ticket) => {
      worksheet.addRow([
        ticket.title,
        ticket.description,
        ticket.category,
        ticket.priority,
        ticket.progress,
        ticket.status,
        ticket.type,
        ticket.hours,
        ticket.costs,
        ticket.createdAt,
        ticket.updatedAt,
      ]);
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Set response headers
    const headers = new Headers();
    headers.append('Content-Disposition', 'attachment; filename=tickets.xlsx');
    headers.append(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    // Return the Excel file
    return new NextResponse(buffer, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error('Error generating Excel file:', error);
    return NextResponse.json(
      { error: 'Failed to generate Excel file' },
      { status: 500 }
    );
  }
}
