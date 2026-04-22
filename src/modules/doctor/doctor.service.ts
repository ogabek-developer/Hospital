import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'providers/prisma/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class DoctorService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateDoctorDto) {
    const exists = await this.prismaService.doctors.findUnique({
      where: { phone_number: dto.phone_number },
    });
    if (exists) throw new ConflictException('Doctor already exist');
    const [hospital, department] = await Promise.all([
      dto.hospital_id
        ? this.prismaService.hospitals.findUnique({
            where: { id: dto.hospital_id },
          })
        : null,
      dto.department_id
        ? this.prismaService.departments.findUnique({
            where: { id: dto.department_id },
          })
        : null,
    ]);
    if (!hospital) throw new NotFoundException('Hospital not found');
    if (!department) throw new NotFoundException('Department not found');
    dto.password = await bcrypt.hash(dto.password, 10);
    const doctor = await this.prismaService.doctors.create({
      data: dto,
    });
    const doctorUrl = `http://127.0.0.1:4000/h/${hospital.id}/${department.name}/d/${doctor.id}`;
    return {
      id: doctor.id,
      hospital_id: doctor.hospital_id,
      department_id: doctor.department_id,
      phone_number: doctor.phone_number,
      password: doctor.password,
      specialization: doctor.specialization,
      doctorUrl,
      created_at: doctor.created_at,
      updated_at: doctor.updated_at
    };
  }

  async findAll() {
    return await this.prismaService.doctors.findMany({
      include: { hospital: true, department: true },
    });
  }

  async findOne(id: string) {
    const doctor = await this.prismaService.doctors.findUnique({
      where: { id },
      include: { hospital: true, department: true },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async findByPhone(phone_number: string) {
    const doctor = await this.prismaService.doctors.findUnique({where: {phone_number}})
    if(doctor) throw new ConflictException('Doctor already exist');
    return doctor;
  };
  
  async update(id: string, dto: UpdateDoctorDto) {
    await this.findOne(id);
    return this.prismaService.doctors.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.doctors.delete({ where: { id } });
  }


}
