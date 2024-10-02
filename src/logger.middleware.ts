import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment';
import { dateFormat, logLengthLimit } from './app.constant';
 

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  async use(request: Request, response: Response, next: NextFunction): Promise<void> {
    const startTime = new Date().getTime();
    const { body, originalUrl } = request;
    const publicIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    const genTrxnCode = "";
    request['genTrxnCode'] = genTrxnCode;

    console.log(`${moment().format(dateFormat)} ${genTrxnCode} [${publicIp}] BEGIN <## * SERVICE=${originalUrl ?? 'NULL'} ##>`);
    console.log(`${moment().format(dateFormat)} ${genTrxnCode} [${publicIp}] access INFO - REQ :: ${JSON.stringify(body)}`);

    let send = response.send;
    response.send = (exitData: string) => {
      const praseData = JSON.parse(exitData);
      const isCharLenghtMoreThanLimit = exitData.length >= logLengthLimit;

      if (praseData?.respCode === '00') {
        console.log(
          `${moment().format(dateFormat)} ${genTrxnCode} [${publicIp}] access INFO - RES :: ${exitData.substring(0, logLengthLimit)} ${
            isCharLenghtMoreThanLimit ? '<...>' : ''
          }`,
        );
      } else {
        console.error(`${moment().format(dateFormat)} ${genTrxnCode} [${publicIp}] access ERROR - RES :: ${exitData}`);
      }
      response.send = send;
      return response.send(praseData);
    };

    response.on('finish', () => {
      const endTime = new Date().getTime();
      const elapsedTime = msToS(endTime - startTime);
      console.log(`${moment().format(dateFormat)} ${genTrxnCode} [${publicIp}] END <## [${elapsedTime}] * SERVICE=${originalUrl} ##>`);
    });

    next();
  }
}

function msToS(milliseconds: number): string {
  if (milliseconds < 1000) {
    return `${milliseconds} ms`;
  } else {
    const seconds = milliseconds / 1000;
    return `${seconds.toFixed(2)} s`;
  }
}
