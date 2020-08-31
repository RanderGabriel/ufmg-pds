
export const createConnection = () => new Promise((resolve, reject) => resolve({
        getRepository: () => ({
            findOne: () => ({}),
            delete: () => ({})
        }),
        close: () => jest.fn(),
    }));
export const Entity =  jest.fn();
export const Column =  jest.fn();
export const PrimaryGeneratedColumn =  jest.fn();
export const ManyToOne =  jest.fn();
export const JoinColumn =  jest.fn();
export const OneToOne =  jest.fn();