import { Category } from '../category.types';

interface ICategoryService {
    create(category: Category): Promise<Category>;
    getAll(): Promise<Category[]>;
}
export { ICategoryService };
