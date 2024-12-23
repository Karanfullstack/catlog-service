import { inject, injectable } from 'inversify';
import IProductService from './interfaces/service.interface';
import { Product } from './product.types';
import { TYPES } from '../const';
import IProductRepository from './interfaces/repository.interface';

@injectable()
class ProductService implements IProductService {
    constructor(@inject(TYPES.ProductRepository) private repo: IProductRepository) {}
    async create(product: Product): Promise<Product> {
        return this.repo.create(product);
    }
}

export default ProductService;
