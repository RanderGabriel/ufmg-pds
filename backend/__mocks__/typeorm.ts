
// export const createConnection = () => new Promise((resolve) => resolve({
//         getRepository: () => ({
//             findOne: () => ({}),
//             delete: () => ({}),
//             save: (param) => new Promise((resolve) => resolve(param)),
//             find: jest.fn()
//         }),
//         close: () => jest.fn(),
//     }));


// export const getConnection = jest.fn()
// getConnection.mockReturnValue({
//     getRepository: () => ({
//         findOne: () => ({}),
//         delete: () => ({}),
//         save: (param) => new Promise((resolve) => resolve(param)),
//         find: jest.fn()
//     }),
//     close: () => jest.fn(),
// })

export const getRepository = jest.fn(() => ({
    findOne: jest.fn(() => ({})),
    delete: jest.fn(() => ({})),
    save: jest.fn((param) => new Promise((resolve) => resolve(param))),
    find: jest.fn()
} as any))

export const Entity =  jest.fn();
export const Column =  jest.fn();
export const PrimaryGeneratedColumn =  jest.fn();
export const ManyToOne =  jest.fn();
export const JoinColumn =  jest.fn();
export const OneToOne =  jest.fn();