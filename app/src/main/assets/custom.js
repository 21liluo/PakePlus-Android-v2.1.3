window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

use tauri::api::permission::{check, request};
use tauri::command;

#[command]
async fn request_camera_permission() -> Result<bool, String> {
    // 检查摄像头权限是否已授予
    let camera_perm = check("device:allow-camera").await.map_err(|e| e.to_string())?;
    
    if camera_perm {
        Ok(true)
    } else {
        // 请求摄像头权限
        let result = request("device:allow-camera").await.map_err(|e| e.to_string())?;
        Ok(result)
    }
}

#[command]
async fn request_storage_permission() -> Result<bool, String> {
    // 检查文件系统权限
    let storage_perm = check("fs:scope").await.map_err(|e| e.to_string())?;
    
    if storage_perm {
        Ok(true)
    } else {
        // 请求文件系统权限
        let result = request("fs:scope").await.map_err(|e| e.to_string())?;
        Ok(result)
    }
}

// 在 setup 函数中注册命令
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            request_camera_permission,
            request_storage_permission
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}