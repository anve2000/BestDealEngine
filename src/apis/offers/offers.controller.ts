import { Body, Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/createOffer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offerService: OffersService) {}

  @Post('create')
  async createOffer(@Req() req, @Body() payload: CreateOfferDto, @Res() response) {
    const resp = await this.offerService.createOffers(payload);
    return resp;
  }

  @Post('highest/discount')
  async getMaxDiscount(@Req() req, @Body() payload: CreateOfferDto, @Res() response) {
    const resp = await this.offerService.createOffers(payload);
    return resp;
  }
}
