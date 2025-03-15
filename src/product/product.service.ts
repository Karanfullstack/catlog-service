import { inject, injectable } from 'inversify';
import IProductService from './interfaces/service.interface';
import { Product, UpdateProduct } from './product.types';
import { TYPES } from '../const';
import IProductRepository, { ProductResponse } from './interfaces/repository.interface';
import { IStorageService } from '../common/_services/storage/storage.interface';
import createHttpError from 'http-errors';

import { IQuery } from '../common/types';
@injectable()
class ProductService implements IProductService {
    constructor(
        @inject(TYPES.ProductRepository) private repo: IProductRepository,
        @inject(TYPES.StorageService) private storage: IStorageService,
    ) {}

    async create(product: Omit<Product, 'image'>, image: Buffer): Promise<Product> {
        const uploadImage = await this.storage.upload({ file: image });
        const imagePayload = { image: uploadImage.url, public_id: uploadImage.id };
        return this.repo.create({ ...product, image: imagePayload });
    }

    async update(product: UpdateProduct, image: Buffer | null): Promise<Product | null> {
        const findProduct = await this.repo.findById(product._id!);
        if (!findProduct) {
            const err = createHttpError(404, 'Product not found');
            throw err;
        }
        let productImage: { image: string; public_id: string } | null = null;
        if (image) {
            const imageName = await this.storage.upload({ file: image });
            productImage = { image: imageName.url, public_id: imageName.id };
            await this.storage.destroy(findProduct.image.public_id);
        }
        const updatedProdudct: Product = {
            ...product,
            image: productImage ? productImage : findProduct.image,
        };
        return await this.repo.update(updatedProdudct);
    }

    async getAll(query: IQuery): Promise<ProductResponse<Product>> {
        return await this.repo.findAll(query);
    }
}

export default ProductService;
