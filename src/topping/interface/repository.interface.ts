import { Topping } from './types';

export interface ToppingRepositoryI {
    create(topping: Topping): Promise<Topping>;
}
