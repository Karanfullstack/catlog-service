import { inject, injectable } from 'inversify';

import { Category } from './category.types';
import { ICategoryService } from './interface/service.interface';
import { TYPES } from '../const';
import { ICategoryRepository } from './interface/repository.interface';

@injectable()
class CategoryService implements ICategoryService {
    constructor(
        @inject(TYPES.CategoryRepository) private categoryRepo: ICategoryRepository,
    ) {}
    async create(category: Category): Promise<Category> {
        return await this.categoryRepo.create(category);
    }
}

export { CategoryService };
