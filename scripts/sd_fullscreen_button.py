import gradio as gr
from modules import scripts, script_callbacks
from modules.ui_components import ToolButton

class FullscreenScript(scripts.Script):
    def title(self):
        return "Fullscreen Button"

    def show(self, is_img2img):
        return scripts.AlwaysVisible

def on_after_component(component, **kwargs):
    # 将按钮注入到顶部快速设置栏 (quicksettings)
    if kwargs.get("elem_id") == "quicksettings":
        with gr.Column(elem_id="fullscreen_button_wrapper", variant="compact"):
            fullscreen_button = ToolButton(
                "⛶", 
                elem_id="fullscreen_button", 
                tooltip="Toggle Fullscreen"
            )
            # 点击时调用 JS 中的 toggleFullScreen 函数
            fullscreen_button.click(fn=None, _js="toggleFullScreen")

script_callbacks.on_after_component(on_after_component)
