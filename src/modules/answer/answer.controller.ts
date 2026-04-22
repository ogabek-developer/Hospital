import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@ApiTags('Answers')
@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create new answer' })
  @ApiResponse({ status: 201, description: 'Answer successfully created' })
  @ApiResponse({ status: 404, description: 'Hospital, question, or patient not found' })
  @ApiResponse({ status: 409, description: 'Answer already exists' })
  create(@Body() dto: CreateAnswerDto) {
    return this.answerService.create(dto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all answers' })
  @ApiResponse({ status: 200, description: 'List of answers' })
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get answer by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Answer UUID',
    example: 'd4e5f6a7-b8c9-0123-def0-4567890abcde',
  })
  @ApiResponse({ status: 200, description: 'Answer found' })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update answer by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Answer UUID',
    example: 'd4e5f6a7-b8c9-0123-def0-4567890abcde',
  })
  @ApiResponse({ status: 200, description: 'Answer updated successfully' })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  update(@Param('id') id: string, @Body() dto: UpdateAnswerDto) {
    return this.answerService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete answer by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Answer UUID',
    example: 'd4e5f6a7-b8c9-0123-def0-4567890abcde',
  })
  @ApiResponse({ status: 204, description: 'Answer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  remove(@Param('id') id: string) {
    return this.answerService.remove(id);
  }
}