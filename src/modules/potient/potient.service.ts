import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePotientDto } from './dto/create-potient.dto';
import { UpdatePotientDto } from './dto/update-potient.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class PotientService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPotientDto: CreatePotientDto) {
    const exists = await this.prismaService.potients.findUnique({
      where: { full_name_hospital_id: createPotientDto },
    });
    if (exists) throw new ConflictException('Potient is already exist');
    const hospital = await this.prismaService.hospitals.findUnique({
      where: { id: createPotientDto.hospital_id },
    });
    if (!hospital) throw new NotFoundException('Hospital not found');
    const createdPotient = await this.prismaService.potients.create({
      data: createPotientDto,
    });
    return createdPotient;
  }

  async findAll() {
    return this.prismaService.potients.findMany({
      include: { hospital: true },
    });
  }

  async findOne(id: number) {
    const findPotient = await this.prismaService.potients.findUnique({
      where: { id },
      include: { hospital: true },
    });
    if (!findPotient) throw new NotFoundException('Potient not found');
    return findPotient;
  }

  async update(id: number, updatePotientDto: UpdatePotientDto) {
    await this.findOne(id);
    return this.prismaService.potients.update({
      where: { id },
      data: updatePotientDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.potients.delete({ where: { id } });
  }
}
