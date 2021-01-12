function createDriveAppW() {
  return new DriveAppW();
}

class DriveAppW {
  /**
  * @func フォルダ内のファイルをコピーする　
  * @param {string} title - コピー先タイトル
  * @param {string} srcDocsId - コピー元ファイルID
  * @param {string} outputDriveId - コピー先ドライブID
  */
  copyFile(title, srcDocsId, outputDriveId) {
    const templateFile = DriveApp.getFileById(srcDocsId);
    const outputFolder = DriveApp.getFolderById(outputDriveId);
    templateFile.makeCopy(title, outputFolder);
  }

  /**
  * @func ファイルIDを取得する
  * @param {string} fileName - 対象のファイル名
  */
  getFileId(fileName) {
    return DriveApp.getFilesByName(fileName).next().getId();
  };

  /**
  * @func フォルダ内の最新のファイルIDを取得する
  * @param {string} folderId - フォルダID
  */
  getLatestFileId(folderId) {
    const files = DriveApp.getFolderById(folderId).getFiles();
    const fileDatas = [];

    // 全ファイルIDを取得して
    while (files.hasNext()) {
      const file = files.next();
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

  /**
  * @func フォルダ内の最新のフォルダ名を取得する
  * @param {string} folderId - フォルダID
  */
  getLatestFolderName(folderId) {
    const folders = DriveApp.getFolderById(folderId).getFolders();
    const folderDatas = [];

    // 全フォルダIDを取得して
    while (folders.hasNext()) {
      const folder = folders.next();
      folderDatas.push({
        name : folder.getName(), 
        date: folder.getDateCreated()
      });
    }

    // 日付で並べなおし最新のみ出力
    // sortや日付でのselectはgoogleで実装されていない
    folderDatas.sort((a,b) => {
      if(a.date > b.date) return -1;
      if(a.date < b.date) return 1;
      return 0;
    })

    return folderDatas[0].name;
  }
}