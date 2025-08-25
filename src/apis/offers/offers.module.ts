import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { databaseProviders } from 'src/database/database.provider';

@Module({
  controllers: [OffersController],
  providers: [OffersService, ...databaseProviders], 
  imports:[DatabaseModule, TypeOrmModule.forFeature([Offer])]
})
export class OffersModule {}
 