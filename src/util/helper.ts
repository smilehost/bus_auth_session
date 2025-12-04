import KSUID from "ksuid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

class Helper {
    static async generateOneTimeKey(): Promise<string> {
        const ksuid = await KSUID.random();
        return ksuid.string;
    }  
     static getCurrentTimestamp() {
    return dayjs().format();
  }

  static getCurrentDate() {
    return dayjs().format("YYYY-MM-DD");
  }

  static getCurrentTime() {
    return dayjs().format("HH:mm:ss");
  }

  static getCurrentDateTime() {
    return dayjs().format("YYYY-MM-DD HH:mm:ss");
  }

  static getCurrentUnixTimestamp() {
    return dayjs().unix();
  }

  static formatDate(date: string | Date, format = "YYYY-MM-DD") {
    return dayjs(date).format(format);
  }

  static formatDateTime(date: string | Date, format = "YYYY-MM-DD HH:mm:ss") {
    return dayjs(date).format(format);
  }

  static formatTime(date: string | Date, format = "HH:mm:ss") {
    return dayjs(date).format(format);
  }

  static convertToUTC(date: string | Date) {
    return dayjs(date).utc().format();
  }

  static convertToTimeZone(date: string | Date, timezone = "Asia/Bangkok") {
    return dayjs(date).tz(timezone).format();
  }

  static calculateDateDifference(date1: string | Date, date2: string | Date, unit: dayjs.ManipulateType = "day") {
    const d1 = dayjs(date1);
    const d2 = dayjs(date2);
    return d2.diff(d1, unit);
  }

  static addToDate(date: string | Date, value: number, unit: dayjs.ManipulateType = "day") {
    return dayjs(date).add(value, unit).format();
  }

  static subtractFromDate(date: string | Date, value: number, unit: dayjs.ManipulateType = "day") {
    return dayjs(date).subtract(value, unit).format();
  }
}

export default Helper;