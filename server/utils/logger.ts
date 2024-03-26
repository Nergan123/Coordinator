import winston from "winston";


let date = new Date().toISOString();
const logFormat = winston.format.printf(function(info) {
    return `${date}-${info.level}: ${JSON.stringify(info.message, null, 4)}\n`;
});

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(winston.format.colorize(), logFormat)
        }),
        new winston.transports.File({
            filename: 'logs/server.log',
            level: "debug",
            format: winston.format.combine(logFormat)
        })
    ]
});
