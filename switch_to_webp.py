#!/usr/bin/env python3
"""
画像のパスを、.png/.jpg から .webp に書き換えるスクリプト(標準ライブラリだけで動きます)

  optimize_images.py --webp で作った .webp を、サイトのフォルダに置いたあとに実行します。
  ファイルの中の  img/....png  を、同じ場所に .webp が実在するものだけ  img/....webp  に書き換えます。
  .webp がまだ無い画像は、そのまま(.png のまま)なので、少しずつ変換して進められます。

  使い方:
    python switch_to_webp.py . oc-data.js portfolio.html         # サイトのフォルダ(.)の中のこの2ファイルを書き換える
    python switch_to_webp.py . oc-data.js --dry                  # 書き換えずに、結果だけを表示する

  1つ目の引数は、サイトのフォルダ(index.html があるフォルダ)です。
  oc.html も対象にできます(煙の演出の画像 img/oc/effects/smoke_*.png が、CSSに書いてあります)。
  ただし、ファビコン(rel="icon" / apple-touch-icon)と、rel="preload" の行は、PNGのままにしたいので、書き換えません。

  書き換える前に、Git などで元に戻せる状態にしておくと安心です。
"""
import re
import sys
from pathlib import Path

PAT = re.compile(r'img/[A-Za-z0-9_./-]+?\.(?:png|jpe?g)')


def main():
    args = [a for a in sys.argv[1:] if a != '--dry']
    dry = '--dry' in sys.argv
    if len(args) < 2:
        sys.exit(__doc__)
    root = Path(args[0])
    for name in args[1:]:
        f = root / name
        if not f.is_file():
            print('見つかりません: %s' % f)
            continue
        text = f.read_text(encoding='utf-8')
        changed, missing = [], []

        def repl(m):
            p = m.group(0)
            web = re.sub(r'\.(?:png|jpe?g)$', '.webp', p)
            if (root / web).is_file():
                changed.append(p)
                return web
            missing.append(p)
            return p

        SKIP = ('rel="icon"', 'apple-touch-icon', 'rel="preload"', 'type="image/png"')
        new = '\n'.join(line if any(k in line for k in SKIP) else PAT.sub(repl, line) for line in text.split('\n'))
        print('%s: %d 個を .webp に書き換え / %d 個は .webp がまだ無いので、そのまま' % (name, len(changed), len(set(missing))))
        for p in sorted(set(missing)):
            print('    (.webp なし) %s' % p)
        if not dry and new != text:
            f.write_text(new, encoding='utf-8', newline='')
    if dry:
        print('\n(--dry のため、ファイルは書き換えていません)')


if __name__ == '__main__':
    main()
