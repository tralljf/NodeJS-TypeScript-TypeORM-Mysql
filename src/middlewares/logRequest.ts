import { Request, Response, NextFunction } from 'express';
import LogRequest from '../models/LogRequest'
import { getRepository } from 'typeorm';

export default function logRequest(request: Request, response: Response, next: NextFunction) {

    const { body, method, url, ip } = request;
    const logRequestRepository = getRepository(LogRequest);
    // console.log(`${method} - ${url} - ${body}  - ${ip}`)
    const resposta = next();
    const logRequest = logRequestRepository.create({
        json_body: JSON.stringify(body),
        method,
        action: url,
        ip,
        parameters: JSON.stringify(request.params),
        response_value: JSON.stringify(response.json),
        user_agent: JSON.stringify(request.headers?.defaults) || '',
        exception_msg: response.statusMessage || '', //achar como pegar o valor do erro
        user: request.user?.id || '',
        response_status: response.statusCode
    });
    const log = logRequestRepository.save(logRequest); //não me importa se vai demorar pra salvar
    // console.log(response);
}
