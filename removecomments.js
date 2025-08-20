const fs = require('fs');
const path = require('path');

function findFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (item !== 'node_modules' && item !== '.git') {
                files = files.concat(findFiles(fullPath));
            }
        } else {
            const ext = path.extname(item).toLowerCase();
            if (ext === '.js' || ext === '.css') {
                files.push(fullPath);
            }
        }
    }
    return files;
}

function removeJSComments(code) {
    return code
        
        .replace(/(^|[^:])\/\/(?!\/).*$/gm, '$1')
        
        .replace(/\/\*[\s\S]*?\*\
        
        .replace(/\n\s*\n\s*\n/g, '\n\n')
        .trim();
}

function removeCSSComments(code) {
    return code
        .replace(/\/\*[\s\S]*?\*\
        .replace(/\n\s*\n\s*\n/g, '\n\n')
        .trim();
}

console.log('🔍 Finding JavaScript and CSS files...');
const files = findFiles(process.cwd());

files.forEach(file => console.log(`  - ${path.relative(process.cwd(), file)}`));

if (files.length === 0) {
    console.log('No files found to process.');
    process.exit(0);
}

console.log('\n🚀 Removing comments...\n');

let processed = 0;
let errors = 0;

for (const file of files) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const ext = path.extname(file).toLowerCase();

        let processedContent;
        if (ext === '.js') {
            processedContent = removeJSComments(content);
        } else if (ext === '.css') {
            processedContent = removeCSSComments(content);
        }

        fs.writeFileSync(file, processedContent, 'utf8');
        console.log(`✅ ${path.relative(process.cwd(), file)}`);
        processed++;

    } catch (error) {
        console.error(`❌ Error processing ${file}: ${error.message}`);
        errors++;
    }
}

console.log(`\n📊 Completed: ${processed} files processed, ${errors} errors`);