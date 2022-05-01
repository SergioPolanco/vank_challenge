import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceExternalService } from './invoice-external.service';
import { UserEntity } from '../../users/entities/user.entity';
import { BankEntity } from '../..//banks/entities/bank.entity';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { CreateBankDto } from 'src/banks/dtos/create-bank.dto';
import { CURRENCIES } from '../../common/constants/currencies.constants';

describe('Creating invoices', () => {
  let service: InvoiceService;
  const mockedRepo = {
    create: jest.fn(),
    save: jest.fn(),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: InvoiceExternalService,
          useValue: {},
        },
        {
          provide: InvoiceRepository,
          useValue: mockedRepo,
        },
      ],
    }).compile();

    service = app.get<InvoiceService>(InvoiceService);
  });

  it('should create a invoice correctly', async () => {
    const createSpy = jest.spyOn(mockedRepo, 'create');
    const fakeBank = new BankEntity();
    const fakeUser = new UserEntity();
    const fakeInvoice: CreateInvoiceDto = {
      id: 1,
      vendor: new CreateUserDto(),
      creditTotal: 11.4,
      paymentTotal: 10.4,
      total: 20.5,
      currency: CURRENCIES.CLP,
      number: '12a',
      date: new Date('01/01/2020'),
      dueDate: new Date('01/01/2020'),
      paymentDate: new Date('20/06/2021'),
      bank: new CreateBankDto(),
    };
    await service.create(fakeInvoice, fakeUser, fakeBank);
    expect(createSpy).toHaveBeenCalledWith({
      ...fakeInvoice,
      bank: fakeBank,
      vendor: fakeUser,
    });
  });
});
