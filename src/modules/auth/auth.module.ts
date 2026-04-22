import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DoctorModule } from '../doctor/doctor.module';
import { PrismaService } from 'providers/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({}),
    DoctorModule
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
