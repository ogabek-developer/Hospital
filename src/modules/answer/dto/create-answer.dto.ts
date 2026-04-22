import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAnswerDto {
  @ApiProperty({
    type: String,
    description: 'Hospital ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
  })
  @IsUUID('4', { message: 'Hospital id must be a valid UUID' })
  @IsNotEmpty({ message: 'Hospital id is required' })
  hospital_id!: string;

  @ApiProperty({
    type: String,
    description: 'Question ID',
    example: 'b2c3d4e5-f6a7-8901-bcde-234567890abc',
  })
  @IsUUID('4', { message: 'Question id must be a valid UUID' })
  @IsNotEmpty({ message: 'Question id is required' })
  question_id!: string;

  @ApiProperty({
    type: String,
    description: 'Patient ID',
    example: 'c3d4e5f6-a7b8-9012-cdef-34567890abcd',
  })
  @IsUUID('4', { message: 'Patient id must be a valid UUID' })
  @IsNotEmpty({ message: 'Patient id is required' })
  potient_id!: string;

  @ApiProperty({
    type: String,
    description: 'Answer text',
    example: 'Ha, bosh og‘rig‘i 3 kundan beri davom etmoqda',
    minLength: 1,
    maxLength: 500,
  })
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Answer text must be a string' })
  @IsNotEmpty({ message: 'Answer text is required' })
  @Length(1, 500, {
    message: 'Answer text must be between 1 and 500 characters',
  })
  answer_text!: string;
}