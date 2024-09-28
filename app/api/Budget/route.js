// pages/api/budgets.js

import CategoryBudget from '@/app/(models)/Budget';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const budgets = await CategoryBudget.find();
    return NextResponse.json({ budgets });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch budgets' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { category, budgetType, budget } = await req.json();
    const newBudget = new CategoryBudget({ category, budgetType, budget });
    await newBudget.save();
    return NextResponse.json({ budget: newBudget });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create budget' },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, budget } = await req.json();
    const updatedBudget = await CategoryBudget.findByIdAndUpdate(
      id,
      { budget },
      { new: true }
    );
    return NextResponse.json({ budget: updatedBudget });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update budget' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await CategoryBudget.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete budget' },
      { status: 500 }
    );
  }
}
