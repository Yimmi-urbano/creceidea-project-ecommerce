import { uploadImage } from "@/infrastructure/upload/uploadRepository";
import { Upload } from "@/domain/upload/Upload";

export const postUploadImage = async (file: File): Promise<Upload | null> => {
  return await uploadImage(file);
};