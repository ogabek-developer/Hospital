import {
  IsNotEmpty,
  IsString,
  Length,
  IsInt,
  Min,
  Matches,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateDepartmentDto {
  @Type(() => Number)
  @IsInt({ message: 'Hospital ID must be an integer' })
  @Min(1, { message: 'Hospital ID must be greater than 0' })
  hospital_id: number;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Department name must be a string' })
  @IsNotEmpty({ message: 'Department name is required' })
  @Length(3, 50, {
    message: 'Department name must be between 3 and 50 characters',
  })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Department name must contain only letters',
  })
  name: string;
}