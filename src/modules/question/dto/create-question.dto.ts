import { IsNotEmpty, IsString, Length, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Questionnaire UUID',
  })
  @IsUUID('4', { message: 'Questionnaire ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Questionnaire ID is required' })
  questionnaire_id!: string;


  @ApiProperty({
    example: 'How satisfied are you with the hospital service?',
    description: 'Question text',
    minLength: 5,
    maxLength: 255,
  })
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Question text must be a string' })
  @IsNotEmpty({ message: 'Question text is required' })
  @Length(5, 255, {
    message: 'Question text must be between 5 and 255 characters',
  })
  question_text!: string;
}