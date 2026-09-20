#!/usr/bin/env python3
"""
サイト用の画像を軽くするスクリプト(Pillow だけで動きます)

  使い方(ターミナルで):
    pip install pillow                       # 初回だけ
    python optimize_images.py works    img/works     # 作品(ポートフォリオ)
    python optimize_images.py portrait img/oc        # 立ち絵・SD・アイコン(サブフォルダも全部)
    python optimize_images.py works img/works/works05.gif --focus 0.68   # 1枚だけ(切り抜き位置つき)

  元の画像は書き換えません。結果は、入力フォルダの中の「optimized」フォルダに出力されます
  (元と同じフォルダ構成・同じファイル名)。中身を確認してから、元の画像に上書きコピーしてください。

  works    ... 作品用。次の2種類を作ります。
                ・thumb/名前.webp : 一覧に出す縮小版(400px四方に中央で切り抜き)
                ・名前.png        : 拡大表示用に軽くした元画像(長辺1600px以内・256色PNG)
               GIF は、動く縮小版(thumb/名前.webp)だけを作ります。
               元のGIFは拡大表示用として、そのまま使ってください。
  portrait ... 立ち絵・SD・アイコン用。長辺を --max px 以内に縮小して、256色PNG(透過つき)にします。
                目安: 立ち絵 760(初期値) / SDイラスト 240 / アイコン 192

  オプション:
    --max N     長辺の上限(px)。works は 1600、portrait は 760 が初期値
    --thumb N   thumb の一辺(px)。初期値 400
    --focus F   thumb を正方形に切り抜くときの中心の位置(0〜1)。初期値 0.5(中央)
                横長の画像なら左右の位置、縦長の画像なら上下の位置です。
                「中央だと余白ばかり写る」ときに、見せたい部分へ寄せられます

  256色PNGは、ベタ塗り中心のイラストならほとんど見た目が変わりませんが、
  淡いグラデーションの多い絵は念のため目で確認してください。
"""
import argparse
import sys
from pathlib import Path

from PIL import Image, ImageSequence

EXT = {'.png', '.jpg', '.jpeg'}
GIF = '.gif'


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


def square_box(w, h, focus):
    """正方形に切り抜く範囲。focus は、はみ出さない範囲での中心の位置(0〜1)"""
    s = min(w, h)
    x0 = round(min(max(focus * w - s / 2, 0), w - s))
    y0 = round(min(max(focus * h - s / 2, 0), h - s))
    return (x0, y0, x0 + s, y0 + s)


def save_thumb(im, path, side, focus=0.5):
    path.parent.mkdir(parents=True, exist_ok=True)
    rgb = im.convert('RGB')
    sq = rgb.crop(square_box(*rgb.size, focus)).resize((side, side), Image.LANCZOS)
    sq.save(path, 'WEBP', quality=80, method=6)


def save_thumb_gif(src, path, side, focus=0.5):
    """GIFから、動く縮小版(アニメーションWebP)を作る"""
    path.parent.mkdir(parents=True, exist_ok=True)
    g = Image.open(src)
    frames, durations = [], []
    for fr in ImageSequence.Iterator(g):
        rgb = fr.convert('RGB')
        frames.append(rgb.crop(square_box(*rgb.size, focus)).resize((side, side), Image.LANCZOS))
        durations.append(fr.info.get('duration') or 100)
    frames[0].save(path, 'WEBP', save_all=True, append_images=frames[1:], duration=durations,
                   loop=g.info.get('loop', 0), quality=75, method=6)


def main():
    ap = argparse.ArgumentParser(description='サイト用の画像を軽くします')
    ap.add_argument('mode', choices=['works', 'portrait'])
    ap.add_argument('folder')
    ap.add_argument('--max', type=int, default=None)
    ap.add_argument('--thumb', type=int, default=400)
    ap.add_argument('--focus', type=float, default=0.5)
    a = ap.parse_args()

    src = Path(a.folder)
    if src.is_file():          # ファイル1枚だけを指定したとき
        files, base = [src], src.parent
    elif src.is_dir():
        files, base = sorted(src.rglob('*')), src
    else:
        sys.exit('見つかりません: %s' % src)
    out = base / 'optimized'
    long_side = a.max or (1600 if a.mode == 'works' else 760)

    before = after = count = 0
    for f in files:
        rel = f.relative_to(base)
        if not f.is_file() or rel.parts[0] in ('optimized', 'thumb'):
            continue
        ext = f.suffix.lower()
        if ext == GIF:
            if a.mode == 'works':
                th_path = out / rel.parent / 'thumb' / (rel.stem + '.webp')
                save_thumb_gif(f, th_path, a.thumb, a.focus)
                b, n = f.stat().st_size, th_path.stat().st_size
                before += b
                after += n
                count += 1
                print('  %-40s %7.0f KB -> %6.0f KB  (%s: 動く縮小版のみ。元のGIFはそのまま使います)' % (rel, b / 1024, n / 1024, th_path.name))
            else:
                print('  スキップ(GIF): %s' % rel)
            continue
        if ext not in EXT:
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
            save_thumb(im, th_path, a.thumb, a.focus)
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
