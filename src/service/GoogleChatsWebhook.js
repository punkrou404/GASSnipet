/**
 * @func GoogleChatsに投稿する
 * @param {string} text - 投稿内容
 * @param {string} webhookURL - 投稿先のGoogleChatsの部屋のwebhookURL
 */
const post = (text, webhookURL) => {
  console.log(`post start`);

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
