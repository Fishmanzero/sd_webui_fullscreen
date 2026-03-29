const FS_SYMBOL = '⛶';
const EXIT_FS_SYMBOL = '⮏';

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        const docElm = document.documentElement;
        // 兼容处理
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.webkitRequestFullscreen) {
            docElm.webkitRequestFullscreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// 统一管理图标和状态同步
document.addEventListener('fullscreenchange', () => {
    const btn = document.querySelector('#fullscreen_button');
    if (!btn) return;
    
    if (document.fullscreenElement) {
        btn.innerHTML = EXIT_FS_SYMBOL;
        btn.classList.add('is-fullscreen');
    } else {
        btn.innerHTML = FS_SYMBOL;
        btn.classList.remove('is-fullscreen');
    }
});

// 优化全屏下的按钮自动隐藏逻辑
let fsTimeout;
document.addEventListener('mousemove', () => {
    if (!document.fullscreenElement) return;
    
    const btn = document.querySelector('#fullscreen_button');
    if (!btn) return;

    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';

    clearTimeout(fsTimeout);
    fsTimeout = setTimeout(() => {
        if (document.fullscreenElement) {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
        }
    }, 2500); // 2.5秒无移动则隐藏
});
