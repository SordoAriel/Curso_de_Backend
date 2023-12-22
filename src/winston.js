import winston from 'winston';
import config from './config.js';

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'cyan',
        debug: 'green'
    }
}

export let logger 
    
if(config.environment === 'prod'){
    logger= winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.File({
                filename: "./errors.log",
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'hh:mm A DD-MM-YYYY'
                    }),
                    winston.format.simple(),
                    winston.format.prettyPrint()
                )
            })
        ]
    })
}

if(config.environment === 'dev'){
    logger= winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevels.colors}),
                    winston.format.timestamp({
                        format: 'hh:mm A DD-MM-YYYY'
                    }),
                    winston.format.simple(),
                )
            }),
        ]
    })
}
