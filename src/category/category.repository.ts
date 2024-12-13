import { injectable } from 'inversify';
import CategoryModel from './category.model';
import { Category } from './category.types';
import { ICategoryRepository } from './interface/repository.interface';

@injectable()
class CategoryRepository implements ICategoryRepository {
    async create(category: Category): Promise<Category> {
        const newCategory = await CategoryModel.create(category);
        return newCategory;
    }
}

export default CategoryRepository;
