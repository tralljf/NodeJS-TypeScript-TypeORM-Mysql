import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UserReposotory from '../repositories/UserReposotory';
import {hashSync} from 'bcrypt';
import AppError from '../erros/AppError';

interface Request {
    nome: string;
    email: string;
    password: string;
}


class CreateUserService {

    public async execute({nome, email, password}: Request): Promise<User>{
        const userRepository = getCustomRepository(UserReposotory);

        const findUserFromEmail = await userRepository.findOne({
            where: {
                email
            }

        })

        if(findUserFromEmail){
            throw new AppError('E-mail já cadastrado');
        }

        const hashPassword = hashSync(password, 8)
        const user = userRepository.create({
            nome,
            email,
            password: hashPassword
        })

        await userRepository.save(user);

        delete user.password;

        return user;
    }

}

export default CreateUserService;
