import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: signupDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = this.usersRepository.create({
      email: signupDto.email,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }
}
