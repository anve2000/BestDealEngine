import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/createOffer.dto';
import { Bank } from './entities/bank.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private readonly offerRepo: Repository<Offer>,
    @InjectRepository(Offer) private readonly bankRepo: Repository<Bank>,
  ) {}

  async createOffers(payload: CreateOfferDto) {
    const offerResolvers =
      payload.flipkartOfferApiResponse.data.paymentRules.map(async (rule) => {
        const bank = await this.bankRepo.findOne({
          where: {
            code: rule.bankName,
          },
          select: ['id'],
        });
        if (!bank) {
          throw new Error();
        }

        const offerData = {
          offerId: rule.ruleId.toString(),
          bank: bank,
          discountType:
            rule.discountType === 'percentage' ? 'percentage' : 'fixed',
          discountPercent:
            rule.discountType === 'percentage' ? rule.discountPercent : null,
          fixedDiscount:
            rule.discountType === 'fixed'
              ? rule.fixedDiscount || rule.maximumDiscount || null
              : null,
          maxDiscount: rule.maximumDiscount || null,
          minTransactionAmount: rule.minPayableAmount,
          paymentInstrument: rule.paymentInstrument || null,
          offerTitle: rule.name,
          expirationDate: rule.validTillDate
            ? new Date(rule.validTillDate)
            : null,
        };

        const existingOffer = await this.offerRepo.findOne({
          where: { offerId: offerData.offerId },
        });

        if (!existingOffer) {
          const newOffer = this.offerRepo.create(offerData);
          await this.offerRepo.save(newOffer);
        }
      });

    await Promise.all(offerResolvers);
  }
}
