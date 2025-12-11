import { uploadImage } from "@/src/infrastructure/repositories/upload/uploadRepository";
import { Upload } from "@/src/domain/upload/Upload";

export const postUploadImage = async (file: File): Promise<Upload | null> => {
  return await uploadImage(file);
};