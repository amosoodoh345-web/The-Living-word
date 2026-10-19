const fs = require('fs').promises;
const path = require('path');

async function readFileSafe(p) {
    try {
        return await fs.readFile(p, 'utf8');
    } catch (err) {
        return null;
    }
}

async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else if (entry.isFile()) {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

async function build() {
    const root = process.cwd();
    const dist = path.join(root, 'dist');

    // create dist folder
    await fs.mkdir(dist, { recursive: true });

    // read components
    const header = await readFileSafe(path.join(root, 'components', 'header.html')) || '';
    const footer = await readFileSafe(path.join(root, 'components', 'footer.html')) || '';

    // find top-level .html files (skip components folder and dist)
    const files = await fs.readdir(root, { withFileTypes: true });
    for (const file of files) {
        if (!file.isFile()) continue;
        if (!file.name.toLowerCase().endsWith('.html')) continue;
        const srcPath = path.join(root, file.name);
        const dstPath = path.join(dist, file.name);
        let content = await readFileSafe(srcPath);
        if (content === null) continue;

        // replace placeholders
        content = content.replace('<div id="header-placeholder"></div>', header);
        content = content.replace('<div id="footer-placeholder"></div>', footer);

        await fs.writeFile(dstPath, content, 'utf8');
        console.log('Wrote', dstPath);
    }

    // copy assets folders if they exist
    const foldersToCopy = ['css', 'js', 'assets', 'components'];
    for (const folder of foldersToCopy) {
        const src = path.join(root, folder);
        const dest = path.join(dist, folder);
        try {
            const stat = await fs.stat(src);
            if (stat.isDirectory()) {
                console.log('Copying', folder);
                await copyDir(src, dest);
            }
        } catch (err) {
            // ignore missing folders
        }
    }

    console.log('\nBuild complete. Open dist/ with a local server to preview.');
}

build().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
});
