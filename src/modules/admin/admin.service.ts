import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateAdminDto) {
    const exist = await this.prismaService.admins.findUnique({
      where: { phone_number: dto.phone_number },
    });
    if (exist) throw new ConflictException('Admin already exist');
    dto.password = await bcrypt.hash(dto.password, 10);
    const admin = await this.prismaService.admins.create({ data: dto });
    return admin;
  }

  async findAll() {
    return this.prismaService.admins.findMany({ include: { hospital: true } });
  }

  async findOne(id: string) {
    const admin = await this.prismaService.admins.findUnique({
      where: { id },
      include: { hospital: true },
    });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: string, dto: UpdateAdminDto) {
    await this.findOne(id);
    return this.prismaService.admins.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.admins.delete({ where: { id } });
  }
}
