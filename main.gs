/**
 * @param {string} text - 投稿内容
 * @param {string} webhookURL - 投稿先のGoogleChatsの部屋のwebhookURL
 */
const postGoogleChats = (text, webhookURL) => {
  console.log(`postGoogleChats start`);

  const today = getJPDate();

  if(
    true === isHoliday(today)
    &&
    true === isNationalHoliday(today)
  ) {
    console.info(`土日祝のため投稿をスキップします`);
    return false;
  } else {
    console.info(`平日のため、投稿処理を開始します`);
  }

  const payload = JSON.stringify({
    'text' : text,
  });
    
  try {
    UrlFetchApp.fetch(webhookURL, {
      'method' : 'POST',
      'contentType' : 'application/json; charset=utf-8',
      'payload' : payload
    });
  } catch(e) {
    console.error(e);
    throw new Error(`WebhookURLに誤りがないか確認してください。現在：${webhookURL}`);
  }
};

/**
 * @return {Date} - GMTから8hマイナスした時刻(≒JST)
 */
const getJPDate = () => {
  console.log(`getJPDate start`);

  console.log(`ロケール設定してもできないらしいので愚直に足し算する`);
  console.log(`そのため表示は「Eastern Standard Time」になってるが、日本時間になってるので注意`);
  console.log(`参照：https://nju33.com/javascript/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97`);

  const today = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
  console.info(`今日の日付: ${today}`);
  return today;
};

/**
 * @param {Date} targetDate - 判定したい日付
 * @return {boolean} - 土日ならtrue,そうでないならばfalse
 */
const isHoliday = (targetDate) => {
  console.log(`isHoliday start`);

  const restDays = [`REST`,`mon`,`tue`,`wed`,`thu`,`fri`,`REST`];
  if ( restDays [targetDate.getDay()] == `REST` ) {
    return true;
  };

  return false;
}

/**
 * @param {Date} targetDate - 判定したい日付
 * @return {boolean} - 祝日ならtrue,そうでないならばfalse
 */
const isNationalHoliday = (targetDate) => {
  console.log(`isNationalHoliday start`);

  const jpHolidaysId = 'ja.japanese#holiday@group.v.calendar.google.com';
  const jpHolidays = CalendarApp.getCalendarById(jpHolidaysId);

  if (null === jpHolidays) {
    throw new Error(`管理者のカレンダーに${jpHolidaysId}(日本の祝日)を追加する必要があります。`);
  }

  const startDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  startDate.setDate(1);
  console.log(`判定日付の月初取得：${startDate.toDateString()}`);

  const endDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
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

  if(jpHolidays.getEventsForDay(targetDate).length != 0) {
    return true;
  };

  return false;
};
