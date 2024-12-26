import { Product } from '../product.types';

interface IProductRepository {
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product | null>;
    findById(id: string): Promise<Product | null>;
}

export default IProductRepository;
