import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from 'config';
import { injectable } from 'inversify';
import { FileData, IStorageService, UploadResponse } from './storage.interface';
import { v4 } from 'uuid';

@injectable()
class CloudinaryService implements IStorageService {
    constructor() {
        cloudinary.config({
            cloud_name: config.get('storage.CLOUDINARY_NAME'),
            api_key: config.get('storage.CLOUDINARY_API_KEY'),
            api_secret: config.get('storage.CLOUDINARY_SECRET'),
        });
    }
    async upload(file: FileData): Promise<UploadResponse> {
        try {
            const data = await this.uploadBuffer(file.file);
            const payloadResult: UploadResponse = {
                name: data.original_filename,
                url: data.secure_url,
                id: data.public_id,
            };

            return payloadResult;
        } catch (error) {
            console.error('Cloudinary upload failed:', error);
            throw new Error('File upload to Cloudinary failed');
        }
    }

    async destroy(id: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(id);
        } catch (error) {
            console.error('Cloudinary destroy failed:', error);
            throw new Error('File destroy from Cloudinary failed');
        }
    }

    uploadBuffer(file: Buffer) {
        return new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto', filename_override: v4() },
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error as Error);
                    }
                },
            );

            stream.end(file);
        });
    }
}

export { CloudinaryService };
