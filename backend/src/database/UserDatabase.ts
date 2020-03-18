import { Connection, getCustomRepository } from "typeorm";
import { generateSaltedPassword } from "../utils";
import { User } from "../entity/User";
import { Profile } from "../entity/Profile";

export const UserDatabase = {
    async createUser(connection: Connection, data: {
        email: string;
        passwordHash: string;
    }, profile: Profile) {
        
        const userRepository = connection.getRepository(User);
        const user = new User();
        user.email = data.email;
        user.passwordHash = data.passwordHash;
        user.profile = profile;
        await userRepository.insert(user);
        return user;
    },

    async getUser(connection: Connection, email : string) : Promise<User | undefined> {
        const userRepository = connection.getRepository(User);
        return await userRepository.findOne({ email });
    }
};
