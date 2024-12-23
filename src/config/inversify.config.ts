import { Container } from 'inversify';

import { TYPES } from '../const';
import { CategoryService } from '../category/category.service';
import { CategoryController } from '../category/category.controller';
import CategoryRepository from '../category/category.repository';
import { ICategoryRepository } from '../category/interface/repository.interface';
import { ICategoryService } from '../category/interface/service.interface';
import IProductService from '../product/interfaces/service.interface';
import ProductService from '../product/product.service';
import IProductRepository from '../product/interfaces/repository.interface';
import ProductRepository from '../product/product.repo';
import ProductController from '../product/product.controller';

const container = new Container();

// @ Controllers
container.bind<CategoryController>(TYPES.CategoryController).to(CategoryController);
container.bind<ProductController>(TYPES.ProductController).to(ProductController);
// @Services
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService);
container.bind<IProductService>(TYPES.ProductService).to(ProductService);
// @Repositories
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository);
container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);
export default container;
