import { Injectable } from '@nestjs/common';
import { getDate, getMonth, getYear, subDays } from 'date-fns';

@Injectable()
export class DateService {
  getDateFormatString(aLocale?: string) {
    const formatObject = new Intl.DateTimeFormat(aLocale).formatToParts(
      new Date(),
    );

    return formatObject
      .map((object) => {
        switch (object.type) {
          case 'day':
            return 'dd';
          case 'month':
            return 'MM';
          case 'year':
            return 'yyyy';
          default:
            return object.value;
        }
      })
      .join('');
  }

  getDateWithTimeFormatString(aLocale?: string) {
    return `${this.getDateFormatString(aLocale)}, HH:mm:ss`;
  }
  getToday() {
    const year = getYear(new Date());
    const month = getMonth(new Date());
    const day = getDate(new Date());

    return new Date(Date.UTC(year, month, day));
  }

  getUtc(aDateString: string) {
    const [yearString, monthString, dayString] = aDateString.split('-');

    return new Date(
      Date.UTC(
        parseInt(yearString, 10),
        parseInt(monthString, 10) - 1,
        parseInt(dayString, 10),
      ),
    );
  }
  getYesterday() {
    const year = getYear(new Date());
    const month = getMonth(new Date());
    const day = getDate(new Date());

    return subDays(new Date(Date.UTC(year, month, day)), 1);
  }
}
