import { uploadImage } from "@/src/infrastructure/repositories/uploadRepository";

export const postUploadImage = async (file: File): Promise<string> => {
  return await uploadImage(file);
};