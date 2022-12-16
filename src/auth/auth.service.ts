import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    //generate the pass
    const hash = await argon.hash(dto.password);
    //save the new user
    try {
      const user: User = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      //return the saved user
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    //find the user by email
    const user: User = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user not exist thro exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password is not correct throw exception
    if (!pwMatches) throw new ForbiddenException('Password is not correct');
    // send back the user
    delete user.hash;
    return user;
  }
}
