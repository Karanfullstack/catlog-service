import { injectable } from 'inversify';
import { Topping } from './interface/types';
import { ToppingRepositoryI } from './interface/repository.interface';
import ToppingModel from './topping.model';

@injectable()
class ToppingRepository implements ToppingRepositoryI {
    async create(topping: Topping): Promise<Topping> {
        const response = await ToppingModel.create(topping);
        return response;
    }
}

export default ToppingRepository;
