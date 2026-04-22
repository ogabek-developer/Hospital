import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateQuestionnaireDto {
  @IsUUID('4', { message: 'Hospital id must be a valid UUID' })
  @IsNotEmpty({ message: 'Hospital id is required' })
  hospital_id!: string;

  @IsUUID('4', { message: 'Department id must be a valid UUID' })
  @IsNotEmpty({ message: 'Department id is required' })
  department_id!: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @Type(() => Boolean)
  @IsBoolean({ message: 'is_active must be true or false' })
  is_active!: boolean;
}