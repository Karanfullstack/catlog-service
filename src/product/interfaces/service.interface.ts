import { IQuery } from '../../common/types';
import { Product, UpdateProduct } from '../product.types';
import { ProductResponse } from './repository.interface';

interface IProductService {
    create(product: Omit<Product, 'image'>, image: Buffer): Promise<Product>;
    update(product: UpdateProduct, image?: Buffer | null): Promise<Product | null>;
    getAll(query: IQuery): Promise<ProductResponse<Product>>;
}
export default IProductService;
