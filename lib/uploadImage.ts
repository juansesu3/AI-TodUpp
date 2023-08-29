import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  const bucketId = process.env.BUCKET_ID;
  if (!bucketId) {
    throw new Error("Bucket ID is not defined in the environment variables.");
  }

  const fileUploaded = await storage.createFile(
    bucketId,
    ID.unique(),
    file
  );
  return fileUploaded;
};

export default uploadImage;