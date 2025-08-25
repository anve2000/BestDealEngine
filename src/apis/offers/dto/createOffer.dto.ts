import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, IsBoolean, IsDateString, IsIn, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

class PaymentRuleDto {
  @IsString()
  ruleId: string;

  @IsString()
  name: string;

  @IsString()
  @IsIn(['percentage', 'fixed', 'cart_fixed'])
  discountType: 'percentage' | 'fixed' | 'cart_fixed';

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  discountPercent?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  fixedDiscount?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2,  })
  maximumDiscount?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  minPayableAmount: number;

  @IsString()
  bankName: string;

  @IsString()
  @IsIn(['CREDIT_CARD', 'DEBIT_CARD', 'EMI', 'UPI'])
  paymentInstrument: 'CREDIT_CARD' | 'DEBIT_CARD' | 'EMI' | 'UPI';

  @IsString()
  @IsIn(['discount', 'cashback'])
  type: 'discount' | 'cashback';

  @IsString()
  offerTitle: string;

  @IsOptional()
  @Type(() => Number)
  validTillDate?: number; // Unix timestamp in milliseconds

  @IsOptional()
  @IsNumber()
  usageLimitPerUser?: number;
}

class PaymentRulesDataDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentRuleDto)
  paymentRules: PaymentRuleDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  nonEligiblePaymentRules: Record<string, any>[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  paymentCharges: Record<string, any>[];
}

class FlipkartOfferApiResponseDto {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  @IsString()
  message?: string;

  @ValidateNested()
  @Type(() => PaymentRulesDataDto)
  data: PaymentRulesDataDto;
}

export class CreateOfferDto {
  @ValidateNested()
  @Type(() => FlipkartOfferApiResponseDto)
  flipkartOfferApiResponse: FlipkartOfferApiResponseDto;
}