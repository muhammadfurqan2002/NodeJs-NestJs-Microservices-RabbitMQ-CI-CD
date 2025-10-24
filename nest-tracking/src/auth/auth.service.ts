import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // handle the new user registration

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User already exist!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    const { password: _, ...result } = user;
    return result;
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new ConflictException('Please create account!');
    }
    const hashedPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!hashedPassword) {
      throw new UnauthorizedException('Please enter correct credentials!');
    }
    const token = this.jwtService.sign({ userId: existingUser.id });
    const { password: _, ...results } = existingUser;
    return { ...results, token };
  }
}
