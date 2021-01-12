class DriveAppW {
  /**
   * @func フォルダ内のファイルをコピーする　
   * @param {string} title - コピー先タイトル
   * @param {string} srcDocsId - コピー元ファイルID
   * @param {string} outputDriveId - コピー先ドライブID
   */
  copyFile(title, srcDocsId, outputDriveId) {
    console.log(`DriveAppW#copyFile start`);

    const templateFile = DriveApp.getFileById(srcDocsId);
    var outputFolder = DriveApp.getFolderById(outputDriveId);
    templateFile.makeCopy(title, outputFolder);
  }

  /**
  * @func ファイルIDを取得する
  * @param {string} fileName - 対象のファイル名
  */
  getFileId(fileName) {
    console.log(`DriveAppW#getFileId start`);

    return DriveApp.getFilesByName(fileName).next().getId();
  };

  /**
   * @func フォルダ内の最新のファイルIDを取得する
   * @param {string} folderId - フォルダID
   */
  getLatestFileId(folderId) {
    const files = DriveApp.getFolderById(folderId).getFiles();
    const fileDatas = [];

    while (files.hasNext()) {
      var file = files.next();
      fileDatas.push({
        id : file.getId(), 
        date: file.getDateCreated()
      });
    }
    fileDatas.sort((a,b) => {
      if(a.date > b.date) return -1;
      if(a.date < b.date) return 1;
      return 0;
    })

    return fileDatas[0].id;
  };
}