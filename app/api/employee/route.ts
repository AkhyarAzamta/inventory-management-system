import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const result = await db.employees.create({
      data: {
        fullName: request.fullName,
        address: request.address,
        phone: request.phone,
        position: "Admin",
        shift: "A",
      },
    });
    // Return success response
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
  }
}