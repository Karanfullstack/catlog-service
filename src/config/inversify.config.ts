import { Container } from 'inversify';

import { TYPES } from '../const';
import { CategoryService } from '../category/category.service';
import { CategoryController } from '../category/category.controller';
import CategoryRepository from '../category/category.repository';
import { ICategoryController } from '../category/interface/controller.interface';
import { ICategoryRepository } from '../category/interface/repository.interface';
import { ICategoryService } from '../category/interface/service.interface';

const container = new Container();

// @ Controllers
container.bind<ICategoryController>(TYPES.CategoryController).to(CategoryController);

// @Services
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService);

// @Repositories
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository);
export default container;
