import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Offer) private readonly offerRepo: Repository<Offer>,
  ) {}

  async createOffers() {
    await this.offerRepo.findOne({});
  }
}
