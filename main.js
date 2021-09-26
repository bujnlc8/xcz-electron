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

const speak = new TouchBarButton({
    label: '朗读🙉',
    click: () => {
        if (speak.label === '朗读🙉') {
            win.webContents.send('commander', 'startSpeak')
            speak.label = '停止🙊'
        } else {
            win.webContents.send('commander', 'stopSpeak')
            speak.label = '朗读🙉'
        }
    }
})

const touchBar = new TouchBar({
    items: [
        closeApp, new TouchBarSpacer(),
        speak,
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

ipcMain.on('speakStart', (event, args) => {
    speak.label = '停止🙊'
})

ipcMain.on('speakStop', (event, args) => {
    speak.label = '朗读🙉'
})

function createWindow() {
    const win = new BrowserWindow({
        width: 1080,
        height: 768,
        resizable: false,
        webPreferences: {
            devTools: false,
            webviewTag: true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            scrollBounce: true,
            defaultFontFamily: 'monospace',
        },
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
            win.webContents.send('commander', 'down')
        })
        // k向上滚动
        globalShortcut.register('ctrl+k', () => {
            win.webContents.send('commander', 'up')
        })
        // h向左滚动
        globalShortcut.register('ctrl+h', () => {
            win.webContents.send('commander', 'left')
        })
        // l向右滚动
        globalShortcut.register('ctrl+l', () => {
            win.webContents.send('commander', 'right')
        })
        globalShortcut.register('ctrl+c', () => {
            win.webContents.send('commander', 'copy')
        })
        globalShortcut.register('enter', () => {
            win.webContents.send('commander', 'search')
        })
    });
})

app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) win = createWindow()
})

app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) win = createWindow()
})
