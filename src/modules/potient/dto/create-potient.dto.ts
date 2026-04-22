import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePotientDto {

  @ApiProperty({
    example: '+998901234567',
    description: 'Patient phone number',
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
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Hospital UUID',
    format: 'uuid',
    required: true,
  })
  @IsUUID('4', { message: 'Hospital id must be a valid UUID' })
  @IsNotEmpty({ message: 'Hospital id is required' })
  hospital_id!: string;
}