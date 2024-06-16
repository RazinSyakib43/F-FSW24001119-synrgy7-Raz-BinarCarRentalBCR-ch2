import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary';

export async function uploadToCloudinary(file: any): Promise<UploadApiResponse> {
    const fileBase64 = file?.buffer.toString("base64");
    const fileString = `data:${file?.mimetype};base64,${fileBase64}`;

    try {
        const result = await cloudinary.uploader.upload(fileString);
        return result;
    } catch (error) {
        throw error;
    }
}
