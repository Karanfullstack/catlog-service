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
    async getAll(): Promise<Category[]> {
        const categories = await CategoryModel.find();
        return categories;
    }
}

export default CategoryRepository;
