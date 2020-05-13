import "reflect-metadata";
import { createConnection } from 'typeorm'
import User from '../models/User'
import LogRequest from '../models/LogRequest'

createConnection()
