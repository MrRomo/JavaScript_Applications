const {app,BrowserWindow, Menu, ipcMain} = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs');


if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname, '../node_modules','.bin','electron')
    })
}

let mainWindow
let newProductWindow

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/index.html'),
        protocol: 'file',
        slashes: true
    }))
    const mainMenu = Menu.buildFromTemplate(templateMenu)    
    Menu.setApplicationMenu(mainMenu)
    mainWindow.on('closed', ()=> {
        app.quit()
    })
    
})

ipcMain.on ('new:Product',(e,newProduct) => {
    mainWindow.webContents.send('new:Product',newProduct)
    newProductWindow.close() 
})
ipcMain.on('readyIndex', (e)=>{
    var cont = fs.readFileSync(path.join(__dirname,'./file.json'))
    var jsonCont = JSON.parse(cont);
    mainWindow.webContents.send('charge:Product',jsonCont)
})
ipcMain.on('save:Product',(e,productJSON)=>{
    fs.writeFileSync(path.join(__dirname,'./file.json'), (productJSON));
  //  fs.writeFileSync(path.join(__dirname,'./file.json'), (productJSON));
})
const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New product',
                accelerator: 'Ctrl+N',
                click() {
                    createNewProductWindow()
                }
            },
            {
                label:'Remove all products',
                click() {
                    mainWindow.webContents.send('remove:products')
                }
            },
            {
                label: 'Exit',
                accelerator: 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    }
];

function createNewProductWindow() {
    newProductWindow = new BrowserWindow({
        width: 400,
        height:300,
        title: 'Add a new Product'
    })
    //newProductWindow.setMenu(null)
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }))
    newProductWindow.on('close',()=>{
        newProductWindow = null;
    })
}

if(process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    })
}
if(process.env.NODE_ENV!=='production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}