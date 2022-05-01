import { Module } from '@nestjs/common';
import { CsvParser } from './parsers/csv.parser';

@Module({
  providers: [CsvParser],
  exports: [CsvParser],
})
export class UtilsModule {}
