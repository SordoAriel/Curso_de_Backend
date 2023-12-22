import mongoose from 'mongoose'
import config from '../../../config.js'
import { logger } from '../../../winston.js'

mongoose.connect(config.mongo_uri) 
.then(()=> logger.info('Connected to DB'))
.catch((error) => logger.fatal('Couldnt connect to DB:', error))

