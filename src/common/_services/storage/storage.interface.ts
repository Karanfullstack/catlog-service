interface FileData {
    file: Buffer;
}

interface UploadResponse {
    url: string;
    id: string;
    name: string;
}
interface IStorageService {
    upload(file: FileData): Promise<UploadResponse>;
}
export { FileData, UploadResponse, IStorageService };
