import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindOneUserDto,
  PaginationDto,
  UpdateUserDto,
  Users,
  UserServiceController,
  UserServiceControllerMethods,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(findOneUser: FindOneUserDto) {
    return this.usersService.findOne(findOneUser.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUser: FindOneUserDto) {
    return this.usersService.remove(findOneUser.id);
  }

  queryUsers(paginationDto: Observable<PaginationDto>): Observable<Users> {
    return this.usersService.queryUsers(paginationDto);
  }
}
