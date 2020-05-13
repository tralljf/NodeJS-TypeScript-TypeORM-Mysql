import { Router } from 'express'
import { getRepository} from 'typeorm';
import User from '../models/User'
import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import multer from 'multer'
import uploadConfig from '../config/upload'
import UploadUserAvatarService from '../services/UploadUserAvatarService'
import AppError from '../erros/AppError';

const userRouter = Router();
const upload = multer(uploadConfig);

// userRouter.use(ensureAuthenticated); //se ativo obriga a toda as rotas serem autenticadas
// Exceto a rota de create esta aberta sem a necessidade do usuário estar autenticado

userRouter.get('/', ensureAuthenticated, async (request, response) => {
    const userRepository = getRepository(User);

    const users = await userRepository.find()

    return response.json(users)

})

userRouter.get('/', ensureAuthenticated, async (request, response) => {
    const params = request.params

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({...params})

    return response.json(user)

})

userRouter.post('/', async (request, response) => {
    const {nome, email, password} = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
        nome,
        email,
        password
    })

    return response.json(user)

})


userRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

    const avatarFilename  = request.file.filename
    const user_id = request.user.id

    const updateAvatar = new UploadUserAvatarService()

    const user =  await updateAvatar.execute({avatarFilename, user_id})

    return response.json(user)
})





export default userRouter;
