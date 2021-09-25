const {
    app,
    BrowserWindow,
    TouchBar,
    ipcMain,
    globalShortcut,
    Notification,
} = require('electron')

const {
    TouchBarButton,
    TouchBarSpacer
} = TouchBar

var win = null


const closeApp = new TouchBarButton({
    label: '关闭',
    click: () => {
        app.quit()
    }
})

const touchBar = new TouchBar({
    items: [
        closeApp, new TouchBarSpacer(),
    ]
})


ipcMain.on('copysuccess', (event, arg) => {
    new Notification({
        title: '复制成功 :)',
        body: arg
    }).show()
})
ipcMain.on('copyfailed', (event, arg) => {
    new Notification({
        title: '复制失败 :(',
        body: arg
    }).show()
})

function createWindow() {
    const win = new BrowserWindow({
        width: 1080,
        height: 768,
        resizable: false,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            scrollBounce: true,
            defaultFontFamily: 'monospace',
        },
        opacity: 0.98,
        center: true
    })
    win.loadFile('index.html')
    win.setTouchBar(touchBar)
    //win.webContents.openDevTools()
    return win
}

app.whenReady().then(() => {
    app.allowRendererProcessReuse = false
    win = createWindow()
    win.on('blur', () => {
        // 取消键盘注册
        globalShortcut.unregister('ctrl+j')
        globalShortcut.unregister('ctrl+k')
        globalShortcut.unregister('ctrl+h')
        globalShortcut.unregister('ctrl+l')
        globalShortcut.unregister('ctrl+c')
        globalShortcut.unregister('enter')
    });
    win.on('focus', () => {
        // j向下滚动
        globalShortcut.register('ctrl+j', () => {
            win.webContents.send('swaPage', 'down')
        })
        // k向上滚动
        globalShortcut.register('ctrl+k', () => {
            win.webContents.send('swaPage', 'up')
        })
        // h向左滚动
        globalShortcut.register('ctrl+h', () => {
            win.webContents.send('swaPage', 'left')
        })
        // l向右滚动
        globalShortcut.register('ctrl+l', () => {
            win.webContents.send('swaPage', 'right')
        })
        globalShortcut.register('ctrl+c', () => {
            win.webContents.send('swaPage', 'copy')
        })
        globalShortcut.register('enter', () => {
            win.webContents.send('swaPage', 'search')
        })
    });
})

app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) win = createWindow()
})

app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) win = createWindow()
})
