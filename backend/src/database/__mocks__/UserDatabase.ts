import { Connection,  } from "typeorm";
import { User } from "../../entity/User";
import { Profile } from "../../entity/Profile";

const UserDatabase = (jest as any).createMockFromModule('../UserDatabase')

let mockUser = undefined

UserDatabase.__setMockUser = (user: User) => {
    mockUser = user
}

UserDatabase.createUser = async (connection: Connection, data: {
        email: string;
        passwordHash: string;
        name: string;
        phoneNumber: string;
    }, profile: Profile) => {
        
        return new Promise((resolve, rejects) => {
            resolve()
        })
    },

UserDatabase.getUser = async (connection: Connection, email : string) : Promise<User | undefined> => {
    return new Promise((resolve, rejects) => {
        resolve(mockUser)
    })
}

