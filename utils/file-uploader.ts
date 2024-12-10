import { stat, mkdir, unlink } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
// import { File } from "formidable"; // Sesuaikan dengan cara upload file

// Fungsi untuk membuat atau meng-upload gambar
export async function uploadImage(image: File, pathname: string): Promise<string> {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedMimeTypes.includes(image.type)) {
    throw new Error("Invalid file type");
  }

  const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
  if (image.size > maxSizeInBytes) {
    throw new Error("File size exceeds limit");
  }

  // Mengonversi gambar ke buffer
  const buffer = Buffer.from(await image.arrayBuffer());

  // const relativeUploadDir = pathname;
  // Membuat direktori upload dinamis berdasarkan tanggal
  // const relativeUploadDir = `/uploads/${new Date(Date.now())
  //   .toLocaleDateString("id-ID", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   })
  //   .replace(/\//g, "-")}`;
  const uploadDir = join(process.cwd(), "public", pathname);

  // Pastikan direktori ada
  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      throw new Error("Error creating upload directory");
    }
  }

  // Membuat nama file unik
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${uniqueSuffix}.webp`; // Ekstensi .webp
  const filePath = `${uploadDir}/${filename}`;

  // Konversi gambar ke format WebP
  try {
    await sharp(buffer)
      .webp({ quality: 80 }) // Kualitas 80%
      .toFile(filePath);
  } catch (e) {
    throw new Error("Error processing image");
  }

  // Return URL relatif dari file yang diunggah
  return `${pathname}/${filename}`;
}

// Fungsi untuk membaca gambar yang telah di-upload
export async function getImage(filePath: string): Promise<Buffer> {
  const fullPath = join(process.cwd(), "public", filePath);
  try {
    await stat(fullPath); // Pastikan file ada
    return await sharp(fullPath).toBuffer(); // Mengonversi gambar ke buffer jika perlu
  } catch (e) {
    throw new Error("File not found");
  }
}

// Fungsi untuk memperbarui gambar
export async function updateImage(existingFilePath: string, newImage: File): Promise<string> {
  // Hapus gambar lama
  await deleteImage(existingFilePath);

  // Upload gambar baru
  return await uploadImage(newImage, existingFilePath);
}

// Fungsi untuk menghapus gambar
export async function deleteImage(filePath: string): Promise<void> {
  const fullPath = join(process.cwd(), "public", filePath);
  try {
    await unlink(fullPath); // Hapus file gambar
  } catch (e) {
    throw new Error("Error deleting file");
  }
}
