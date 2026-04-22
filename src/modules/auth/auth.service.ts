import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'providers/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Admins, Doctors } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(dto: LoginDto, res: Response) {
    const [admin, doctor] = await Promise.all([
      this.prismaService.admins.findUnique({
        where: { phone_number: dto.phone_number },
      }),
      this.prismaService.doctors.findUnique({
        where: { phone_number: dto.phone_number },
      }),
    ]);
    if (!(doctor || admin)) throw new NotFoundException('User not found');

    let user;
    let role;
    if (admin) {
      user = admin;
      role = 'admin';
    } else {
      user = doctor;
      role = 'doctor';
    }
    
    if(user === admin) {
      const compareAdminPass = await bcrypt.compare(dto.password, admin!.password);
      if(!compareAdminPass) throw new UnauthorizedException('Password is incorrect');
      const tokens = await this.generateToken(admin!);
      await this.prismaService.admins.update({where: {id: user.id}, data: {refresh_token: tokens.refresh_token}})
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        maxAge: Number(this.configService.get<number>('REFRESH_TIME_MS'))
      });
      return {message: 'Admin successfully logged in', status: 200, accessToken: tokens.access_token};
    }else {
      const compareDoctorPass = await bcrypt.compare(dto.password, doctor!.password);
      if(!compareDoctorPass) throw new UnauthorizedException('Password is incorrect');
      const tokens = await this.generateToken(doctor!);
      await this.prismaService.doctors.update({where: {id: user.id}, data: {refresh_token: tokens.refresh_token}});
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        maxAge: Number(this.configService.get<number>('REFRESH_TIME_MS')),
      });
      return {message: 'Doctor successfully logged in', status: 200, accessToken: tokens.access_token};
    };
  }

  async generateToken(user: Admins | Doctors) {
    const isAdmin = 'is_super_admin' in user;
    const payload = {
      sub: user.id,
      role: isAdmin ? 'admin' : 'doctor',
      is_super_admin: isAdmin ? user.is_super_admin : false,
      
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_KEY'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_KEY_TIME') as any,
      }),
      this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_KEY'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_TIME') as any,
      })
    ])
    return {access_token, refresh_token};
  }

  //   async changePassword(id: number, dto: ChangePasswordDto) {
  //     const admin = await this.prismaService.admins.findUnique({ where: { id } });
  //     if (!admin) throw new NotFoundException('Admin not found');
  //     const comparePass = await bcrypt.compare(dto.oldPassword, admin.password);
  //     if (!comparePass)
  //       throw new UnauthorizedException('Old password is incorrect');
  //     if (dto.newPassword !== dto.confirmPassword)
  //       throw new BadRequestException(
  //         'New password and confirm password do not match',
  //       );
  //     if (dto.oldPassword === dto.newPassword)
  //       throw new BadRequestException(
  //         'New password must be different from old password',
  //       );
  //     const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
  //     await this.prismaService.admins.update({
  //       where: { id },
  //       data: {
  //         password: hashedPassword,
  //       },
  //     });
  //     return {message: 'Password changed successfully', status: 200};
  //   }
}
