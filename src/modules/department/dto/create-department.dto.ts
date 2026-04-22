import {
  IsNotEmpty,
  IsString,
  Length,
  IsUUID,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Hospital UUID',
    format: 'uuid',
    required: true,
  })
  @IsUUID('4', { message: 'Hospital ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Hospital ID is required' })
  hospital_id!: string;


  @ApiProperty({
    example: 'Cardiology',
    description: 'Department name (only letters allowed)',
    minLength: 3,
    maxLength: 50,
    required: true,
  })
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Department name must be a string' })
  @IsNotEmpty({ message: 'Department name is required' })
  @Length(3, 50, {
    message: 'Department name must be between 3 and 50 characters',
  })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Department name must contain only letters',
  })
  name!: string;
}