import { getCustomRepository} from 'typeorm';
import User from '../models/User';
import UserReposotory from '../repositories/UserReposotory'
import AppError from '../erros/AppError';
import path from 'path'
import uploadConfig from '../config/upload'
import fs from 'fs'

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UploadUserAvatarService {

    public async execute({ user_id, avatarFilename }: Request): Promise<User|null>{
        const userRepository = getCustomRepository(UserReposotory);

        const user = await userRepository.findOne(user_id)


        if(!user){
            new AppError('User não encontrado, ou não autenticado');
            return null;
        }

        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFilePathExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFilePathExists){
                console.info(userAvatarFilePath)
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFilename

        await userRepository.save(user);

        delete user.password
        return user || null;
    }

}

export default UploadUserAvatarService;
