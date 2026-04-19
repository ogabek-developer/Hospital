import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class QuestionnaireService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateQuestionnaireDto) {
    const exists = await this.prismaService.questionnaires.findUnique({
      where: { hospital_id_department_id: dto },
    });
    if (exists) throw new ConflictException('Questionnaire already exist');
    const hospital = await this.prismaService.hospitals.findUnique({
      where: { id: dto.hospital_id },
    });
    if (!hospital) throw new NotFoundException('Hospital not found ');
    const createdQuestionnare = await this.prismaService.questionnaires.create({
      data: dto,
    });
    return createdQuestionnare;
  }

  async findAll() {
    return await this.prismaService.questionnaires.findMany({
      include: { hospital: true, department: true },
    });
  }

  async findOne(id: number) {
    const doctor = await this.prismaService.questionnaires.findUnique({
      where: { id },
      include: { hospital: true, department: true },
    });
    if (!doctor) throw new NotFoundException('Questionnaire not found');
    return doctor;
  }

  async update(id: number, dto: UpdateQuestionnaireDto) {
    await this.findOne(id);
    return this.prismaService.questionnaires.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.questionnaires.delete({ where: { id } });
  }
}
