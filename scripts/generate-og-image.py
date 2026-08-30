"""
Generates the default Open Graph image at public/og/hit-the-coast-og.png.

PLACEHOLDER ASSET. Replace with a real photograph plus the wordmark when
photography is available; nothing in the app depends on how it was produced.

Requires Pillow and the Archivo / Inter font files. Run from the project root:

    python3 scripts/generate-og-image.py
"""

import math
import os
import random

from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

W, H = 1200, 630
INK = (11, 12, 14)
LAND = (20, 23, 29)
PAPER = (244, 241, 236)
MUTE = (167, 171, 178)
RED = (230, 74, 51)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, ".font-cache")


def static_instance(woff2_path, weight, out_name):
    """Pin a variable font to one weight so Pillow can render it."""
    os.makedirs(CACHE, exist_ok=True)
    out = os.path.join(CACHE, out_name)
    if not os.path.exists(out):
        font = TTFont(woff2_path)
        font.flavor = None
        instancer.instantiateVariableFont(font, {"wght": weight}, inplace=True)
        font.save(out)
    return out


archivo = os.path.join(
    ROOT, "node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2"
)
inter = os.path.join(
    ROOT, "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"
)
mono = os.path.join(
    ROOT,
    "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
)

display = ImageFont.truetype(static_instance(archivo, 800, "archivo-800.ttf"), 92)
wordmark_font = ImageFont.truetype(static_instance(inter, 800, "inter-800.ttf"), 34)
body = ImageFont.truetype(static_instance(inter, 400, "inter-400.ttf"), 26)
label = ImageFont.truetype(static_instance(mono, 500, "mono-500.ttf"), 20)


def draw_tracked_text(draw, xy, text, font, fill, tracking):
    """PIL has no letter-spacing option, so advance manually — matches the
    `tracking-[0.35em]` used for the live wordmark in Wordmark.tsx."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x

img = Image.new("RGB", (W, H), INK)
draw = ImageDraw.Draw(img)

# --- Contour-map backdrop, same visual language as the card artwork ---------
rnd = random.Random(20260319)
phases = [1.1, 2.4, 4.2, 0.7, 2.2, 5.1]
amplitude = 130


def coast_x(y, offset, amp):
    t = y / H
    x = W * 0.72 + offset
    x += math.sin(t * math.pi * 2 * phases[0] + phases[3]) * amp
    x += math.sin(t * math.pi * 2 * phases[1] + phases[4]) * amp * 0.45
    x += math.sin(t * math.pi * 2 * phases[2] + phases[5]) * amp * 0.22
    return x


# Land mass on the right-hand side.
land = [(coast_x(y, 0, amplitude), y) for y in range(-20, H + 21, 8)]
draw.polygon(land + [(W + 40, H + 40), (W + 40, -40)], fill=LAND)

for i in range(1, 13):
    pts = [(coast_x(y, i * 34, amplitude * (1 - i * 0.04)), y) for y in range(-20, H + 21, 8)]
    shade = int(30 + max(0, 70 - i * 6))
    draw.line(pts, fill=(shade, shade + 2, shade + 6), width=2)

shore = [(coast_x(y, 0, amplitude), y) for y in range(-20, H + 21, 8)]
draw.line(shore, fill=(90, 95, 104), width=3)
route = [(coast_x(y, -26, amplitude * 0.96), y) for y in range(-20, H + 21, 8)]
for i in range(0, len(route) - 3, 4):
    draw.line(route[i : i + 3], fill=RED, width=4)

# Soft fade so the type stays readable over the artwork.
fade = Image.new("L", (W, H), 0)
fade_draw = ImageDraw.Draw(fade)
for x in range(W):
    fade_draw.line([(x, 0), (x, H)], fill=int(245 * max(0, 1 - (x / W) ** 0.7)))
img = Image.composite(Image.new("RGB", (W, H), INK), img, fade)
draw = ImageDraw.Draw(img)

# --- Brand mark --------------------------------------------------------------
# Plain line-art mark, no badge/border — matches the lockup in Wordmark.tsx.
# The source PNG is transparent, so paste with its own alpha as the mask
# rather than flattening to RGB first (which would fill the gaps black).
logo_path = os.path.join(ROOT, "public/images/brand/coast-path-mark.png")
mark_top = 68
if os.path.exists(logo_path):
    logo = Image.open(logo_path).convert("RGBA").resize((64, 64), Image.LANCZOS)
    img.paste(logo, (72, mark_top), logo)

draw_tracked_text(
    draw, (152, mark_top + 6), "HIT THE COAST", wordmark_font, PAPER, 12
)
draw.text((154, mark_top + 46), "In association with PZ×RC", font=label, fill=MUTE)

# --- Headline --------------------------------------------------------------
draw.text((72, 268), "Run it.", font=display, fill=PAPER)
draw.text((72, 358), "Track it.", font=display, fill=PAPER)
draw.text((72, 448), "Complete it.", font=display, fill=RED)

draw.text(
    (72, 544),
    "Every mile of England\u2019s coast path you have run,",
    font=body,
    fill=MUTE,
)
draw.text((72, 578), "tracked segment by segment.", font=body, fill=MUTE)

draw.line([(72, 236), (300, 236)], fill=RED, width=3)

os.makedirs(os.path.join(ROOT, "public/og"), exist_ok=True)
out = os.path.join(ROOT, "public/og/hit-the-coast-og.png")
img.save(out, "PNG", optimize=True)
print("Wrote", out)
