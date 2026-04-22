import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePotientDto {
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

  @IsUUID('4', { message: 'Hospital id must be a valid UUID' })
  @IsNotEmpty({ message: 'Hospital id is required' })
  hospital_id!: string;
}