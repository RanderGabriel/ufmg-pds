import { Connection } from "typeorm";
import { Profile } from "../entity/Profile";

const ProfileDatabase = jest.createMockFromModule('../ProfileDatabase')

let mockProfileName = ''
Profile.__setMockProfileName = (name: string) => {
    mockProfileName = name
}

ProfileDatabase.getProfile = async (connection: Connection, name: string) => {
       return new Promise((resolve, rejects) =>  {
           const profile = new Profile()
           profile.name = mockProfileName
           resolve(profile)
       })
    }

