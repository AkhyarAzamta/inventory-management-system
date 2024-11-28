
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(request: Request) {
  const updatedItem = await request.json();
  try {
    const updatedData = await db.items.update({
      where: { id: updatedItem.id },
      data: updatedItem,
    });
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    await db.items.delete({ where: { id } });
    return NextResponse.json({ message: 'Item deleted' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}