import { Module } from '@nestjs/common';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { PrismaService } from 'providers/prisma/prisma.service';

@Module({
  controllers: [HospitalController],
  providers: [HospitalService, PrismaService]
})
export class HospitalModule {}
