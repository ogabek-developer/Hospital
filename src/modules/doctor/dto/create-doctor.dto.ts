import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty({message : "Hospital id is required !"})
  hospital_id: number;
  @IsNotEmpty({message : "Departament id is required !"})
  department_id: number;
  @IsNotEmpty({message : "Phone number is required !"})
  @IsString({ message: 'Phone number is string !' })
  phone_number: string;
  @IsNotEmpty({message : "Password is required !"})
  @IsString({ message: 'Password must be type string !' })
  password: string;
  @IsNotEmpty({message : "Specialization is required !"})
  @IsString({ message: 'Specialization must be type string !' })
  specialization: string;
}
