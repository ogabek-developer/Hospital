import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(dto: CreateAnswerDto) {
    const exists = await this.prismaService.answers.findUnique({
      where: {  hospital_id_question_id_potient_id : dto},
    });
    if (exists) throw new ConflictException('Answer already exist');
    const hospitald = await this.prismaService.hospitals.findUnique({where : {id : dto.hospital_id}}) ;
    if(!hospitald) throw new NotFoundException("Hospital not found")
    const createdAnswer = await this.prismaService.answers.create({
      data: dto,
    });
    return createdAnswer;
  }

  async findAll() {
    return await this.prismaService.answers.findMany({include: {hospital: true, question: true}});
  }

  async findOne(id: number) {
    const doctor = await this.prismaService.answers.findUnique({
      where: { id },
      include: {hospital: true, question: true}
    });
    if (!doctor) throw new NotFoundException('Answer not found');
    return doctor;
  }

  async update(id: number, dto: UpdateAnswerDto) {
    await this.findOne(id);
    return this.prismaService.answers.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.answers.delete({ where: { id } });
  }
}
