"""Embed the separate security learning area in the buildless offline app."""
import json
import re
from pathlib import Path
root=Path(__file__).resolve().parent.parent
page=root/'index.html'
text=page.read_text()
data=json.loads((root/'scripts/security-content.json').read_text())
js='// SECURITY_UI_START\nconst SECURITY_MODULES = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n'+(root/'scripts/security-ui.js').read_text()+'\n// SECURITY_UI_END'
css='/* SECURITY_CSS_START */\n'+(root/'scripts/security.css').read_text()+'\n/* SECURITY_CSS_END */'
if '// SECURITY_UI_START' in text:
    text=re.sub(r'// SECURITY_UI_START.*?// SECURITY_UI_END',lambda _:js,text,flags=re.S)
else:
    text=text.replace('readRoute();render();setupPwa();',js+'\nreadRoute();render();setupPwa();')
if '/* SECURITY_CSS_START */' in text:
    text=re.sub(r'/\* SECURITY_CSS_START \*/.*?/\* SECURITY_CSS_END \*/',lambda _:css,text,flags=re.S)
else:
    text=text.replace('</style></head>',css+'\n</style></head>')
page.write_text(text)
print(f'Embedded {len(data)} security learning units.')
