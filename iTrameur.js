const { app, BrowserWindow, Menu, MenuItem } = require('electron')
require('electron-reload')(__dirname)
const fs = require('fs')
var path = require('path')

// saved folder that would hold all the saved files
const savedFolder = __dirname + '\\saved\\';

// global variable that holds the app window
let win;

// menu template for the menubar
let menu_template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'About',
        click() {
          win.loadURL("http://www.tal.univ-paris3.fr/trameur/#iTrameur")
        }
      },
      {
        label: 'Quit iTrameur',
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
        click() {
          savePageOffline()
        }
      },
      // { type: 'separator' },
      // {
      //   label: 'Exit',
      //   click() {
      //     app.quit()
      //   }
      // }
    ]
  },
  // {
  //   label: 'Site',
  //   submenu: [
  //     {
  //       label: 'Login',
  //       click() {
  //         win.loadURL("https://auth.geeksforgeeks.org")
  //       }
  //     },
  //     {
  //       label: 'Logout',
  //       click() {
  //         win.loadURL("https://auth.geeksforgeeks.org/logout.php")
  //       }
  //     },
  //   ]
  // },
  // {
  //   label: 'Learn',
  //   submenu: [
  //     {
  //       label: 'Quiz Corner',
  //       click() {
  //         win.loadURL("https://www.geeksforgeeks.org/quiz-corner-gq/")
  //       }
  //     },
  //     {
  //       label: 'Last Minute Notes',
  //       click() {
  //         win.loadURL("https://www.geeksforgeeks.org/lmns-gq/")
  //       }
  //     },
  //     {
  //       label: 'Interview Experiences',
  //       click() {
  //         win.loadURL("https://www.geeksforgeeks.org/company-interview-corner/")
  //       }
  //     },
  //     {
  //       label: 'Must-Do Questions',
  //       click() {
  //         win.loadURL("https://www.geeksforgeeks.org/must-do-coding-questions-for-companies-like-amazon-microsoft-adobe/")
  //       }
  //     }
  //   ]
  // },
  // {
  //   label: 'Practice Questions',
  //   submenu: [
  //     {
  //       label: 'Online IDE',
  //       click() {
  //         // creating new browser window for IDE
  //         ide_win = new BrowserWindow({
  //           width: 800,
  //           height: 450,
  //         })

  //         ide_win.loadURL("https://ide.geeksforgeeks.org")

  //         // delete this window when closed
  //         ide_win.on('closed', () => {
  //           ide_win = null
  //         })
  //       }
  //     },
  //     { type: 'separator' },
  //     {
  //       label: 'Easy Questions',
  //       click() {
  //         win.loadURL("https://practice.geeksforgeeks.org/explore/?difficulty[]=0&page=1")
  //       }
  //     },
  //     {
  //       label: 'Medium Questions',
  //       click() {
  //         win.loadURL("https://practice.geeksforgeeks.org/explore/?difficulty[]=1&page=1")
  //       }
  //     },
  //     {
  //       label: 'Hard Questions',
  //       click() {
  //         win.loadURL("https://practice.geeksforgeeks.org/explore/?difficulty[]=2&page=1")
  //       }
  //     },
  //     { type: 'separator' },
  //     {
  //       label: 'Latest Questions',
  //       click() {
  //         win.loadURL("https://practice.geeksforgeeks.org/recent.php")
  //       }
  //     }
  //   ]
  // },
   {
    id: 'saved',
    label: 'Saved Articles',
    submenu: []
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Trameur',
        click() {
          win.loadURL("http://www.tal.univ-paris3.fr/trameur/#iTrameur")
        }
      },
    //   {
    //     label: 'Pick Suggested Article',
    //     click() {
    //       win.loadURL("https://contribute.geeksforgeeks.org/request-article/request-article.php#pickArticleDiv")
    //     }
    //   },
    //   {
    //     label: 'Write Interview Experience',
    //     click() {
    //       win.loadURL("https://contribute.geeksforgeeks.org/wp-admin/post-new.php?interview_experience")
    //     }
    //   }
    ]
  }
];

function createWindow() {

  // creating the browser window.
  win = new BrowserWindow({
    width: 960,
    height: 540,
  })

  // load automatically redirecting url to login and feed
  win.loadURL('http://www.tal.univ-paris3.fr/trameur/iTrameur/')

  win.on('closed', () => {
    win = null
  })

  // prevent from spawning new window
  win.webContents.on('new-window', (event, url) => {

    event.preventDefault()
    win.loadURL(url)
  })

  // build the template and use the menu
  const menu = Menu.buildFromTemplate(menu_template)
  Menu.setApplicationMenu(menu)

  getSavedArticles();
}

// function to save a page offline
function savePageOffline() {
  pageTitle = win.getTitle()
  console.log("Saving:", pageTitle)

  win.webContents.savePage(savedFolder + pageTitle + '.html', 'HTMLComplete').then(() => {
    appendItemToMenu(pageTitle + '.html');
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  })
}

// function to get all saved articles
// and update the menu
function getSavedArticles() {
  // create new firectory if it does not exist
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
  curr_menu = Menu.getApplicationMenu().getMenuItemById("saved").submenu

  curr_menu.append(
    new MenuItem({
      label: path.basename(filename, '.html'),
      click() {
        console.log('Saved page opened')
        win.loadFile(savedFolder + path.basename(filename))
      }
    }))
}

// executing the createWindow function
// when the app is ready
app.on('ready', createWindow)


