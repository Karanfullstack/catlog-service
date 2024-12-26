import { Product } from '../product.types';

interface IProductService {
    create(product: Omit<Product, 'image'>, image: Buffer): Promise<Product>;
}
export default IProductService;
