import { Connection } from "typeorm";
import { Profile } from "../entity/Profile";

export const ProfileDatabase = {
    async getProfile(connection: Connection, name: string) {
        const profileRepository = connection.getRepository(Profile);
        const profile = await profileRepository.findOne({ name });
        return profile;
    }
}
