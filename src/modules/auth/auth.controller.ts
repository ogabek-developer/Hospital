import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: LoginDto, @Res({passthrough: true}) res: Response) {
    return this.authService.login(dto, res);
  }

  // @Post(':id/change-password')
  // @HttpCode(200)
  // changePassword(@Param() id: number, @Body() dto: ChangePasswordDto) {
  //   return this.adminService.changePassword(id, dto);
  // }
}
