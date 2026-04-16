import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateHospitalDto {
  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Hospital name must be a string' })
  @IsNotEmpty({ message: 'Hospital name is required' })
  @Length(3, 50, {
    message: 'Hospital name must be between 3 and 50 characters',
  })
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address is required' })
  @Length(5, 100, {
    message: 'Address must be between 5 and 100 characters',
  })
  address: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'Phone must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(
    /^(?:\+998|998)?[ -]?(90|91|93|94|95|97|98|99|33|88|77)[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/,
    {
      message:
        'Phone number must be a valid Uzbekistan number (e.g. +998901234567)',
    },
  )
  phone: string;
}
