import { config } from '@/config';
import winston from 'winston';

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

const transports: winston.transport[] = [];

/** 
 * Can have multiple transports for handling different logs like error, info etc.
 * Transports are basically storage devices for logs. For example, we can have a transport for logging error logs to a file,
 * and another transport for logging all logs to the console.
 */

// add a console transport only in non-production environments
if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        align(),
        printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : '';
          return `${timestamp} [${level.toUpperCase()}] : ${message}${metaStr}`;
        })
      ),
    })
  );
}


// Logger instance for windston
export const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports,
  silent: config.NODE_ENV === 'test', // disable logging in test environment
})