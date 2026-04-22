const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'components', 'templates');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') && !file.includes('TemplateRenderer') && !file.includes('_base') && !file.includes('config.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(templatesDir);

const watermark = `
        {/* ── WATERMARK SAJIJANJI ── */}
        <div className="w-full py-10 text-center flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
          <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Created with love by</p>
          <a href="https://sajijanji.id" target="_blank" rel="noopener noreferrer" className="text-sm font-black">
            SajiJanji
          </a>
        </div>
`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Skip if already has watermark
  if (content.includes('sajijanji.id')) {
    console.log(`Skipped (already has watermark): ${path.basename(file)}`);
    return;
  }
  
  // Remove old Undang Dong watermark if exists
  content = content.replace(/<p[^>]*>\s*Created by Undang Dong\s*<\/p>/ig, '');

  // Regex to find the last closing div before the end of the return statement
  const regex = /<\/div>\s*\);\s*}\s*$/;
  if (regex.test(content)) {
    content = content.replace(regex, `${watermark}      </div>\n  );\n}\n`);
    fs.writeFileSync(file, content);
    console.log(`Updated: ${path.basename(file)}`);
  } else {
    console.log(`Could not find insertion point in: ${path.basename(file)}`);
  }
});
