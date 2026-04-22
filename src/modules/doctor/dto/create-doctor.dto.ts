import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDoctorDto {

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Hospital UUID',
    format: 'uuid',
    required: true,
  })
  @IsUUID('4', { message: 'Hospital id must be a valid UUID' })
  @IsNotEmpty({ message: 'Hospital id is required!' })
  hospital_id!: string;


  @ApiProperty({
    example: '660e8400-e29b-41d4-a716-446655440111',
    description: 'Department UUID',
    format: 'uuid',
    required: true,
  })
  @IsUUID('4', { message: 'Department id must be a valid UUID' })
  @IsNotEmpty({ message: 'Department id is required!' })
  department_id!: string;


  @ApiProperty({
    example: '+998901234567',
    description: 'Doctor phone number',
    required: true,
  })
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(
    /^(?:\+998|998)?[ -]?(90|91|93|94|95|97|98|99|33|88|77)[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/,
    {
      message:
        'Phone number must be a valid Uzbekistan number (e.g. +998901234567)',
    },
  )
  phone_number!: string;


  @ApiProperty({
    example: 'strongPass123',
    description: 'Doctor password (6–12 characters)',
    minLength: 6,
    maxLength: 12,
    required: true,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 12, {
    message: 'Password min 6 characters long, max 12 characters long',
  })
  password!: string;


  @ApiPropertyOptional({
    example: 'jwt-refresh-token-example',
    description: 'Refresh token (optional)',
  })
  @IsOptional()
  @IsString({ message: 'Refresh token must be a string' })
  refresh_token?: string;


  @ApiProperty({
    example: 'Cardiologist',
    description: 'Doctor specialization',
    minLength: 3,
    maxLength: 100,
    required: true,
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Specialization is required!' })
  @IsString({ message: 'Specialization must be a string!' })
  @Length(3, 100, {
    message: 'Specialization must be between 3 and 100 characters',
  })
  specialization!: string;
}