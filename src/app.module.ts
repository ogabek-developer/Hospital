import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './providers/prisma/prisma.module';
import { AdminModule } from './modules/admin/admin.module';
import { HospitalModule } from './modules/hospital/hospital.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PotientsModule } from './modules/potient/potient.module';
import { QuestionModule } from './modules/question/question.module';
import { DepartmentModule } from './modules/department/department.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AdminModule,
    HospitalModule,
    DoctorModule,
    PotientsModule,
    QuestionModule,
    DepartmentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
