import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const result = await prisma.employees.create({
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