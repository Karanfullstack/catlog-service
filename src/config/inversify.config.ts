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
import { IStorageService } from '../common/_services/storage/storage.interface';
import { CloudinaryService } from '../common/_services/storage/cloudinar.service';
import { ToppingController } from '../topping/topping.controller';
import { ToppingServiceI } from '../topping/interface/service.interface';
import ToppingService from '../topping/topping.service';
import { ToppingRepositoryI } from '../topping/interface/repository.interface';
import ToppingRepository from '../topping/topping.repository';

const container = new Container();

// @ Controllers
container.bind<CategoryController>(TYPES.CategoryController).to(CategoryController);
container.bind<ProductController>(TYPES.ProductController).to(ProductController);
container.bind<ToppingController>(TYPES.ToppingController).to(ToppingController);
// @Services
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService);
container.bind<IProductService>(TYPES.ProductService).to(ProductService);
container.bind<ToppingServiceI>(TYPES.ToppingService).to(ToppingService);
container.bind<IStorageService>(TYPES.StorageService).to(CloudinaryService);

// @Repositories
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository);
container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);
container.bind<ToppingRepositoryI>(TYPES.ToppingRepository).to(ToppingRepository);
export default container;
