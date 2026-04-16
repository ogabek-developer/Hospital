import { Module } from '@nestjs/common';
import { PotientService } from './potient.service';
import { PotientController } from './potient.controller';

@Module({
  controllers: [PotientController],
  providers: [PotientService],
})
export class PotientsModule {}
