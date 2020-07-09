import winston from 'winston'

const isDev = process.env.NODE_HODGEPODGE_ENV === 'development'

const debugFormat = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

const logger = winston.createLogger({
  level: isDev ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.json(),
    ...(isDev ? [winston.format.colorize(), debugFormat] : [winston.format.json()])
  ),
  // defaultMeta: { service: 'project-service' },
  transports: [new winston.transports.Console()],
})

export default logger
