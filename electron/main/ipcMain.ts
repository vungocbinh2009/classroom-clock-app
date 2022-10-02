import { dialog, ipcMain, IpcMainEvent, OpenDialogOptions } from "electron";
import fs from 'fs'

export let setupIpcMain = () => {
  ipcMain.on("select-file", (event: IpcMainEvent) => {
    let dialogOptions: OpenDialogOptions = {
      title: "Chọn tập tin",
      properties: ["openFile"],
    };
    dialog.showOpenDialog(dialogOptions).then((result) => {
      event.sender.send("select-file-complete", result.filePaths[0]);
    });
  });

  ipcMain.on("select-image", (event: IpcMainEvent) => {
    let dialogOptions: OpenDialogOptions = {
      title: "Chọn file ảnh",
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }],
    };
    dialog.showOpenDialog(dialogOptions).then((result) => {
      let base64Image = fs.readFileSync(result.filePaths[0], "base64")
      event.sender.send("select-image-complete", base64Image);
    });
  });
};
