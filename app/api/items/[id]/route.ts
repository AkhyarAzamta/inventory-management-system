import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Classifications, Group, PrismaClient, Units } from '@prisma/client';
import { deleteImage } from '@/utils/file-uploader';

// PATCH method to update an item
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params; // Ensure that params is awaited
  try {
    // Ensure the payload is present and valid
    const payload = await req.json();
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Ensure the id is present
    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    // Perform the update in the database
    const updatedItem = await prisma.items.update({
      where: { itemCode: id }, // Using itemCode as the unique identifier
      data: {
        itemCode: payload.itemCode,
        zahirCode: payload.zahirCode,
        itemDescription: payload.itemDescription || null,
        unit: payload.unit as Units,
        group: payload.group as Group,
        classification: payload.classification as Classifications,
        price: payload.price ?? 0,
        stock: payload.stock ?? 0,
        image: payload.image ?? null,
        itemStatus: payload.itemStatus,
        // updatedAt: new Date(),
        createdBy: payload.createBy,
        updatedBy: payload.updatedBy,
      },
    });

    // Send response with the updated item
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// DELETE method to remove an item
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const items = await prisma.items.findUnique({
      where: { id: parseInt(id) },
    })

    if (!items) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    } else if (items.image) {
      await deleteImage(items.image);
    }

    const deletedItem = await prisma.items.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(deletedItem);
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
