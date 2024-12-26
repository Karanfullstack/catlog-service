import { inject, injectable } from 'inversify';
import IProductService from './interfaces/service.interface';
import { Product, UpdateProduct } from './product.types';
import { TYPES } from '../const';
import IProductRepository from './interfaces/repository.interface';
import { IStorageService } from '../common/_services/storage/storage.interface';
import createHttpError from 'http-errors';
@injectable()
class ProductService implements IProductService {
    constructor(
        @inject(TYPES.ProductRepository) private repo: IProductRepository,
        @inject(TYPES.StorageService) private storage: IStorageService,
    ) {}

    async create(product: Omit<Product, 'image'>, image: Buffer): Promise<Product> {
        const uploadImage = await this.storage.upload({ file: image });
        return this.repo.create({ ...product, image: uploadImage.name });
    }

    async update(product: UpdateProduct, image: Buffer | null): Promise<Product | null> {
        const findProduct = await this.repo.findById(product._id!);
        if (!findProduct) {
            const err = createHttpError(404, 'Product not found');
            throw err;
        }
        let productImage: string | undefined;
        if (image) {
            const imageName = await this.storage.upload({ file: image });
            productImage = imageName.name;
            await this.storage.destroy(findProduct.image);
        }
        const updatedProdudct: Product = {
            ...product,
            image: productImage ? productImage : findProduct.image,
            _id: findProduct._id,
        };
        return await this.repo.update(updatedProdudct);
    }
}

export default ProductService;
