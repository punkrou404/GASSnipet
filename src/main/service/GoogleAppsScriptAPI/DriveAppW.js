/**
 * @func フォルダ内のファイルをコピーする　
 * @param {string} title - コピー先タイトル
 * @param {string} srcDocsId - コピー元ファイルID
 * @param {string} outputDriveId - コピー先ドライブID
 */
function copyFile(title, srcDocsId, outputDriveId) {
  const templateFile = DriveApp.getFileById(srcDocsId);
  const outputFolder = DriveApp.getFolderById(outputDriveId);
  templateFile.makeCopy(title, outputFolder);
}

/**
* @func ファイルIDを取得する
* @param {string} fileName - 対象のファイル名
*/
function getFileId(fileName) {
  return DriveApp.getFilesByName(fileName).next().getId();
};

/**
 * @func フォルダ内の最新のファイルIDを取得する
 * @param {string} folderId - フォルダID
 */
function getLatestFileId(folderId) {
  const files = DriveApp.getFolderById(folderId).getFiles();
  const fileDatas = [];

  // 全ファイルIDを取得して
  while (files.hasNext()) {
    var file = files.next();
    fileDatas.push({
      id : file.getId(), 
      date: file.getDateCreated()
    });
  }

  // 日付で並べなおし最新のみ出力
  // sortや日付でのselectはgoogleで実装されていない
  fileDatas.sort((a,b) => {
    if(a.date > b.date) return -1;
    if(a.date < b.date) return 1;
    return 0;
  })

  return fileDatas[0].id;
};