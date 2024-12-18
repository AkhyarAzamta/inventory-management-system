// utils/formDataUtil.ts
export const createFormData = (row: Record<string, any>, fileFields: string[] = []): FormData => {
  const formData = new FormData();
  for (const key in row) {
    if (fileFields.includes(key) && row[key] instanceof File) {
      formData.append(key, row[key]); // Hanya untuk file
    } else if (!fileFields.includes(key)) {
      formData.append(key, row[key]); // Data biasa
    }
  }
  return formData;
};
