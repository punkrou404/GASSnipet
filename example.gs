/**
 * @desc
 * 平日毎日会議を行う場合
 * トリガーで下記を日次実行で指定し、土日祝の場合は準備をやめる
 * 
 */
const exampleService = () => {
  // 0. 平日判定をする
  const today = new GASJapanDate();
  if(today.isHoliday() && today.isNationalHoliday()) {
    console.info(`土日祝のため投稿をスキップします`);
    return;
  } 

  // 1. 議事録の準備をする
  const title = `${today.formatted()}-〇〇発表会のテーマ決め`;
  copyGoogleDocs(title, TEMPLATE_DOCS_ID, MEETING_NOTE_DRIVE_ID);

  // 2. 会議の周知をする
  const text = `<users/all> 今日は「〇〇発表会のテーマ決め」です！`;
  postGoogleChats(text, CHATS_ROOM_URL);
};
