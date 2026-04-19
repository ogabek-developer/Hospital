import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateDoctorDto) {
    const exists = await this.prismaService.doctors.findUnique({
      where: { phone_number: dto.phone_number },
    });
    if (exists) throw new ConflictException('Doctor already exist');
    const createdDoctor = await this.prismaService.doctors.create({
      data: dto,
    });
    const hospital = await this.prismaService.hospitals.findUnique({where : {id : dto.hospital_id}}) ;
    if(!hospital) throw new NotFoundException("Hospital not found")
    return createdDoctor;
  }

  async findAll() {
    return await this.prismaService.doctors.findMany();
  }

  async findOne(id: number) {
    const doctor = await this.prismaService.doctors.findUnique({
      where: { id },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(id: number, dto: UpdateDoctorDto) {
    await this.findOne(id);
    return this.prismaService.doctors.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.doctors.delete({ where: { id } });
  }
}
