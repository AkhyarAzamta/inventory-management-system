import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Units, Group, Classifications, ItemStatus } from '@prisma/client'; // Import enums from Prisma

// Define the Zod schema for the incoming request
const inventoryItemSchema = z.object({
  itemCode: z.string(),
  zahirCode: z.string().optional(),
  itemDescription: z.string().optional(),
  unit: z.nativeEnum(Units), // Cast to tuple type
  group: z.nativeEnum(Group), // Cast to tuple type
  classification: z.nativeEnum(Classifications), // Cast to tuple type
  itemStatus: z.nativeEnum(ItemStatus).optional(),
  price: z.number().optional(),
  stock: z.number().min(0).optional(),
  image: z.string().optional(),
  createBy: z.string().optional(),
  updateBy: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export async function POST(req: Request) {
  try {
    const request = await req.json();

    // Validate the request body with Zod schema
    const parsedData = inventoryItemSchema.parse(request);

    // After validation, save to the database using Prisma
    const result = await prisma.items.create({
      data: {
        itemCode: parsedData.itemCode,
        zahirCode: parsedData.zahirCode ?? null, // Default to null if undefined
        itemDescription: parsedData.itemDescription ?? null, // Default to null if undefined
        unit: parsedData.unit, // Use the parsed `unit` directly
        group: parsedData.group, // Use the parsed `group` directly
        classification: parsedData.classification, // Use the parsed `classification` directly
        price: parsedData.price ?? 0, // Default to 0 if price is undefined
        stock: parsedData.stock ?? 0, // Default to 0 if stock is undefined
        image: parsedData.image ?? '', // Default to an empty string if image is undefined
        itemStatus: parsedData.itemStatus, // Default to 'Active' if not provided
        createdBy: parsedData.createBy ?? 'admin',  // Default to 'admin' if not provided
        updatedBy: parsedData.updateBy ?? 'admin',  // Default to 'admin' if not provided
        createdAt: parsedData.createdAt ? new Date(parsedData.createdAt) : new Date(),
        updatedAt: parsedData.updatedAt ? new Date(parsedData.updatedAt) : new Date(),
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to create item', details: error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const inventory = await prisma.items.findMany();
    console.log(inventory);
    return NextResponse.json(inventory, { status: 200 });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
