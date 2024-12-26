import { Product, UpdateProduct } from '../product.types';

interface IProductService {
    create(product: Omit<Product, 'image'>, image: Buffer): Promise<Product>;
    update(product: UpdateProduct, image?: Buffer | null): Promise<Product | null>;
}
export default IProductService;
