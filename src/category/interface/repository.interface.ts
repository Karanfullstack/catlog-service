import { Category } from '../category.types';

interface ICategoryRepository {
    create(category: Category): Promise<Category>;
    getAll(): Promise<Category[]>;
}

export { ICategoryRepository };
