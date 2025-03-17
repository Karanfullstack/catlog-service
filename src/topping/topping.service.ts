import { inject, injectable } from 'inversify';
import { ToppingRepositoryI } from './interface/repository.interface';
import { ToppingServiceI } from './interface/service.interface';
import { Topping } from './interface/types';
import { TYPES } from '../const';
import { IStorageService } from '../common/_services/storage/storage.interface';

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
}

export default ToppingService;
