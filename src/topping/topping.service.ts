import { inject, injectable } from 'inversify';
import { ToppingRepositoryI } from './interface/repository.interface';
import { ToppingServiceI } from './interface/service.interface';
import { Topping, ToppingQuery } from './interface/types';
import { TYPES } from '../const';
import { IStorageService } from '../common/_services/storage/storage.interface';
import { AggregatePaginateResult } from 'mongoose';

@injectable()
class ToppingService implements ToppingServiceI {
    constructor(
        @inject(TYPES.ToppingRepository) private repo: ToppingRepositoryI,
        @inject(TYPES.StorageService) private storage: IStorageService,
    ) {}

    // @Creating a new topping
    async create(topping: Omit<Topping, 'image'>, image: Buffer | undefined): Promise<Topping> {
        if (!image) throw new Error('Topping image could not process in service');
        const { url, id } = await this.storage.upload({ file: image });
        return await this.repo.create({ ...topping, image: { public_id: id, image: url } });
    }
    // @Delete Topping
    async delete(id: string): Promise<void> {
        const oldTopping = await this.repo.findById(id);
        if (!oldTopping) {
            throw new Error('Topping not found to be deleted');
        }
        if (!oldTopping.image?.public_id) {
            throw new Error('Topping image id should be valid');
        }
        await this.storage.destroy(oldTopping.image.public_id);
        await this.repo.delete(id);
    }

    async findByAll(query: ToppingQuery): Promise<AggregatePaginateResult<Topping>> {
        return await this.repo.findByAll(query);
    }
}

export default ToppingService;
