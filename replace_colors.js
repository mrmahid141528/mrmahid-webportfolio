const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
    { regex: /bg-\[#0F172A\]/g, replacement: 'bg-background' },
    { regex: /bg-\[#0a101d\]/g, replacement: 'bg-alt' },
    { regex: /text-white/g, replacement: 'text-foreground' },
    { regex: /border-white\/10/g, replacement: 'border-border' },
    { regex: /bg-white\/5/g, replacement: 'bg-card' },
    { regex: /text-gray-400/g, replacement: 'text-muted' },
    { regex: /bg-\[#151e32\]/g, replacement: 'bg-card' },
];

function processDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            replacements.forEach(({ regex, replacement }) => {
                if (regex.test(content)) {
                    content = content.replace(regex, replacement);
                    modified = true;
                }
            });

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Modified:', fullPath);
            }
        }
    });
}

processDirectory(directoryPath);

