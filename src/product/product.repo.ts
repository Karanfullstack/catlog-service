import { injectable } from 'inversify';
import IProductRepository from './interfaces/repository.interface';
import ProductModel from './product.model';
import { Product } from './product.types';

@injectable()
class ProductRepository implements IProductRepository {
    async create(product: Product): Promise<Product> {
        return await ProductModel.create(product);
    }
}

export default ProductRepository;
