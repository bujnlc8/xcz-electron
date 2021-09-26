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


const famous_verses = ['莫问星星鬓染霜，一杯同看月昏黄。',
    '羡青山有思，白鹤忘机。',
    '浮生岂得长年少，莫惜醉来开口笑。',
    '可怜明月与春风，岁岁年年事不同。',
    '人生以如此，何必归故家？',
    '莫恨乡程千里远，眼中从此故乡春。',
    '此生得作太平人，只向尘中便出尘。',
    '浮云一别后，流水十年间。',
    '琴诗酒伴皆抛我，雪月花时最忆君。',
    '安能追逐人间事，万里身同不系舟。',
    '月明光光星欲堕，欲来不来早语我。',
    '人怜花似旧，花不知人瘦。',
    '今年花落明年好，但见花开人自老。',
    '系我一生心，负你千行泪。',
    '芒鞋破钵无人识，踏过樱花第几桥？',
    '不然秋月春风夜，争那闲思往事何。',
    '沧海客归珠有泪，章台人去骨遗香。',
    '觉后不知明月上，满身花影倩人扶。',
    '更被夕阳江岸上，断肠烟柳一丝丝。',
    '纵使晴明无雨色，入云深处亦沾衣。',
    '多少天涯未归客，尽借篱落看秋风。',
    '羽衣常带烟霞色，不惹人间桃李花。',
    '相到薰风四五月，也能遮却美人腰。',
    '二十四桥明月夜，玉人何处教吹箫？',
    '日长睡起无情思，闲看儿童捉柳花。',
    '多谢月相怜，今宵不忍圆。',
    '醉后不知天在水，满船清梦压星河。',
    '满堂花醉三千客，一剑霜寒十四州。',
    '爱他明月好，憔悴也相关。西风多少恨，吹不散眉弯。',
    '我见青山多妩媚，料青山见我应如是。',
    '江南无所有，聊赠一枝春。',
    '应是天仙狂醉，乱把白云揉碎。',
    '人间自是有情痴，此恨不关风与月。',
    '休对故人思故国，且将新火试新茶。诗酒趁年华。',
    '愿我如星君如月，夜夜流光相皎洁。',
    '最是人间留不住，朱颜辞镜花辞树。',
    '从此无心爱良夜，任他明月下西楼。',
    '万一禅关砉然破，美人如玉剑如虹。',
    '吹灭读书灯，一身都是月。',
    '世事一场大梦，人生几度秋凉？',
    '回头万里，故人长绝，满座衣冠胜雪。',
    '世界微尘里，吾宁爱与憎。',
    '我醉欲眠卿且去，明朝有意抱琴来。',
    '不如意事常八九，可与语人无二三。',
    '别后相思空一水，重来回首已三生。',
    '人生自是有情痴，此恨不关风和月。',
    '春心莫共花争发，一寸相思一寸灰。',
    '今朝有酒今朝醉，明日愁来明日愁',
    '山僧不解数甲子，一叶落知天下秋。',
    '春宵一刻值千金，花有清香月有阴。',
    '福王少小风流惯，不爱江山爱美人。',
    '有缘千里来相会，三笑徒然当一痴。',
    '位卑未敢忘忧国，事定犹须待阖棺。',
    '垂死病中惊坐起，暗风吹雨入寒窗。',
    '读书不觉已春深，一寸光阴一寸金。',
    '鬼门关外莫言远，四海一家皆兄弟。',
    '近水楼台先得月，向阳花木易为春。',
    '衰兰送客咸阳道，天若有情天亦老。',
]

const closeApp = new TouchBarButton({
    label: '关闭',
    click: () => {
        app.quit()
    }
})

const speak = new TouchBarButton({
    label: '朗读',
    click: () => {
        if (speak.label == '朗读') {
            win.webContents.send('commander', 'startSpeak')
            speak.label = '停止'
        } else {
            win.webContents.send('commander', 'stopSpeak')
            speak.label = '朗读'
        }
    }
})

const touchBar = new TouchBar({
    items: [
        closeApp, new TouchBarSpacer(),
        speak,
    ]
})

ipcMain.on('copysuccess', (event, title, author, content) => {
    new Notification({
        title: title,
        subtitle: author,
        body: content,
        silent: true,
        timeoutType: 'nerver',
    }).show()
})

ipcMain.on('copyfailed', (event, arg) => {
    new Notification({
        title: '复制失败 :(',
        body: arg
    }).show()
})

ipcMain.on('speakStart', (event, args) => {
    speak.label = '停止'
})

ipcMain.on('speakStop', (event, args) => {
    speak.label = '朗读'
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

function initWin(win) {
    win.setTitle(famous_verses[parseInt(Math.random() * famous_verses.length)])
    win.on('blur', () => {
        // 取消键盘注册
        globalShortcut.unregisterAll()
    });
    win.on('focus', () => {
        globalShortcut.register('ctrl+j', () => {
            win.webContents.send('commander', 'down')
        })
        globalShortcut.register('ctrl+k', () => {
            win.webContents.send('commander', 'up')
        })
        globalShortcut.register('ctrl+h', () => {
            win.webContents.send('commander', 'left')
        })
        globalShortcut.register('ctrl+l', () => {
            win.webContents.send('commander', 'right')
        })
        globalShortcut.register('ctrl+c', () => {
            win.webContents.send('commander', 'copy')
        })
        globalShortcut.register('ctrl+s', () => {
            if (speak.label === '朗读') {
                win.webContents.send('commander', 'startSpeak')
                speak.label = '停止'
            } else {
                win.webContents.send('commander', 'stopSpeak')
                speak.label = '朗读'
            }
        })
        globalShortcut.register('enter', () => {
            win.webContents.send('commander', 'search')
        })
        globalShortcut.register('ctrl+r', () => {
            win.setTitle(famous_verses[parseInt(Math.random() * famous_verses.length)])
        })
    });
}

app.whenReady().then(() => {
    app.allowRendererProcessReuse = false
    win = createWindow()
    initWin(win)
})

app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) win = createWindow()
    initWin(win)
})

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll();
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
