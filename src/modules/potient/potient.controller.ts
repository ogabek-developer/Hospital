import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PotientService } from './potient.service';
import { CreatePotientDto } from './dto/create-potient.dto';
import { UpdatePotientDto } from './dto/update-potient.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Potients')
@Controller('potients')
export class PotientController {
  constructor(private readonly potientService: PotientService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create potient' })
  @ApiBody({ type: CreatePotientDto })
  @ApiResponse({ status: 201, description: 'Potient created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  create(@Body() createPotientDto: CreatePotientDto) {
    return this.potientService.create(createPotientDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all potients' })
  @ApiResponse({ status: 200, description: 'List of potients' })
  findAll() {
    return this.potientService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get potient by id' })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Potient UUID',
  })
  @ApiResponse({ status: 200, description: 'Potient found' })
  @ApiResponse({ status: 404, description: 'Potient not found' })
  findOne(@Param('id') id: string) {
    return this.potientService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update potient' })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({ type: UpdatePotientDto })
  @ApiResponse({ status: 200, description: 'Potient updated successfully' })
  update(@Param('id') id: string, @Body() updatePotientDto: UpdatePotientDto) {
    return this.potientService.update(id, updatePotientDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete potient' })
  @ApiParam({
    name: 'id',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({ status: 204, description: 'Potient deleted successfully' })
  remove(@Param('id') id: string) {
    return this.potientService.remove(id);
  }
}