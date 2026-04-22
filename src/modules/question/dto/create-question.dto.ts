import { IsNotEmpty, IsString, Length, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateQuestionDto {
  @IsUUID('4', { message: 'Questionnaire ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Questionnaire ID is required' })
  questionnaire_id!: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Question text must be a string' })
  @IsNotEmpty({ message: 'Question text is required' })
  @Length(5, 255, {
    message: 'Question text must be between 5 and 255 characters',
  })
  question_text!: string;
}