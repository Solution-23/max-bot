import { User } from '../entity/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class SetAdminUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    execute(userId: number): User {
        let user = this.userRepository.findById(userId);
        if (!user) {
            user = this.userRepository.create({ id: userId, username: null });
        }

        const updatedUser = this.userRepository.update(userId, {
            options: { ...user.options, role: 'admin' }
        });

        return updatedUser;
    }
}
