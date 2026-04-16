import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsInt({ message: 'Hospital id must be a number' })
  @IsNotEmpty({ message: 'Hospital id required' })
  hospital_id!: number;

  @IsInt({ message: 'Question id must be a number' })
  @IsNotEmpty({ message: 'Question id required' })
  question_id!: number;

  @IsString({ message: 'Answer text must be a string' })
  @IsNotEmpty({ message: 'Answer text required' })
  answer_text!: string;

  @IsInt({ message: 'Patient id must be a number' })
  @IsNotEmpty({ message: 'Patient id required' })
  potient_id!: number;
}