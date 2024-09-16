// pages/api/categoryBudgets.js
import CategoryBudget from '@/app/(models)/Budget';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const budgets = await CategoryBudget.find();
    return NextResponse.json({ budgets });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch category budgets' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { category, budget } = await req.json();
    const newBudget = await CategoryBudget.findOneAndUpdate(
      { category },
      { budget },
      { upsert: true, new: true }
    );
    return NextResponse.json({ budget: newBudget });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update category budget' },
      { status: 500 }
    );
  }
}
