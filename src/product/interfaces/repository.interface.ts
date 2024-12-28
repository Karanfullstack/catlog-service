import { IQuery } from '../../common/types';
import { Product } from '../product.types';

export interface ProductResponse<T> {
    docs: T[] | [];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
interface IProductRepository {
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product | null>;
    findById(id: string): Promise<Product | null>;
    findAll(query: IQuery): Promise<ProductResponse<Product>>;
}

export default IProductRepository;
