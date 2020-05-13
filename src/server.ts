import express, { Request, Response, NextFunction, request, response } from "express";
import 'express-async-errors';
import './database'
import AppError from './erros/AppError';
import uploadConfig from './config/upload'
import logRequest from './middlewares/logRequest'
import routes from './routes'

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))



app.use(logRequest)
app.use(routes)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }

    console.log('🚨🚨🚨' + err)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })

})

app.listen(3333, () => {
    console.log("Server started on port 3333")
})
