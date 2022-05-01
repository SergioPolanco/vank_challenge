import { Injectable } from '@nestjs/common';

@Injectable()
export class CsvParser {
  toJson(csvData: string): any {
    let obj = [];
    const lines = this.linesToArray(csvData);

    for (const line of lines) {
      const columns = this.columnsToArray(line);
      obj = [...obj, columns];
    }

    return obj;
  }

  private linesToArray(data: string): string[] {
    const lines = data.split(/\r?\n/);
    return lines;
  }

  private columnsToArray(column: string): string[] {
    const columns = column.split(',');
    return columns;
  }
}
