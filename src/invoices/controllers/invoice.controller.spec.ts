import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from '../services/invoice.service';
import { QueryStringInvoiceDto } from '../dtos/querystring-invoice.dto';

const findMock = jest.fn();

class InvoiceServiceMock {
  find = findMock;
}

describe('InvoiceController', () => {
  let invoiceController: InvoiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: new InvoiceServiceMock(),
        },
      ],
    }).compile();

    invoiceController = app.get<InvoiceController>(InvoiceController);
  });

  it('should call findAll correctly"', async () => {
    findMock.mockResolvedValue(() => []);
    const queryString: QueryStringInvoiceDto = {
      vendor: '1',
      from: null,
      to: null,
      currency: null,
    };
    const response = await invoiceController.findAll(queryString);
    expect(findMock).toHaveBeenCalledWith(queryString);
    expect(response.length).toBe(0);
  });
});
