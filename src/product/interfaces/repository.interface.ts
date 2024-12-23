import { Product } from '../product.types';

interface IProductRepository {
    create(product: Product): Promise<Product>;
}

export default IProductRepository;
