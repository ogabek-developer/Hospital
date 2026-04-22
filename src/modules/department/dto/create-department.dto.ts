import {
  IsNotEmpty,
  IsString,
  Length,
  IsUUID,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDepartmentDto {
  @IsUUID('4', { message: 'Hospital ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Hospital ID is required' })
  hospital_id!: string;

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