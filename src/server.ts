import express from 'express';
import cors, { CorsOptions } from 'cors';
import { config } from '@/config';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import { limiter } from '@/lib/express_rate_limiter';
import routes from '@/routes/v1';
import { connectToDB } from '@/lib/mongoose';
import { logger } from '@/lib/winston';

const app = express();

/**
 * When testing locally, the origin will be undefined, hence !origin.
 */
// configure CORS
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (
      config.NODE_ENV === 'development' ||
      config.WHITELISTED_URL?.includes(origin as string) ||
      !origin 
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
};

// Cors middleware
app.use(cors(corsOptions));

// To parse the json
app.use(express.json());
app.use(express.urlencoded()); // To parse the form data and stuff

app.use(cookieParser());

// Compress the response larger than 1KB for better performance and optimization
app.use(
  compression({
    threshold: 1024,
  })
);

// Set various HTTP headers to enhance security against common web vulnerabilities like XSS and clickjacking.
app.use(helmet());

// Rate-limiting
app.use(limiter);

(async () => {
  try {
    await connectToDB();

    app.use('/api', routes);
    app.listen(config.PORT, () => {
      logger.info(`Listening on PORT:- ${config.PORT}`);
    });
  } catch (error) {
    logger.error(`An unexpected error occured:- ${error}`);
    if (config.NODE_ENV === 'production') {
      process.exit(1); // Immediately exit in case of failure on production
    }
  }
})();

const handleServerShutDown = async () => {
  try {
    logger.warn('Server shutdown');
    process.exit(0);
  } catch (error) {
    logger.error('Error in server shutdown');
  }
};

process.on('SIGTERM', handleServerShutDown); //process stopped like container shutdown etc
process.on('SIGINT', handleServerShutDown); // process interrupted like ctrl + c
