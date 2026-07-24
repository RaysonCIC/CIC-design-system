const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walk(full);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.html', '.css', '.js'].includes(ext)) files.push(full);
    }
  }
}
walk(root);

const replacements = [
  ['#AC232C', '#AC232C'],
  ['#AC2328', '#AC2328'],
  ['#E79CA0', '#E79CA0'],
  ['#F7DDE0', '#F7DDE0'],
  ['#AC2328', '#AC2328'],
  ['#F7DDE0', '#F7DDE0'],
  ['#AC2328', '#AC2328'],
  ['#AC2328', '#AC2328'],
  ['#AC2328', '#AC2328'],
  ['#F7DDE0', '#F7DDE0'],
  ['#C07B80', '#C07B80'],
  ['rgba(122,26,31,.1)', 'rgba(122,26,31,.1)'],
  ['rgba(122,26,31,.2)', 'rgba(122,26,31,.2)'],
  ['rgba(122,26,31,.3)', 'rgba(122,26,31,.3)'],
  ['rgba(122,26,31,.4)', 'rgba(122,26,31,.4)'],
  ['rgba(122,26,31,.5)', 'rgba(122,26,31,.5)'],
  ['rgba(122,26,31,.6)', 'rgba(122,26,31,.6)'],
  ['rgba(122,26,31,.7)', 'rgba(122,26,31,.7)'],
  ['rgba(122,26,31,.8)', 'rgba(122,26,31,.8)'],
  ['rgba(122,26,31,.9)', 'rgba(122,26,31,.9)'],
  ['rgb(122,26,31)', 'rgb(122,26,31)'],
  ['rgba(172,35,40,', 'rgba(172,35,40,'],
];

const sharedFiles = [path.join(root, 'css/main.css'), path.join(root, 'css/core.css'), path.join(root, 'docs/css/docs.css')];
for (const file of sharedFiles) {
  if (!fs.existsSync(file)) continue;
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace('--CIC-brand-dark:#AC232C;--CIC-brand-light:#F7DDE0;--CIC-brand-supplementary:#AC2328;--CIC-brand-accent:#d7153a;--CIC-brand-accent-light:#ffe6ea;', '--CIC-brand-dark:#AC232C;--CIC-brand-light:#F7DDE0;--CIC-brand-supplementary:#AC2328;--CIC-brand-accent:#AC2328;--CIC-brand-accent-light:#F7DDE0;');
  text = text.replace('--CIC-link:#AC232C;--CIC-link-light:#fff;--CIC-visited:#AC2328;--CIC-visited-light:#fff;--CIC-hover:rgba(122,26,31,.1);--CIC-hover-light:hsla(0,0%,100%,.1);--CIC-active:rgba(122,26,31,.2);--CIC-active-light:hsla(0,0%,100%,.2);--CIC-focus:#AC2328;--CIC-focus-light:#F7DDE0;--CIC-disabled:#C07B80;', '--CIC-link:#AC232C;--CIC-link-light:#fff;--CIC-visited:#AC2328;--CIC-visited-light:#fff;--CIC-hover:rgba(122,26,31,.1);--CIC-hover-light:hsla(0,0%,100%,.1);--CIC-active:rgba(122,26,31,.2);--CIC-active-light:hsla(0,0%,100%,.2);--CIC-focus:#AC2328;--CIC-focus-light:#F7DDE0;--CIC-disabled:#C07B80;');
  text = text.replace('--CIC-brand-dark-rgb:0,38,100;--CIC-brand-light-rgb:203,237,253;--CIC-brand-supplementary-rgb:20,108,253;--CIC-brand-accent-rgb:215,21,58;--CIC-brand-accent-light-rgb:255,230,234;', '--CIC-brand-dark-rgb:122,26,31;--CIC-brand-light-rgb:247,221,224;--CIC-brand-supplementary-rgb:172,35,40;--CIC-brand-accent-rgb:172,35,40;--CIC-brand-accent-light-rgb:247,221,224;');
  text = text.replace('--CIC-link-rgb:0,38,100;--CIC-link-light-rgb:255,255,255;--CIC-visited-rgb:84.7726824,26.00794,139.01706;--CIC-visited-light-rgb:255,255,255;--CIC-hover-rgb:0,38,100;--CIC-hover-light-rgb:255,255,255;--CIC-active-rgb:0,38,100;--CIC-active-light-rgb:255,255,255;--CIC-focus-rgb:0,134,179;--CIC-focus-light-rgb:204,231,240;--CIC-disabled-rgb:128,147,178;', '--CIC-link-rgb:122,26,31;--CIC-link-light-rgb:255,255,255;--CIC-visited-rgb:172,35,40;--CIC-visited-light-rgb:255,255,255;--CIC-hover-rgb:122,26,31;--CIC-hover-light-rgb:255,255,255;--CIC-active-rgb:122,26,31;--CIC-active-light-rgb:255,255,255;--CIC-focus-rgb:172,35,40;--CIC-focus-light-rgb:247,221,224;--CIC-disabled-rgb:192,123,128;');
  fs.writeFileSync(file, text, 'utf8');
}

let changed = 0;
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  let newText = text;
  for (const [from, to] of replacements) {
    newText = newText.split(from).join(to);
  }
  if (newText !== text) {
    fs.writeFileSync(file, newText, 'utf8');
    changed += 1;
  }
}
console.log(`Updated ${changed} files`);
