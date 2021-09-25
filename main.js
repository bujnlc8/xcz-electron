const {
    app,
    BrowserWindow,
    TouchBar,
    ipcMain,
    session,
    globalShortcut,
    shell
} = require('electron')

const {
    TouchBarButton,
    TouchBarSpacer
} = TouchBar

var win = null


// 判断登录
// navBar_link_Login
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
