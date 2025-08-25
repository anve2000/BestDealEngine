import { Controller, Inject, Post } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offerService: OffersService) {}

  @Post('create')
  async createOffer() {
    await this.offerService.createOffers();
  }
}
