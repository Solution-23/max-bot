import { User } from '../entity/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class StartUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    execute({ id, username }: { id: number; username: string | null }): { user: User; isNew: boolean } {
        const existingUser = this.userRepository.findById(id);
        if (!existingUser) {
            const newUser = this.userRepository.create({ id, username });
            return { user: newUser, isNew: true };
        }

        if (existingUser.username !== username) {
            const updatedUser = this.userRepository.update(id, { username });
            return { user: updatedUser, isNew: false };
        }

        return { user: existingUser, isNew: false };
    }
}
