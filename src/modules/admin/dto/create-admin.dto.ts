import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateAdminDto {
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
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 12, {
    message: 'Password min 6 characters long, Max 12 characters short',
  })
  password: string;
  @IsOptional()
  @IsString({ message: 'Refresh token must be a string' })
  refresh_token?: string;
  @IsBoolean({ message: 'Invalid boolean value. Expected true or false' })
  is_super_admin: boolean;
  @IsOptional()
  @IsInt({ message: 'Hospital id must be a String !' })
  hospital_id?: string;
}
