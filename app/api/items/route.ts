import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Units, Group, Classifications, ItemStatus } from '@prisma/client'; // Import enums from Prisma
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

// Define the Zod schema for the incoming request
const inventoryItemSchema = z.object({
  itemCode: z.string(),
  zahirCode: z.string().optional(),
  itemDescription: z.string().optional(),
  unit: z.nativeEnum(Units), // Cast to tuple type
  group: z.nativeEnum(Group), // Cast to tuple type
  classification: z.nativeEnum(Classifications), // Cast to tuple type
  itemStatus: z.nativeEnum(ItemStatus).optional().default('Active'),
  price: z.number().optional(),
  stock: z.number().min(0).optional(),
  image: z.string().optional().nullable(),  
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!req) {
    return NextResponse.json({ error: 'Request is null' }, { status: 400 });
  }
  // console.log(session);
  try {
    const request = await req.json();
// console.log(request);
    // Validate the request body with Zod schema
    const parsedData = inventoryItemSchema.parse(request);
    console.log('Parsed data:', parsedData);
    // After validation, save to the database using Prisma
    const result = await prisma.items.create({
      data: {
        ...parsedData,
        itemStatus: 'Active', // Default to 'Active' if not provided
        createdBy: session.user.id,  // Default to 'admin' if not provided
        updatedBy: session.user.id,  // Default to 'admin' if not provided
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    });
console.log('Result :',result);
    // return NextResponse.json(request);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create item', details: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const inventory = await prisma.items.findMany({
      include: {
        user: true
      }
    });
    console.log('inventory',inventory);
    return NextResponse.json(inventory);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create item', details: error }, { status: 500 });
  }
}