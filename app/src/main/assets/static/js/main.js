console.log('main.js---')

function sayHello() {
    alert('你好，这是本地JS代码！')
}

// 打开知乎
function openZhihu() {
    window.location.href =
        'zhihu://feed'
    showMessage('正在打开知乎...', 'success')
}

function openWechat() {
    try {
        window.location.href = 'weixin://'
        showMessage('正在打开微信...', 'success')
        checkResult()
    } catch (e) {
        showMessage('打开失败: ' + e.message, 'error')
    }
}

function openWechatScan() {
    try {
        window.location.href = 'weixin://dl/scan'
        showMessage('正在打开微信扫一扫...', 'success')
        checkResult()
    } catch (e) {
        showMessage('打开失败: ' + e.message, 'error')
    }
}

function openWechatChat() {
    try {
        // 示例：打开与特定用户的聊天
        window.location.href = 'weixin://dl/chat?wxid=example_user'
        showMessage('正在打开聊天窗口...', 'success')
        checkResult()
    } catch (e) {
        showMessage('打开失败: ' + e.message, 'error')
    }
}

function checkResult() {
    // 延迟检查是否成功打开
    setTimeout(() => {
        if (document.hasFocus()) {
            showMessage('可能未安装微信或打开失败', 'error')
        }
    }, 2000)
}

function showMessage(msg, type) {
    const result = document.getElementById('result')
    result.textContent = msg
    result.className = 'result ' + type
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded-----')
    const getdata = document.querySelector('#getdata')
    getdata.addEventListener('click', (e) => {
        e.preventDefault()
        console.log('getdata')
        fetch('https://api.github.com/users/octocat')
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data)
                const greetMsgEl = document.querySelector('#greet-msg')
                greetMsgEl.textContent = data.login
            })
            .catch((error) => {
                console.error('error', error)
            })
    })
})
