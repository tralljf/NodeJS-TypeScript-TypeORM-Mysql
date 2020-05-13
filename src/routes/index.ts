import { Router } from 'express'

import userRoutes from './user.routes'
import sessionsRoutes from './session.routes'


const routes = Router()

routes.use('/users', userRoutes); //A ROTA USERS necessita de autenticação, configuração esta na rota.
routes.use('/sessions', sessionsRoutes);

routes.get('/', (request, response) => {
    response.json({
        menssage: "Hello Word"
    })
})

export default routes;
