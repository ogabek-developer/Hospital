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
    const createdDepartment = await this.prismaService.departments.create({
      data: dto,
    });
    return createdDepartment;
  } 

  async findAll() {
    return this.prismaService.departments.findMany();
  }

  async findOne(id: number) {
    const department = await this.prismaService.departments.findUnique({where: {id}});
    if(!department) throw new NotFoundException('Department not found');
    return department;
  }

  async update(id: number, dto: UpdateDepartmentDto) {
    await this.findOne(id);
    return this.prismaService.departments.update({where: {id}, data: dto});
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.departments.delete({where: {id}});
  }
}
