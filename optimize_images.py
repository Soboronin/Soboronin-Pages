#!/usr/bin/env python3
"""
サイト用の画像を軽くするスクリプト(Pillow だけで動きます)

  使い方(ターミナルで):
    pip install pillow                       # 初回だけ
    python optimize_images.py works    img/works     # 作品(ポートフォリオ)
    python optimize_images.py portrait img/oc        # 立ち絵・SD・アイコン(サブフォルダも全部)

  元の画像は書き換えません。結果は、入力フォルダの中の「optimized」フォルダに出力されます
  (元と同じフォルダ構成・同じファイル名)。中身を確認してから、元の画像に上書きコピーしてください。

  works    ... 作品用。次の2種類を作ります。
                ・thumb/名前.webp : 一覧に出す縮小版(400px四方に中央で切り抜き)
                ・名前.png        : 拡大表示用に軽くした元画像(長辺1600px以内・256色PNG)
               GIF は対象外です(そのまま使ってください)。
  portrait ... 立ち絵・SD・アイコン用。長辺を --max px 以内に縮小して、256色PNG(透過つき)にします。
                目安: 立ち絵 760(初期値) / SDイラスト 240 / アイコン 192

  オプション:
    --max N     長辺の上限(px)。works は 1600、portrait は 760 が初期値
    --thumb N   thumb の一辺(px)。初期値 400

  256色PNGは、ベタ塗り中心のイラストならほとんど見た目が変わりませんが、
  淡いグラデーションの多い絵は念のため目で確認してください。
"""
import argparse
import sys
from pathlib import Path

from PIL import Image

EXT = {'.png', '.jpg', '.jpeg'}


def has_real_alpha(im):
    if im.mode != 'RGBA':
        return False
    return im.getchannel('A').getextrema()[0] < 255


def shrink(im, long_side):
    w, h = im.size
    scale = min(1.0, long_side / max(w, h))  # 拡大はしない
    if scale >= 1.0:
        return im
    return im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)


def save_png256(im, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    if has_real_alpha(im):
        q = im.quantize(256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)  # 透過を保つ
    else:
        q = im.convert('RGB').quantize(256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    q.save(path, 'PNG', optimize=True)


def save_thumb(im, path, side):
    path.parent.mkdir(parents=True, exist_ok=True)
    rgb = im.convert('RGB')
    w, h = rgb.size
    s = min(w, h)  # 一覧の表示(object-fit: cover)と同じく、中央を正方形に切り抜く
    sq = rgb.crop(((w - s) // 2, (h - s) // 2, (w + s) // 2, (h + s) // 2)).resize((side, side), Image.LANCZOS)
    sq.save(path, 'WEBP', quality=80, method=6)


def main():
    ap = argparse.ArgumentParser(description='サイト用の画像を軽くします')
    ap.add_argument('mode', choices=['works', 'portrait'])
    ap.add_argument('folder')
    ap.add_argument('--max', type=int, default=None)
    ap.add_argument('--thumb', type=int, default=400)
    a = ap.parse_args()

    src = Path(a.folder)
    if not src.is_dir():
        sys.exit('フォルダが見つかりません: %s' % src)
    out = src / 'optimized'
    long_side = a.max or (1600 if a.mode == 'works' else 760)

    before = after = count = 0
    for f in sorted(src.rglob('*')):
        rel = f.relative_to(src)
        if not f.is_file() or rel.parts[0] in ('optimized', 'thumb') or f.suffix.lower() not in EXT:
            if f.suffix.lower() == '.gif':
                print('  スキップ(GIF): %s' % rel)
            continue
        im = Image.open(f)
        im.load()
        if im.mode not in ('RGB', 'RGBA'):
            im = im.convert('RGBA' if 'A' in im.getbands() or im.mode == 'P' else 'RGB')
        small = shrink(im, long_side)
        png_path = out / rel.with_suffix('.png')
        save_png256(small, png_path)
        made = [png_path]
        if a.mode == 'works':
            th_path = out / rel.parent / 'thumb' / (rel.stem + '.webp')
            save_thumb(im, th_path, a.thumb)
            made.append(th_path)
        b = f.stat().st_size
        n = sum(p.stat().st_size for p in made)
        before += b
        after += n
        count += 1
        print('  %-40s %7.0f KB -> %6.0f KB  (%s)' % (rel, b / 1024, n / 1024, ' + '.join(p.name for p in made)))

    if not count:
        sys.exit('対象の画像(png/jpg)が見つかりませんでした')
    print('\n%d 枚 / 合計 %.1f MB -> %.1f MB' % (count, before / 1048576, after / 1048576))
    print('出力先: %s (確認してから、元の画像に上書きコピーしてください)' % out)


if __name__ == '__main__':
    main()
