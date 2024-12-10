import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { uploadImage } from '@/utils/file-uploader';
import { z } from 'zod';
import { Classifications, Group, Units } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const result = await db.items.create({
      data: {
        itemCode: request.itemCode,
        zahirCode: request.zahirCode,
        itemDescription: request.itemDescription ?? null,
        unit: request.unit as Units, // Assuming `unit` is an enum, adjust if necessary
        group: request.group as Group, // Assuming `group` is an enum, adjust if necessary
        classification: request.classification as Classifications, // Assuming `classification` is an enum
        price: request.price ?? null,
        stock: request.stock ?? 0,
        image: request.image ?? '',
        itemStatus: 'Active',
        createdBy: 'admin',
        updatedBy: 'admin',
        createdAt: request.createdAt ? new Date(request.createdAt) : new Date(),
        updatedAt: request.updatedAt ? new Date(request.updatedAt) : new Date(),
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const inventory = await db.items.findMany();
    console.log(inventory);
    return NextResponse.json(inventory, { status: 200 });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}