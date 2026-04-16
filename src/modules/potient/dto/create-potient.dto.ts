import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePotientDto {
    @IsString({ message: "Full name must be a string " })
    @IsNotEmpty({ message: "Full name is required " })
    @Length(2, 20, { message: "Full name must be between 2 and 20 characters" })
    full_name!: string;
    @IsInt({ message: "Hospital is must be a number " })
    @IsNotEmpty({ message: "Hospital id is required " })
    hospital_id!: number;
}
