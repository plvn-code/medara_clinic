"""Encode the licensed Pexels clips (research/video-raw, URLs in docs/STATUS.md) for the web. Usage: build_video.py <project root>"""
import os, subprocess, sys
import imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe()
root = sys.argv[1]
raw = os.path.join(root, 'research/video-raw')
out = os.path.join(root, 'public/video'); os.makedirs(out, exist_ok=True)
img = os.path.join(root, 'public/img'); os.makedirs(img, exist_ok=True)
WARM = 'eq=contrast=1.04:saturation=0.82:brightness=0.01,colorbalance=rm=0.04:gm=0.01:bm=-0.04:rh=0.03:bh=-0.03'
def run(*a):
    r = subprocess.run([FF, '-y', '-loglevel', 'error', *a], capture_output=True, text=True)
    if r.returncode: print(r.stderr[-800:]); raise SystemExit(1)
enc = ['-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-movflags', '+faststart', '-profile:v', 'high']
def clip(src, name, w, h, seconds, start, crf, rate, pre='', grade=WARM, loop='boomerang'):
    chain = (pre + ',' if pre else '') + f'scale={w}:{h}:force_original_aspect_ratio=increase:flags=lanczos,crop={w}:{h},{grade}'
    base = f"[0:v]trim={start}:{start + seconds},setpts=PTS-STARTPTS,fps=30,{chain}"
    fc = base + (",split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]" if loop == 'boomerang' else "[v]")
    run('-i', src, '-filter_complex', fc, '-map', '[v]', *enc, '-crf', str(crf), '-maxrate', rate, '-bufsize', rate.replace('M', '') + 'M', os.path.join(out, name + '.mp4'))
    run('-ss', str(start + 0.5), '-i', src, '-frames:v', '1', '-vf', chain, '-q:v', '80', os.path.join(img, name + '-poster.webp'))
src = lambda i: os.path.join(raw, f'{i}.mp4')
# Dropper sits in the top-left corner: crop that area and mirror it so the drop is on the right, text space on the left.
clip(src(13662047), 'hero', 1920, 1080, 10, 0.5, 22, '5M', pre='crop=iw*0.62:ih*0.62:0:0,hflip')
clip(src(13662047), 'hero-mobile', 720, 1280, 10, 0.5, 25, '2.5M', pre='crop=ih*0.62*9/16:ih*0.62:iw*0.02:0,hflip')
clip(src(7423549), 'diagnostics', 1600, 900, 9, 3, 25, '3M')
clip(src(4824010), 'consult', 1600, 900, 9, 1, 25, '3M')
for f in sorted(os.listdir(out)):
    print(f, round(os.path.getsize(os.path.join(out, f)) / 1048576, 2), 'MB')
