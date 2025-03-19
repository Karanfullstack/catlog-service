import { AggregatePaginateResult } from 'mongoose';
import { Topping, ToppingQuery, UpdateToppingType } from './types';

export interface ToppingRepositoryI {
    create(topping: Topping): Promise<Topping>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Topping | null>;
    findByAll(query: ToppingQuery): Promise<AggregatePaginateResult<Topping>>;
    update(id: string, topping: UpdateToppingType): Promise<Topping | null>;
}
