import sharp from 'sharp';
import { stat, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function uploadImage(image: File) {

  // if (!image) {
  //   return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  // }
console.log(image);
  
  // Mengonversi gambar ke buffer
  const buffer = Buffer.from(await image.arrayBuffer());

  // Membuat direktori upload dinamis berdasarkan tanggal
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error("Error while creating directory:", e);
      return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.webp`; // Mengubah ekstensi menjadi .webp
    const filePath = `${uploadDir}/${filename}`;

    // Mengonversi gambar ke format WebP
    await sharp(buffer)
      .webp({ quality: 80 }) // Menetapkan kualitas 80% untuk kompresi WebP
      .toFile(filePath);

    const fileUrl = `${relativeUploadDir}/${filename}`;

    // Simpan URL file ke database atau melakukan operasi lainnya
    // const result = await prisma.article.create({
    //   data: {
    //     title,
    //     content,
    //     image: fileUrl,
    //   },
    // });

    return NextResponse.json({ image: fileUrl });
  } catch (e) {
    console.error("Error during file processing:", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
