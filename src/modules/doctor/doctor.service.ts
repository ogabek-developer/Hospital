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
    const doctor = await this.prismaService.doctors.create({
      data: dto,
    });
    const doctorUrl = `http://127.0.0.1:4000/h/${hospital.id}/${department.name}/d/${doctor.id}`;
    return { ...doctor, doctorUrl };
  }

  async findAll() {
    return await this.prismaService.doctors.findMany({
      include: { hospital: true, department: true },
    });
  }

  async findOne(id: number) {
    const doctor = await this.prismaService.doctors.findUnique({
      where: { id },
      include: { hospital: true, department: true },
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
