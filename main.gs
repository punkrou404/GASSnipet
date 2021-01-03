/**
 * @func GoogleChatsに投稿する
 * @param {string} text - 投稿内容
 * @param {string} webhookURL - 投稿先のGoogleChatsの部屋のwebhookURL
 */
const postGoogleChats = (text, webhookURL) => {
  console.log(`postGoogleChats start`);

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
    throw new Error(`WebhookURLが変更されてないか確認してください。現在：${webhookURL}`);
  }
};

/**
 * @func 既存GoogleDocumentsファイルをコピーする　
 * @param {string} title - コピー先タイトル
 * @param {string} srcDocsId - コピー元ファイルID
 * @param {string} outputDriveId - コピー先ドライブID
 */
const copyGoogleDocs = (title, srcDocsId, outputDriveId) => {
  const templateFile = DriveApp.getFileById(srcDocsId);
  var outputFolder = DriveApp.getFolderById(outputDriveId);
  templateFile.makeCopy(title, outputFolder);
}
