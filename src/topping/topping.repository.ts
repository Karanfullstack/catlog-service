import { injectable } from 'inversify';
import { Topping, ToppingFilterQuery, ToppingQuery } from './interface/types';
import { ToppingRepositoryI } from './interface/repository.interface';
import ToppingModel from './topping.model';
import mongoose, { AggregatePaginateResult } from 'mongoose';

@injectable()
class ToppingRepository implements ToppingRepositoryI {
    async create(topping: Topping): Promise<Topping> {
        const response = await ToppingModel.create(topping);
        return response;
    }
    async delete(id: string): Promise<void> {
        await ToppingModel.findByIdAndDelete(id);
    }
    async findById(id: string): Promise<Topping | null> {
        return await ToppingModel.findById(id);
    }
    async findByAll(query: ToppingQuery): Promise<AggregatePaginateResult<Topping>> {
        const filter: ToppingFilterQuery = {};
        const searchRegExp = query.q ? new RegExp(query.q, 'i') : undefined;

        if (searchRegExp) filter.name = searchRegExp;
        if (query.tenantId) filter.tenantId = query.tenantId;

        // convert categoryid into object id
        if (query.categoryId && mongoose.Types.ObjectId.isValid(query.categoryId)) {
            filter.categoryId = query.categoryId;
        }
        console.log(filter.categoryId);
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const topping = ToppingModel.aggregate([
            {
                $match: filter,
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
            // {
            //     $unwind: '$category',
            // },
        ]);
        return await ToppingModel.aggregatePaginate(topping, { limit, page });
    }
}

export default ToppingRepository;
