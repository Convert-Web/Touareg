"""Copie les plats détourés dans assets/img/plats/ et branche le site dessus."""
import sys, os, json, shutil, re
from PIL import Image
SRC = '/tmp/claude-0/-home-user-touareg/7e19d6fd-6455-5d13-97c8-598500ed2b09/scratchpad/gen/cut'
D = '/home/user/touareg/'
DST = D + 'assets/img/plats/'
os.makedirs(DST, exist_ok=True)
ids = sorted({f.rsplit('-', 1)[0] for f in os.listdir(SRC) if f.endswith('-420.webp')})
dims = {}
for i in ids:
    for t in (160, 420, 600, 840):
        shutil.copy(f'{SRC}/{i}-{t}.webp', f'{DST}{i}-{t}.webp')
    dims[i] = list(Image.open(f'{DST}{i}-420.webp').size)
print(len(ids), 'plats')

s = open(D + 'js/site.js').read()
# 1) dimensions + liste des plats qui ont leur propre photo
s = re.sub(r"\n  /\* Photos propres à chaque plat.*?\n  const PLATS = .*?;\n", "\n", s, flags=re.S)
anchor = "  function detour(cle,"
bloc = ("  /* Photos propres à chaque plat (assets/img/plats/<id>-420.webp…) : utilisées en priorité */\n"
        f"  const PLATS = {json.dumps(dims, separators=(',', ':'))};\n")
s = s.replace(anchor, bloc + anchor, 1)
# 2) un plat avec sa propre photo l'utilise ; sinon la photo de son rayon
s = s.replace("const detourPlat = p => detourDe(p.photo || catParId[p.cat].photo);",
              "const detourPlat = p => PLATS[p.id] ? 'p:' + p.id : detourDe(p.photo || catParId[p.cat].photo);")
# 3) detour() sait lire assets/img/plats/
old = "    const c = detourDe(cle), base = `assets/img/cut/${c}`;\n    const [w, h] = DIMS[c] || [420, 420];"
new = ("    const c = detourDe(cle);\n"
       "    const plat = c.startsWith('p:') ? c.slice(2) : null;\n"
       "    const base = plat ? `assets/img/plats/${plat}` : `assets/img/cut/${c}`;\n"
       "    const [w, h] = (plat ? PLATS[plat] : DIMS[c]) || [420, 420];")
if old in s: s = s.replace(old, new, 1)
assert "assets/img/plats/${plat}" in s
open(D + 'js/site.js', 'w').write(s)
json.dump(dims, open(SRC + '/../dims-plats.json', 'w'))
print(json.dumps(dims))
