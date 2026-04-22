import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PotientService } from './potient.service';
import { CreatePotientDto } from './dto/create-potient.dto';
import { UpdatePotientDto } from './dto/update-potient.dto';

@Controller('potients')
export class PotientController {
  constructor(private readonly potientService: PotientService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createPotientDto: CreatePotientDto) {
    return this.potientService.create(createPotientDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.potientService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.potientService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updatePotientDto: UpdatePotientDto) {
    return this.potientService.update(id, updatePotientDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.potientService.remove(id);
  }
}
