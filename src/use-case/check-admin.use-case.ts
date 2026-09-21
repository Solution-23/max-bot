import { UserRepository } from '../repositories/user.repository';

export class CheckAdminUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    execute(userId: number): boolean {
        const user = this.userRepository.findById(userId);
        return user?.options.role === 'admin';
    }
}
