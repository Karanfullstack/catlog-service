import { injectable } from 'inversify';
import IProductRepository from './interfaces/repository.interface';
import ProductModel from './product.model';
import { Product } from './product.types';

@injectable()
class ProductRepository implements IProductRepository {
    async create(product: Product): Promise<Product> {
        return await ProductModel.create(product);
    }
    async update(product: Product): Promise<Product | null> {
        return await ProductModel.findByIdAndUpdate(product._id, product, { new: true });
    }
    async findById(id: string): Promise<Product | null> {
        return await ProductModel.findById(id);
    }
}

export default ProductRepository;
