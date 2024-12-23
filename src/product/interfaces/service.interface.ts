import { Product } from '../product.types';

interface IProductService {
    create(product: Product): Promise<Product>;
}
export default IProductService;
