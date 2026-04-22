import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAnswerDto {
  @IsUUID('4', { message: 'Hospital id must be a valid UUID' })
  @IsNotEmpty({ message: 'Hospital id is required' })
  hospital_id!: string;

  @IsUUID('4', { message: 'Question id must be a valid UUID' })
  @IsNotEmpty({ message: 'Question id is required' })
  question_id!: string;

  @IsUUID('4', { message: 'Patient id must be a valid UUID' })
  @IsNotEmpty({ message: 'Patient id is required' })
  potient_id!: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Answer text must be a string' })
  @IsNotEmpty({ message: 'Answer text is required' })
  @Length(1, 500, {
    message: 'Answer text must be between 1 and 500 characters',
  })
  answer_text!: string;
}