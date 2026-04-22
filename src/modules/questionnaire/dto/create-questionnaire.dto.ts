import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionnaireDto {

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Hospital UUID"
  })
  @IsUUID('4', { message: 'Hospital id must be a valid UUID' })
  @IsNotEmpty({ message: 'Hospital id is required' })
  hospital_id!: string;


  @ApiProperty({
    example: "660e8400-e29b-41d4-a716-446655440111",
    description: "Department UUID"
  })
  @IsUUID('4', { message: 'Department id must be a valid UUID' })
  @IsNotEmpty({ message: 'Department id is required' })
  department_id!: string;


  @ApiProperty({
    example: "Patient satisfaction survey",
    description: "Questionnaire title"
  })
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;


  @ApiProperty({
    example: true,
    description: "Questionnaire active status"
  })
  @Type(() => Boolean)
  @IsBoolean({ message: 'is_active must be true or false' })
  is_active!: boolean;
}