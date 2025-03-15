import { IQuery } from '../../common/types';
import { Product } from '../product.types';

export interface ProductResponse<T> {
    data: T[] | [];
    total: number;
    perPage: number;
    currentPage: number;
}
interface IProductRepository {
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product | null>;
    findById(id: string): Promise<Product | null>;
    findAll(query: IQuery): Promise<ProductResponse<Product>>;
}

export default IProductRepository;
