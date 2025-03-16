import { Topping } from './types';

export interface ToppingServiceI {
    create(topping: Omit<Topping, 'image'>, image: Buffer | undefined): Promise<Topping>;
}
