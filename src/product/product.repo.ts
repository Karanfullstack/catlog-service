import { injectable } from 'inversify';
import IProductRepository, { ProductResponse } from './interfaces/repository.interface';
import ProductModel from './product.model';
import { Product } from './product.types';
import { IQuery } from '../common/types';
import mongoose from 'mongoose';

@injectable()
class ProductRepository implements IProductRepository {
    // @Create Product Repository
    async create(product: Product): Promise<Product> {
        return await ProductModel.create(product);
    }
    // @Update Product Repository
    async update(product: Product): Promise<Product | null> {
        return await ProductModel.findByIdAndUpdate(product._id, product, { new: true });
    }
    // @FindBYID Product Repository
    async findById(id: string): Promise<Product | null> {
        return await ProductModel.findById(id);
    }

    // @FindAll Product Repository
    async findAll(query: IQuery): Promise<ProductResponse<Product>> {
        const filter: IQuery = {};
        if (query.categoryId && mongoose.Types.ObjectId.isValid(query.categoryId)) {
            filter.categoryId = new mongoose.Types.ObjectId(query.categoryId);
        }
        if (query.tenantId) filter.tenantId = query.tenantId;

        if (query.isPublish === 'true') {
            filter.isPublish = query.isPublish === 'true' ? true : undefined;
        }

        const serrchRegx = query.q ? new RegExp(query.q, 'i') : undefined;

        const matchQuery = { ...filter, ...(serrchRegx ? { name: serrchRegx } : {}) };

        const page = query.page || 1;
        const limit = query.limit || 4;
        const product = ProductModel.aggregate([
            {
                $match: matchQuery,
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category',
                    pipeline: [
                        {
                            $project: {
                                name: 1,
                                priceConfiguration: 1,
                                attributes: 1,
                                _id: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$category',
            },
        ]);

        const data = await ProductModel.aggregatePaginate(product, { limit, page });

        const finalResult: ProductResponse<Product> = {
            data: data.docs,
            total: data.totalDocs,
            perPage: data.limit,
            currentPage: data.page ?? 1,
        };
        return finalResult;
    }
}

export default ProductRepository;
