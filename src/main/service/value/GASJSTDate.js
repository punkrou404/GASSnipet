function createGASJSTDate() {
  return new GASJSTDate();
};

/**
 * @class GoogleAppsScript上でDate(日本時間)を管理する
 * @description
 * ロケール設定してもできないらしいので愚直に足し算する
 * そのため表示は「Eastern Standard Time」になってるが、日本時間になってるので注意
 * 参考：https://nju33.com/javascript/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97
 */
class GASJSTDate {
  constructor() {

    const diffJST = ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000);
    this.value = new Date(Date.now() + diffJST);
    console.info(`GASJSTDate#constructor 今日の日付: ${this.value}`);

    this.HolidaysCalendarId = 'ja.japanese#holiday@group.v.calendar.google.com';
    console.info(`GASJSTDate#constructor 祝日カレンダーID：${this.HolidaysCalendarId}`);
  }

  /**
   * @return {string} - `YYYY/(M)M/(d)d`で返却する
   */
  formatted() {
    return `${this.value.getFullYear()}-${this.value.getMonth()+1}-${this.value.getDate()}`;
  }

  /**
   * @return {boolean} - 土日ならtrue,そうでないならばfalse
   */
  isHoliday() {
    const restDays = [`REST`,`mon`,`tue`,`wed`,`thu`,`fri`,`REST`];
    if ( restDays [this.value.getDay()] == `REST` ) {
      return true;
    };

    return false;
  }

  /**
   * @return {boolean} - 祝日ならtrue,そうでないならばfalse
   */
  isNationalHoliday() {
    const jpHolidays = CalendarApp.getCalendarById(this.HolidaysCalendarId);

    if (null === jpHolidays) {
      throw new Error(`管理者のカレンダーに${this.HolidaysCalendarId}(日本の祝日)を追加する必要があります。`);
    }

    const startDate = new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate());
    startDate.setDate(1);
    console.info(`GASJSTDate#isNationalHoliday 判定日付の月初：${startDate.toDateString()}`);

    const endDate = new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate());
    endDate.setDate(1);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
    console.info(`GASJSTDate#isNationalHoliday 判定日付の月末：${endDate.toDateString()}`);

    console.info(`GASJSTDate#isNationalHoliday 今月の祝日一覧取得 start`);
    jpHolidays
      .getEvents(startDate, endDate)
      .forEach(c => {
        console.info(`${c.getStartTime().toDateString()}：${c.getTitle()}`);
      });
    console.info(`GASJSTDate#isNationalHoliday 今月の祝日一覧取得 end`);

    if(jpHolidays.getEventsForDay(this.value).length != 0) {
      return true;
    };

    return false;
  }
}
