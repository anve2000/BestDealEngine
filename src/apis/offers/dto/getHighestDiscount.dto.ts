import { IsNumber, IsString } from 'class-validator';

export class GetHighestDiscountDto {
  @IsString()
  bankName: string;

  @IsNumber()
  amountToPay: number;

  @IsString()
  paymentInstrument: string;
}
