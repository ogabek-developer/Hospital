import { Module } from '@nestjs/common';
import { PotientService } from './potient.service';
import { PotientController } from './potient.controller';
import { PrismaService } from 'providers/prisma/prisma.service';

@Module({
  controllers: [PotientController],
  providers: [PotientService, PrismaService],
})
export class PotientsModule {}
