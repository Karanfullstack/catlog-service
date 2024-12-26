import { inject, injectable } from 'inversify';
import IProductService from './interfaces/service.interface';
import { Product } from './product.types';
import { TYPES } from '../const';
import IProductRepository from './interfaces/repository.interface';
import { IStorageService } from '../common/_services/storage/storage.interface';
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
}

export default ProductService;
