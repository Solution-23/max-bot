import { User } from '../entity/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): User[] {
    return this.userRepository.findAll();
  }
}