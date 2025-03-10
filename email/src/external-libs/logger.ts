/* eslint-disable no-dupe-class-members */
/* eslint-disable camelcase */
import { createLogger, transports, format, Logger } from 'winston';

interface LoggerOption {
  route_name: string
  storage_status?: string
}

class LoggerService {
  private logger: Logger
  private log_data: any
  private route: any
  private storage: any
  private viewer: any

  constructor({
    route_name,
  }: LoggerOption) {
    this.log_data = null;
    this.route = route_name ;

    this.viewer = [new transports.Console()];
    this.viewer.push(
        new transports.File({
        filename: `./logs/${this.route}.log`
        })
    );
    this.logger = createLogger({
      exitOnError: false, // do not exit on handled exceptions
      transports: this.viewer,
      format: format.combine(
        format.timestamp({
          format: 'YYYYMMDD-HH:mm:ss:SSS'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        format.printf((info: any) => {
          let message = `[${info.timestamp}] | ${this.route}.log | ${info.level} | ${info.message}`;
          message = info.obj
            ? `${message} | data:${JSON.stringify(info.obj)}`
            : message;
          message = this.log_data
            ? `${message} | log_data:${JSON.stringify(this.log_data)}`
            : message;
          return message;
        })
      )
    });
  }

  setLogData(log_data: any) {
    this.log_data = log_data;
  }

  async info(message: string, obj?: any) {
    this.logger.log('info', message, {
      obj
    });
  }

  async debug(name: string, message: string) {
    this.logger.log('debug', `${name} | ${message}`);
  }


  // async error(message, obj) {
  //   this.logger.log("error", message, {
  //     obj
  //   });
  // }

  async warn(message: string, obj?: any) {
    this.logger.log('warn', message, {
      obj
    });
  }

  async error(error: any, additionalData?: any) {
    let message = error;
    // Error-like
    if (error && error.message && error.stack) {
      message = [error.message, '---', JSON.stringify(error.stack)].join('\n');
    }

    if (typeof message !== 'string') {
      message = JSON.stringify(error);
    }

    if (additionalData) {
      message = [message, '---', JSON.stringify(additionalData)].join('\n');
    }
    return this.logger.error(['###', message, '###'].join('\n'));
  }
}

export default LoggerService;