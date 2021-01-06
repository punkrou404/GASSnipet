/**
 * @func 既存GoogleDocumentsファイルの本文を取得する　
 * @param {string} fileName - 対象のファイル名
 * @return {string} text - ファイル本文
 */
const getContent = (fileName) => {
    console.log(`DocumentAppW#getContent start`);

    const fileId = DriveApp.getFilesByName(fileName).next().getId();
    const file = DocumentApp.openById(fileId);
    return file.getBody().getText();
};

/**
 * @func 段落内の文章を取得する
 * @param {string} title - 段落名
 * @param {string} fileId - ファイルID
 */
const getParagraphContent = (title, fileId) => {
    console.log(`DocumentAppW#getParagraphContent start`);

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
            content = e.getText();
        }
    });

    return content;
};

/**
 * @func ファイル内の文章を全て取得する
 * @param {string} fileId - ファイルID 
 */
const getContent = (fileId) => {
    console.log(`DocumentAppW#getContent start`);

    return DocumentApp.openById(fileId).getBody().getText();
}