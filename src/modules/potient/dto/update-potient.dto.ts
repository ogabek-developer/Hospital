import { PartialType } from '@nestjs/mapped-types';
import { CreatePotientDto } from './create-potient.dto';

export class UpdatePotientDto extends PartialType(CreatePotientDto) {}
