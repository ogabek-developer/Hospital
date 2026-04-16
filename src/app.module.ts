import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './providers/prisma/prisma.module';
import { AdminModule } from './modules/admin/admin.module';
import { HospitalModule } from './modules/hospital/hospital.module';
import { DoctorModule } from './modules/doctor/doctor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AdminModule,
    HospitalModule,
    DoctorModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
