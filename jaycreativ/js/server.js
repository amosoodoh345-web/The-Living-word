const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const root = path.resolve(process.cwd(), 'dist');

const contentTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

const server = http.createServer((request, response) => {
    const requestPath = decodeURIComponent((request.url || '/').split('?')[0]);
    const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^[/\\]+/, '');
    const filePath = path.resolve(root, relativePath);

    if (!filePath.startsWith(`${root}${path.sep}`) && filePath !== root) {
        response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            response.writeHead(error.code === 'ENOENT' ? 404 : 500, {
                'Content-Type': 'text/plain; charset=utf-8'
            });
            response.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
            return;
        }

        const type = contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
        response.writeHead(200, { 'Content-Type': type });
        response.end(data);
    });
});

server.listen(port, () => {
    console.log(`Backend is running at http://localhost:${port}`);
});
