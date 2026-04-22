import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({
    example: '+998901234567',
    description: 'User phone number (Uzbekistan format)',
    required: true,
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(
    /^(?:\+998|998)?[ -]?(90|91|93|94|95|97|98|99|33|88|77)[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/,
    {
      message:
        'Phone number must be a valid Uzbekistan number (e.g. +998901234567)',
    },
  )
  phone_number: string;


  @ApiProperty({
    example: 'strongPassword123',
    description: 'User password',
    minLength: 6,
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required !' })
  @IsString({ message: 'Password must be type string !' })
  password: string;
}