import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Injectable()
export class HospitalService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateHospitalDto) {
    const exist = await this.prismaService.hospitals.findUnique({where: {phone: dto.phone}});
    if(exist) throw new ConflictException('Hospital already exist');
    const hospital = await this.prismaService.hospitals.create({data: dto});
    return hospital;
  };

  async findAll() {
    return this.prismaService.hospitals.findMany();
  };

  async findOne(id: string) {
    const hospital = await this.prismaService.hospitals.findUnique({where: {id}});
    if(!hospital) throw new NotFoundException('Hospital not found');
    return hospital;
  }

  async update(id: string, dto: UpdateHospitalDto) {
    await this.findOne(id);
    return this.prismaService.hospitals.update({where: {id}, data: dto});
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.hospitals.delete({where: {id}});
  }
}
