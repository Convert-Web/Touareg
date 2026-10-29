"""Détoure les photos HD (fond blanc) et produit les WebP du site (côté le plus long : 160/420/600/840)."""
import sys, os, json
from PIL import Image, ImageFilter
from rembg import remove, new_session

src, dst = sys.argv[1], sys.argv[2]
noms = sys.argv[3:]
os.makedirs(dst, exist_ok=True)
session = new_session('isnet-general-use')
dims = {}
for nom in noms:
    im = Image.open(os.path.join(src, nom + '.png')).convert('RGB')
    rgba = remove(im, session=session, post_process_mask=True)
    a = rgba.getchannel('A')
    # bords nets : on retire le halo très transparent
    a = a.point(lambda v: 0 if v < 12 else v)
    rgba.putalpha(a)
    box = a.getbbox()
    rgba = rgba.crop(box)
    w, h = rgba.size
    m = int(max(w, h) * 0.02)
    toile = Image.new('RGBA', (w + 2 * m, h + 2 * m), (0, 0, 0, 0))
    toile.paste(rgba, (m, m))
    toile.save(os.path.join(dst, nom + '.png'))
    for taille in (160, 420, 600, 840):
        k = taille / max(toile.size)
        r = toile.resize((round(toile.width * k), round(toile.height * k)), Image.LANCZOS)
        r.save(os.path.join(dst, f'{nom}-{taille}.webp'), 'WEBP', quality=82, method=6)
        if taille == 420: dims[nom] = list(r.size)
    print(nom, toile.size, dims[nom], flush=True)
print(json.dumps(dims))
