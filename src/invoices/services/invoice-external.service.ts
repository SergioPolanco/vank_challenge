import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from "@nestjs/config";
import { map, Observable } from "rxjs";;

@Injectable()
export class InvoiceExternalService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _configService: ConfigService
  ) {}

  getSourceInvoiceFile(): Observable<string>{
    const url = this._configService.get('INVOICE_FILE_URL');
    return this._httpService.get(url).pipe(map((response: AxiosResponse) => response.data))
  }
}