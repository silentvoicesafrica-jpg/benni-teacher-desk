import os, time
from playwright.sync_api import sync_playwright
here = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(here, "rec")
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium", args=["--no-sandbox"])
    ctx = b.new_context(viewport={"width": 1280, "height": 720}, record_video_dir=out, record_video_size={"width": 1280, "height": 720})
    page = ctx.new_page()
    page.goto("file://" + os.path.join(here, "parts.html"))
    page.wait_for_selector("body[data-done='1']", timeout=120000)
    page.wait_for_timeout(1500)
    path = page.video.path()
    ctx.close(); b.close()
    print("video:", path)
