"""
Generates the default Open Graph image at public/og/coastal-running-og.png.

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
display_small = ImageFont.truetype(static_instance(archivo, 800, "archivo-800.ttf"), 40)
body = ImageFont.truetype(static_instance(inter, 400, "inter-400.ttf"), 26)
label = ImageFont.truetype(static_instance(mono, 500, "mono-500.ttf"), 20)

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

# --- Brand mark ------------------------------------------------------------
logo_path = os.path.join(ROOT, "public/images/brand/pzx-wasters-logo.png")
if os.path.exists(logo_path):
    logo = Image.open(logo_path).convert("RGB").resize((72, 72), Image.LANCZOS)
    img.paste(logo, (72, 64))
    draw.rectangle([72, 64, 144, 136], outline=(43, 48, 56), width=1)

draw.text((164, 74), "COASTAL RUNNING", font=display_small, fill=PAPER)
draw.text((166, 118), "BY PZX WASTERS", font=label, fill=MUTE)

# --- Headline --------------------------------------------------------------
draw.text((72, 300), "Run the edge", font=display, fill=PAPER)
draw.text((72, 396), "of England.", font=display, fill=RED)

draw.text(
    (72, 518),
    "Coastal races, club runs, routes and stories —",
    font=body,
    fill=MUTE,
)
draw.text((72, 552), "from first trail miles to full ultras.", font=body, fill=MUTE)

draw.line([(72, 268), (300, 268)], fill=RED, width=3)

os.makedirs(os.path.join(ROOT, "public/og"), exist_ok=True)
out = os.path.join(ROOT, "public/og/coastal-running-og.png")
img.save(out, "PNG", optimize=True)
print("Wrote", out)
