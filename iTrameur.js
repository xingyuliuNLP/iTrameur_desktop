const { app, BrowserWindow, Menu, MenuItem, dialog, ipcMain } = require('electron')
// require('electron-reload')(__dirname)
const fs = require('fs')
var path = require('path')

// saved folder that would hold all the saved files
const savedFolder = __dirname + '_saved/';

// global variable that holds the app window
let win;

// menu template for the menubar
let menu_template = [
  {
    label: 'F',
    submenu: [
      {
        label: 'Back to iTrameur',
        accelerator: 'CommandOrControl+R',
        click() {
          win.loadURL("http://www.tal.univ-paris3.fr/trameur/iTrameur")
        }
      },
      {
        label: 'Quit',
        accelerator: 'CommandOrControl+Q',
        click() {
          app.quit()
        }
      }
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'Save Page Offline',
        accelerator: 'CommandOrControl+S',
        click() {
          savePageOffline()
        }
      }
    ]
  },
  {
    id: 'saved',
    label: 'Saved Results',
    submenu: []
  },
  {
    label: 'About',
    submenu: [
      {
        label: 'Trameur',
        click() {
          win.loadURL("http://www.tal.univ-paris3.fr/trameur/#iTrameur")
        }
      },
    ]
  }
];

function createWindow() {

  // creating the browser window.
  win = new BrowserWindow({
    width: 960,
    height: 600,
  })

  // load automatically redirecting url to login and feed
  win.loadURL('http://www.tal.univ-paris3.fr/trameur/iTrameur/')

  win.on('closed', () => {
    win = null
  })

  // build the template and use the menu
  const menu = Menu.buildFromTemplate(menu_template)
  Menu.setApplicationMenu(menu)

  getSavedArticles();
}

// function to save a page offline
function savePageOffline() {
  // pageTitle = win.getTitle()
  // console.log("Saving:", pageTitle)
  // const file = dialog.showSaveDialog();
  const file = dialog.showSaveDialog({
    title: 'Save HTML',
    // defaultPath: app.getPath('documents'),
    defaultPath: '../iTrameur_saved',
    filters: [
      { name: 'HTML Files', extensions: '.html' }
    ]
  });
  // If the user selects cancel in the File dialog box, aborts the function.
  if (!file) return;


  win.webContents.savePage(savedFolder + file + '.html', 'HTMLComplete').then(() => {
    appendItemToMenu(file);
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  });
}


// function to get all saved articles
// and update the menu
function getSavedArticles() {
  // create new directory if it does not exist
  if (!fs.existsSync(savedFolder)) {
    fs.mkdirSync(savedFolder);
  }

  fs.readdirSync(savedFolder).forEach(file => {
    if (path.extname(file) == '.html') {
      appendItemToMenu(file)
    }
  });
}

// function to append the given
// page to the submenu
function appendItemToMenu(filename) {
  const newMenu = Menu.getApplicationMenu()
  curr_menu = Menu.getApplicationMenu().getMenuItemById("saved").submenu

  curr_menu.append(
    new MenuItem({
      label: path.basename(filename, '.html'),
      click() {
        console.log('Saved page opened')
        win.loadFile(savedFolder + path.basename(filename))
      }
    }))
  Menu.setApplicationMenu(newMenu)
}

// executing the createWindow function
// when the app is ready
app.on('ready', createWindow)


