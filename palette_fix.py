from pathlib import Path
import shutil
root = Path('.')
files = []
for pattern in ['components/**/*.html','core/**/*.html','templates/**/*.html','docs/**/*.css','css/*.css','index.html','*.html','*.js']:
    files.extend(root.glob(pattern))
files = [p for p in set(files) if p.is_file()]
replacements = {
    '#002664': '#AC232C',
    '#146cfd': '#AC2328',
    '#8ce0ff': '#E79CA0',
    '#cbedfd': '#F7DDE0',
    '#D7153A': '#AC2328',
    '#FFE6EA': '#F7DDE0',
    '#551A8B': '#AC2328',
    '#551a8b': '#AC2328',
    '#0086b3': '#AC2328',
    '#cce7f0': '#F7DDE0',
    '#8093b2': '#C07B80',
    'rgba(0,38,100,.1)': 'rgba(122,26,31,.1)',
    'rgba(0,38,100,.2)': 'rgba(122,26,31,.2)',
    'rgba(0,38,100,.3)': 'rgba(122,26,31,.3)',
    'rgba(0,38,100,.4)': 'rgba(122,26,31,.4)',
    'rgba(0,38,100,.5)': 'rgba(122,26,31,.5)',
    'rgba(0,38,100,.6)': 'rgba(122,26,31,.6)',
    'rgba(0,38,100,.7)': 'rgba(122,26,31,.7)',
    'rgba(0,38,100,.8)': 'rgba(122,26,31,.8)',
    'rgba(0,38,100,.9)': 'rgba(122,26,31,.9)',
    'rgb(0,38,100)': 'rgb(122,26,31)',
    'rgba(20,108,253,': 'rgba(172,35,40,',
}
for path in [root/'css/main.css', root/'css/core.css', root/'docs/css/docs.css']:
    if path.exists():
        text = path.read_text(encoding='utf-8')
        text = text.replace('--CIC-brand-dark:#002664;--CIC-brand-light:#cbedfd;--CIC-brand-supplementary:#146cfd;--CIC-brand-accent:#d7153a;--CIC-brand-accent-light:#ffe6ea;', '--CIC-brand-dark:#AC232C;--CIC-brand-light:#F7DDE0;--CIC-brand-supplementary:#AC2328;--CIC-brand-accent:#AC2328;--CIC-brand-accent-light:#F7DDE0;')
        text = text.replace('--CIC-link:#002664;--CIC-link-light:#fff;--CIC-visited:#551a8b;--CIC-visited-light:#fff;--CIC-hover:rgba(0,38,100,.1);--CIC-hover-light:hsla(0,0%,100%,.1);--CIC-active:rgba(0,38,100,.2);--CIC-active-light:hsla(0,0%,100%,.2);--CIC-focus:#0086b3;--CIC-focus-light:#cce7f0;--CIC-disabled:#8093b2;', '--CIC-link:#AC232C;--CIC-link-light:#fff;--CIC-visited:#AC2328;--CIC-visited-light:#fff;--CIC-hover:rgba(122,26,31,.1);--CIC-hover-light:hsla(0,0%,100%,.1);--CIC-active:rgba(122,26,31,.2);--CIC-active-light:hsla(0,0%,100%,.2);--CIC-focus:#AC2328;--CIC-focus-light:#F7DDE0;--CIC-disabled:#C07B80;')
        text = text.replace('--CIC-brand-dark-rgb:0,38,100;--CIC-brand-light-rgb:203,237,253;--CIC-brand-supplementary-rgb:20,108,253;--CIC-brand-accent-rgb:215,21,58;--CIC-brand-accent-light-rgb:255,230,234;', '--CIC-brand-dark-rgb:122,26,31;--CIC-brand-light-rgb:247,221,224;--CIC-brand-supplementary-rgb:172,35,40;--CIC-brand-accent-rgb:172,35,40;--CIC-brand-accent-light-rgb:247,221,224;')
        text = text.replace('--CIC-link-rgb:0,38,100;--CIC-link-light-rgb:255,255,255;--CIC-visited-rgb:84.7726824,26.00794,139.01706;--CIC-visited-light-rgb:255,255,255;--CIC-hover-rgb:0,38,100;--CIC-hover-light-rgb:255,255,255;--CIC-active-rgb:0,38,100;--CIC-active-light-rgb:255,255,255;--CIC-focus-rgb:0,134,179;--CIC-focus-light-rgb:204,231,240;--CIC-disabled-rgb:128,147,178;', '--CIC-link-rgb:122,26,31;--CIC-link-light-rgb:255,255,255;--CIC-visited-rgb:172,35,40;--CIC-visited-light-rgb:255,255,255;--CIC-hover-rgb:122,26,31;--CIC-hover-light-rgb:255,255,255;--CIC-active-rgb:122,26,31;--CIC-active-light-rgb:255,255,255;--CIC-focus-rgb:172,35,40;--CIC-focus-light-rgb:247,221,224;--CIC-disabled-rgb:192,123,128;')
        path.write_text(text, encoding='utf-8')
for path in files:
    if path.suffix.lower() not in {'.html', '.css', '.js'}:
        continue
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        continue
    new_text = text
    for old, new in replacements.items():
        new_text = new_text.replace(old, new)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
print('Updated', len(files), 'files')
