/**
 * @func フォルダ内のファイルをコピーする　
 * @param {string} title - コピー先タイトル
 * @param {string} srcDocsId - コピー元ファイルID
 * @param {string} outputDriveId - コピー先ドライブID
 */
const copyFile = (title, srcDocsId, outputDriveId) => {
    console.log(`DriveAppW#copyFile start`);

    const templateFile = DriveApp.getFileById(srcDocsId);
    var outputFolder = DriveApp.getFolderById(outputDriveId);
    templateFile.makeCopy(title, outputFolder);
}
  
/**
 * @func ファイルIDを取得する
 * @param {string} fileName - 対象のファイル名
 */
const getFileId = (fileName) => {
    console.log(`DriveAppW#getFileId start`);

    return DriveApp.getFilesByName(fileName).next().getId();
};