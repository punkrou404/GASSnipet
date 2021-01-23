function createDocumentAppW(){
  return new DocumentAppW();
}

class DocumentAppW {
  /**
  * @func 段落内の文章を取得する
  * @param {string} title - 段落名
  * @param {string} fileId - ファイルID
  */
  getParagraphContent(title, fileId) {
    let active = false;
    let content = '';

    DocumentApp.openById(fileId)
    .getBody()
    .getParagraphs()
    .forEach(e => {
      // お目当ての段落だった為、フラグを立てて次へ
      if(title === e.getText()) {
        active = true;
        return;
      }

      // お目当ての段落が終わった為、フラグを回収して次へ
      if(DocumentApp.ParagraphHeading.HEADING1 === e.getHeading()) {
        active = false;
        return;
      }

      // お目当ての段落内のテキストは保持しておく
      if(active) {
        content += `${e.getText()}\n`;
      }
    });

    return content;
  }

  /**
  * @func ファイル内の文章を全て取得する
  * @param {string} fileId - ファイルID 
  */
  getContent(fileId) {
    return DocumentApp.openById(fileId).getBody().getText();
  }
  
  /**
  * @func ファイルタイトルを取得する
  * @param {string} fileId - ファイルID 
  */
  getTitle(fileId) {
    return DocumentApp.openById(fileId).getName();
  }
}
