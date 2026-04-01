const FS_SYMBOL = '⛶';
const EXIT_FS_SYMBOL = '⮏';

function toggleFullScreen() {
    const docElm = document.documentElement;
    const body = document.body;

    // 检查是否支持标准全屏 API
    const canNativeFS = !!(docElm.requestFullscreen || docElm.webkitRequestFullscreen || docElm.msRequestFullscreen);
    
    // 如果支持原生全屏 (如 iPadOS 13+, PC, Android)
    if (canNativeFS) {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.webkitRequestFullscreen) {
                docElm.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    } else {
        // iOS iPhone 方案：切换 CSS 伪全屏
        body.classList.toggle('pseudo-fullscreen-active');
        const btn = document.querySelector('#fullscreen_button');
        if (body.classList.contains('pseudo-fullscreen-active')) {
            btn.innerHTML = EXIT_FS_SYMBOL;
            btn.classList.add('is-fullscreen');
        } else {
            btn.innerHTML = FS_SYMBOL;
            btn.classList.remove('is-fullscreen');
        }
    }
}

// 监听原生全屏状态改变（适用于 iPad/PC）
document.addEventListener('fullscreenchange', handleFSChange);
document.addEventListener('webkitfullscreenchange', handleFSChange);

function handleFSChange() {
    const btn = document.querySelector('#fullscreen_button');
    if (!btn) return;
    const isFS = document.fullscreenElement || document.webkitFullscreenElement;
    
    if (isFS) {
        btn.innerHTML = EXIT_FS_SYMBOL;
        btn.classList.add('is-fullscreen');
    } else {
        btn.innerHTML = FS_SYMBOL;
        btn.classList.remove('is-fullscreen');
    }
}

// 自动隐藏逻辑（保持不变）
let fsTimeout;
document.addEventListener('mousemove', () => {
    const isNativeFS = document.fullscreenElement || document.webkitFullscreenElement;
    const isPseudoFS = document.body.classList.contains('pseudo-fullscreen-active');
    
    if (!isNativeFS && !isPseudoFS) return;
    
    const btn = document.querySelector('#fullscreen_button');
    if (!btn) return;

    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';

    clearTimeout(fsTimeout);
    fsTimeout = setTimeout(() => {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
    }, 2500);
});
