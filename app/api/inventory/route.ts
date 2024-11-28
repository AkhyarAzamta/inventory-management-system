import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const inventory = await db.items.findMany();
    return NextResponse.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const item = {
      ...request,
      id: '140201',
    }
    console.log('ini request nya ya: ',request);
    return NextResponse.json(item);
  } catch (error: any) {
    console.error(error);
}
}
// export async function POST(req: Request) {
//   try {
//     const request = await req.json();
// console.log(request);
//     if (
//       !request.itemCode ||
//       !request.unit ||
//       !request.group ||
//       !request.classification
//     ) {
//       return new Response(
//         JSON.stringify({
//           message: "Invalid request body. Missing required fields.",
//         }),
//         { status: 400 }
//       );
//     }

//     const item = await db.items.create({
//       data: {
//         itemCode: request.itemCode,
//         zahirCode: request.zahirCode,
//         itemDescription: request.itemDescription,
//         unit: request.unit,
//         group: request.group,
//         classification: request.classification,
//         price: parseFloat(request.price) || 0,
//         stock: parseInt(request.stock) || 0,
//         image: request.image,
//         createBy: "userId", // Pastikan ini sesuai dengan ID user
//         updateBy: "userId", // Pastikan ini sesuai dengan ID user
//       },
//     });

//     return new Response(
//       JSON.stringify({
//         code: 201,
//         message: "Item created successfully",
//         data: item,
//       }),
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({
//         message: "Internal Server Error",
//         error: error.message || "Unknown error",
//       }),
//       { status: 500 }
//     );
//   }
// }




