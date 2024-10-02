import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';
import * as moment from 'moment';
import { dateFormat } from './app.constant';
 

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const publicIp = request.headers['x-forwarded-for'] || request.ip;
    const statusCode = getStatusCode(exception);
    const exceptionMessage = getErrorMessage(exception);
    const errorCode = exception['code'] || 'EB01';
    const genTrxnCode = request['genTrxnCode'];

    let respBody: ResponseInterFace;
    if (exception['response'] !== undefined) {
      respBody = {
        respCode: (exception['response']['statusCode'] || exception['response']['respCode']).toString(),
        respDesc: (exception['response']['message'] || exception['response']['respDesc']) + ` ( ${genTrxnCode} )`,
      };
    } else {
      respBody = {
        respCode: errorCode,
        respDesc: `ກະລຸນາທົດລອງໃຫມ່ອີກຄັ້ງ ( ${genTrxnCode} )`,
      };
    }

    console.error(
      `${moment().format(dateFormat)} ${genTrxnCode} [${publicIp}] access ERROR ⚠️ |${statusCode}| ${exceptionMessage.toUpperCase()} || ${
        respBody.respCode
      } = ${respBody.respDesc}`,
    );

    httpAdapter.reply(ctx.getResponse(), respBody, statusCode);
  }
}

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: unknown): string => {
  return String(exception);
};
