#!/usr/bin/env python3
"""Strip white background from public/logo.jpg and emit transparent assets."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "logo.jpg"
THRESHOLD = 238


def remove_white_background(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = pixels[x, y]
            if r >= THRESHOLD and g >= THRESHOLD and b >= THRESHOLD:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                darkness = 255 - max(r, g, b)
                pixels[x, y] = (0, 0, 0, min(255, darkness + 40))
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def make_square_icon(source: Image.Image, size: int, padding_ratio: float = 0.12) -> Image.Image:
    icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pad = int(size * padding_ratio)
    inner = size - pad * 2
    mark = source.copy()
    mark.thumbnail((inner, inner), Image.Resampling.LANCZOS)
    ox = (size - mark.width) // 2
    oy = (size - mark.height) // 2
    icon.paste(mark, (ox, oy), mark)
    return icon


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source image: {SRC}")

    master = remove_white_background(Image.open(SRC))
    master.save(ROOT / "public" / "logo.png", optimize=True)

    outputs = [
        (ROOT / "app" / "icon.png", 32),
        (ROOT / "app" / "apple-icon.png", 180),
        (ROOT / "public" / "apple-icon.png", 180),
        (ROOT / "public" / "icon-192.png", 192),
        (ROOT / "public" / "icon-512.png", 512),
    ]
    for path, size in outputs:
        path.parent.mkdir(parents=True, exist_ok=True)
        make_square_icon(master, size).save(path, optimize=True)

    print(f"Processed {SRC.name} -> logo.png + {len(outputs)} icons")


if __name__ == "__main__":
    main()
