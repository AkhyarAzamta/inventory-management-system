import { deleteImage, updateImage, uploadImage } from "@/utils/file-uploader";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get('image') as File | null;
  const pathname = formData.get('pathname') as string;
  if (!image) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  try {
    const imageUrl = await uploadImage(image, pathname); // Proses file gambar
    // console.log(imageUrl);
    return NextResponse.json(imageUrl);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get('image') as File | null;
  const { searchParams } = new URL(req.url);
  const existingImagePath = searchParams.get('existingImagePath');
  
  if (!image) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  if (!existingImagePath) {
    return NextResponse.json({ error: "Existing image path is required" }, { status: 400 });
  }

  try {
    const updatedImageUrl = await updateImage(existingImagePath, image); // Update gambar
    return NextResponse.json({ updatedImageUrl });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imagePath = searchParams.get('imagePath');
  
  if (!imagePath) {
    return NextResponse.json({ error: "Image path is required" }, { status: 400 });
  }

  try {
    await deleteImage(imagePath); // Hapus gambar
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
