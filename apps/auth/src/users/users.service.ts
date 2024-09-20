import {
  CreateUserDto,
  PaginationDto,
  UpdateUserDto,
  User,
  Users,
} from '@app/common';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let index = 0; index < 100; index++) {
      this.create({
        username: randomUUID(),
        password: randomUUID(),
        age: 0,
      });
    }
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };

    this.users.push(user);
    return user;
  }

  findAll(): Users {
    return { users: this.users };
  }

  findOne(id: string): User {
    return this.users.find((el) => el.id == id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((el) => (el.id = id));

    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto,
      };
    }

    throw new NotFoundException(`user not found ${id}`);
  }

  remove(id: string): User {
    const userIndex = this.users.findIndex((el) => (el.id = id));

    if (userIndex !== -1) {
      return this.users.splice(userIndex)[0];
    }

    throw new NotFoundException(`user not found ${id}`);
  }

  queryUsers(paginationDto: Observable<PaginationDto>): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;

      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };

    const onComplete = () => subject.complete();

    paginationDto.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
