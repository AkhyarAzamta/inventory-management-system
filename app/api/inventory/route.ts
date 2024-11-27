import { NextResponse } from 'next/server'
import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const inventory = await db.items.findMany();
    console.log(inventory);
    return NextResponse.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}