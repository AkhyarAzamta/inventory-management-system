import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { uploadImage } from '@/utils/file-uploader';
import { z } from 'zod';

// Define the Zod schema for the incoming request
// const inventoryItemSchema = z.object({
//   itemCode: z.string(),
//   zahirCode: z.string().optional(),
//   itemDescription: z.string().optional(),
//   unit: z.enum(["Pcs", "Kg"]), 
//   group: z.enum(["Lokal", "Import", "Random"]),
//   classification: z.enum(["Sparepart", "Assets", "Consumable", "Bearing", "Bolt", "Belt"]),
//   price: z.number().optional(),
//   stock: z.number().min(0).optional(),
//   image: z.string().optional(),
//   itemStatus: z.string().optional(), // ItemStatus is now a string
//   createBy: z.string().optional(),
//   updateBy: z.string().optional(),
//   createdAt: z.string().optional(),
//   updatedAt: z.string().optional(),
// });
export async function POST(req: Request) {
  try {
    const request = await req.json();
    console.log(request);
    // const parsedData = inventoryItemSchema.parse(request); // This will throw an error if invalid
    // Parse and validate the request body with Zod schema
    // const result = await db.items.create({
    //   data: {
    //     itemCode: 'e',
    //     zahirCode: 'l', // Default to null if undefined
    //     itemDescription: 'request.itemDescription ?? null', // Default to null if undefined
    //     unit: 'Pcs', // Use the Units enum defined in Prisma
    //     group: 'Lokal', // Use the Group enum defined in Prisma
    //     classification: 'Sparepart', // Use the Classifications enum defined in Prisma
    //     price: 2000, // Default to null if price is undefined
    //     stock: 2, // Default to 0 if stock is undefined
    //     image: '', // Default to an empty string if image is undefined
    //     itemStatus: 'Active', // Assuming 'Active' is a valid value for ItemStatus enum
    //     createBy: 'admin', // Assuming this is a placeholder, replace with actual user ID as needed
    //     updateBy: 'admin', // Replace with actual user ID as needed
    //     // createdAt: request.createdAt ? new Date(request.createdAt) : new Date(), // Ensure createdAt is a Date
    //     // updatedAt: request.updatedAt ? new Date(request.updatedAt) : new Date(), // Ensure updatedAt is a Date
    //   },
    // });
    
    // Now that the data is validated, save it to the database using Prisma
    const result = await db.items.create({
      data: {
        itemCode: request.itemCode,
        zahirCode: request.zahirCode,
        itemDescription: request.itemDescription ?? null,
        unit: request.unit as any, // Assuming `unit` is an enum, adjust if necessary
        group: request.group as any, // Assuming `group` is an enum, adjust if necessary
        classification: request.classification as any, // Assuming `classification` is an enum
        price: request.price ?? null,
        stock: request.stock ?? 0,
        image: request.image ?? '',
        itemStatus: 'Active',
        createBy: 'admin',
        updateBy: 'admin',
        // createdAt: request.createdAt ? new Date(request.createdAt) : new Date(),
        // updatedAt: request.updatedAt ? new Date(request.updatedAt) : new Date(),
      },
    });
    return NextResponse.json(result);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const request = await req.json();
//     console.log(request);
//     // const result = await db.suppliers.create({
//     //   data: {
//     //     supplierName: request.supplierName,
//     //     createBy: "user-uuid",
//     //     updateBy: "user-uuid",
//     //   },
//     // });
//     // Return success response
//     return NextResponse.json(request);
//   } catch (error: any) {
//     if (error instanceof z.ZodError) {
//       console.log('Validation issues:', error.issues); // Log detail error Zod
//       return NextResponse.json(
//         { error: 'Invalid request data', details: error.issues },
//         { status: 400 }
//       );
//     }
    
//     // Handle other errors (e.g., database errors)
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
//   }
// }

export async function GET(request: Request) {
  try {
    const inventory = await db.items.findMany();
    return NextResponse.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}