import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateQuestionDto) {
    const exists = await this.prismaService.questions.findUnique({
      where: { questionnaire_id_question_text: dto },
    });
    if (exists) throw new ConflictException('Question already exist');
    const createQuestion = await this.prismaService.questions.create({
      data: dto,
    });
    return createQuestion;
  }

  async findAll() {
    return this.prismaService.questions.findMany({
      include: { questionnaire: true },
    });
  }

  async findOne(id: string) {
    const FindQuestion = await this.prismaService.questions.findUnique({
      where: { id },
      include: { questionnaire: true },
    });
    if (!FindQuestion) throw new NotFoundException('Question not found');
    return FindQuestion;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    await this.findOne(id);
    return this.prismaService.questions.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.questions.delete({ where: { id } });
  }
}
