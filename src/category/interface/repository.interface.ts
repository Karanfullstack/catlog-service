import { Category } from '../category.types';

interface ICategoryRepository {
    create(category: Category): Promise<Category>;
}

export { ICategoryRepository };
