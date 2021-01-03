/**
 * @class GoogleAppsScript上でDate(日本時間)を管理する
 */
class GASJapanDate {
  constructor() {
    console.log(`ロケール設定してもできないらしいので愚直に足し算する`);
    console.log(`そのため表示は「Eastern Standard Time」になってるが、日本時間になってるので注意`);
    console.log(`参照：https://nju33.com/javascript/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97`);

    const diffJST = ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000);
    this.value = new Date(Date.now() + diffJST);
    console.info(`今日の日付: ${this.value}`);

    this.HolidaysCalendarId = 'ja.japanese#holiday@group.v.calendar.google.com';
    console.log(`祝日カレンダーID：${this.HolidaysCalendarId}`);
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
    console.log(`isHoliday start`);

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
    console.log(`isNationalHoliday start`);

    const jpHolidays = CalendarApp.getCalendarById(this.HolidaysCalendarId);

    if (null === jpHolidays) {
      throw new Error(`管理者のカレンダーに${this.HolidaysCalendarId}(日本の祝日)を追加する必要があります。`);
    }

    const startDate = new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate());
    startDate.setDate(1);
    console.log(`判定日付の月初取得：${startDate.toDateString()}`);

    const endDate = new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate());
    endDate.setDate(1);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
    console.log(`判定日付の月末取得：${endDate.toDateString()}`);

    console.info(`今月の祝日一覧`);
    jpHolidays
      .getEvents(startDate, endDate)
      .forEach(c => {
        console.info(`${c.getStartTime().toDateString()}：${c.getTitle()}`);
      });

    if(jpHolidays.getEventsForDay(this.value).length != 0) {
      return true;
    };

    return false;
  };
}
