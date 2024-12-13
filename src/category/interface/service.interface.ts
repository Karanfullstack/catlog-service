import { Category } from '../category.types';

interface ICategoryService {
    create(category: Category): Promise<Category>;
}
export { ICategoryService };
