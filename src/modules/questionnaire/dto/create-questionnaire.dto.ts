import { IsInt, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuestionnaireDto {

  @Type(() => Number)
  @IsInt({ message: 'Hospital id must be a number' })
  @IsNotEmpty({ message: 'Hospital id is required' })
  hospital_id!: number;

  @Type(() => Number)
  @IsInt({ message: 'Department id must be a number' })
  @IsNotEmpty({ message: 'Department id is required' })
  department_id!: number;

  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsBoolean({ message: 'is_active must be true or false' })
  @IsNotEmpty({ message: 'is_active is required' })
  is_active!: boolean;
}