import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    type: String,
    description: 'Admin phone number (Uzbekistan format)',
    example: '+998901234567',
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
    type: String,
    description: 'Admin password',
    example: '123456',
    minLength: 6,
    maxLength: 12,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 12, {
    message: 'Password min 6 characters long, Max 12 characters short',
  })
  password: string;

  @IsOptional()
  @IsString({ message: 'Refresh token must be a string' })
  refresh_token?: string;

  @ApiProperty({
    type: Boolean,
    description: 'Is super admin or not',
    example: false,
  })
  @IsBoolean({ message: 'Invalid boolean value. Expected true or false' })
  is_super_admin: boolean;

  @ApiPropertyOptional({
    type: String,
    description: 'Hospital ID (UUID)',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
  })
  @IsOptional()
  @IsString({ message: 'Hospital id must be a string !' })
  hospital_id?: string;
}