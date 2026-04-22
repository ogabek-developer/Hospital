import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateDepartmentDto) {
    const exists = await this.prismaService.departments.findUnique({
      where: { name_hospital_id: dto },
    });
    if (exists) throw new ConflictException('Department already exist');
    const hospital = await this.prismaService.hospitals.findUnique({where : { id : dto.hospital_id}}) ;
    if(!hospital) throw new NotFoundException("Hospital not found")
    const createdDepartment = await this.prismaService.departments.create({
      data: dto,
    });
    return createdDepartment;
  } 

  async findAll() {
    return this.prismaService.departments.findMany({include: {hospital: true}});
  }

  async findOne(id: string) {
    const department = await this.prismaService.departments.findUnique({where: {id}, include: {hospital: true}});
    if(!department) throw new NotFoundException('Department not found');
    return department;
  }

  async update(id: string, dto: UpdateDepartmentDto) {
    await this.findOne(id);
    return this.prismaService.departments.update({where: {id}, data: dto});
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.departments.delete({where: {id}});
  }
}
