import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = await params; // Ensure that params is awaited
    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }
    const body = await req.json();
    const updatedEmployee = await prisma.employees.update({
      where: { id: id }, // Using id as the unique identifier
      data: {
        fullName: body.fullName,
        address: body.address,
        phone: body.phone,
        position: body.position,
        shift: body.shift,
        // updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedEmployee);
    } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json({ error: 'Failed to update employee' }, { status: 500 });
  }
}