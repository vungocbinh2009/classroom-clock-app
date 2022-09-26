import { dialog, ipcMain, IpcMainEvent, OpenDialogOptions } from "electron";

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
};
