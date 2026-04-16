import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateDepartmentDto) {
    const exist = await this.prismaService.departments.findUnique({
      where: { name_hospital_id: dto },
    });
    if (exist) throw new ConflictException('Department already exist');
    const department = await this.prismaService.departments.create({
      data: dto,
    });
    return department;
  }

  async findAll() {
    return this.prismaService.departments.findMany();
  }

  async findOne(id: number) {
    const department = await this.prismaService.departments.findUnique({
      where: { id },
    });
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }

  async update(id: number, dto: UpdateDepartmentDto) {
    await this.findOne(id);
    return this.prismaService.departments.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.departments.delete({ where: { id } });
  }
}
