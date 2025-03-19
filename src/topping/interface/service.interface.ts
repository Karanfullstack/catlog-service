import { AggregatePaginateResult } from 'mongoose';
import { Topping, ToppingQuery, UpdateToppingType } from './types';

export interface ToppingServiceI {
    create(topping: Omit<Topping, 'image'>, image: Buffer | undefined): Promise<Topping>;
    delete(id: string): Promise<void>;
    findByAll(query: ToppingQuery): Promise<AggregatePaginateResult<Topping>>;
    findById(id: string): Promise<Topping | null>;
    update(id: string, topping: UpdateToppingType, image?: Buffer): Promise<Topping | null>;
}
