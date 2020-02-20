# iTrameur Desktop
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Why
create a simple application using Electron that acts as a wrapper around the iTrameur website
It contains the ability to quickly navigate to all parts of the website and save results that could be later read offline.

// save with my own name
// const saveHtml = exports.saveHtml = (targetWindow, content) => {
//   const file = dialog.showSaveDialog(targetWindow, {
//     title: 'Save HTML',
//     defaultPath: app.getPath('documents'),
//     filters: [
//       { name: 'HTML Files', extensions: ['html', 'htm'] }
//     ]
//   });

//   if (!file) return;

//   fs.writeFileSync(file, content);
// };

if you are oriented to another page, click iTrameur->back to iTrameur in the menu bar

function savePageOffline() {
  ipcMain.on('save-dialog', function (event) {
    const options = {
      title: 'Enregistrer une image',
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
      ]
    }
    dialog.showSaveDialog(options, function (filename) {
      event.sender.send('saved-file', filename)
    })
}