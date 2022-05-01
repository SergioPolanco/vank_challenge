import { Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from "@nestjs/config";
import { map, Observable } from "rxjs";;
import { CURRENCIES } from "src/common/constants/currencies.constants";
@Injectable()
export class InvoiceExternalService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _configService: ConfigService
  ) {}

  getSourceInvoiceFile(): Observable<string> {
    const url = this._configService.get('INVOICE_FILE_URL');
    return this._httpService.get(url).pipe(map((response: AxiosResponse) => response.data))
  }

  convertCurrency<T>(from: string, to: string): Observable<T> {
    const url = this._configService.get('CURRENCY_CONVERTER_URL');
    const apiKey = this._configService.get('FREE_CURRENCY_API_KEY')
    const q = `${from}_${to}`
    return this._httpService.get(
      url, {
        params: {
          q,
          compact: 'ultra',
          apiKey
        }
      }
    ).pipe(map((response: AxiosResponse) => response.data))
  }
}