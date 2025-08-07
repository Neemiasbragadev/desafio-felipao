import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const WEB_DIR = path.join(__dirname, 'web');

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'text/plain';
}

function serveFile(res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><title>404 - Não Encontrado</title></head>
                    <body>
                        <h1>404 - Arquivo não encontrado</h1>
                        <p>O arquivo solicitado não foi encontrado no servidor.</p>
                        <a href="/">Voltar para o início</a>
                    </body>
                </html>
            `);
            return;
        }

        const mimeType = getMimeType(filePath);
        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    // Adicionar headers CORS para desenvolvimento
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Remover query parameters
    filePath = filePath.split('?')[0];
    
    // Construir caminho completo
    const fullPath = path.join(WEB_DIR, filePath);
    
    // Verificar se o arquivo existe
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            // Se não existe, verificar se é uma rota SPA
            if (!path.extname(filePath)) {
                // Servir index.html para rotas SPA
                serveFile(res, path.join(WEB_DIR, 'index.html'));
            } else {
                // Arquivo não encontrado
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head>
                            <title>404 - Não Encontrado</title>
                            <style>
                                body { font-family: Arial, sans-serif; text-align: center; padding: 2rem; }
                                h1 { color: #ef4444; }
                                a { color: #6366f1; text-decoration: none; }
                                a:hover { text-decoration: underline; }
                            </style>
                        </head>
                        <body>
                            <h1>404 - Arquivo não encontrado</h1>
                            <p>O arquivo <code>${filePath}</code> não foi encontrado no servidor.</p>
                            <a href="/">🏠 Voltar para o Desafio Felipão</a>
                        </body>
                    </html>
                `);
            }
            return;
        }

        // Verificar se é um diretório
        fs.stat(fullPath, (err, stats) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro interno do servidor');
                return;
            }

            if (stats.isDirectory()) {
                // Tentar servir index.html do diretório
                const indexPath = path.join(fullPath, 'index.html');
                fs.access(indexPath, fs.constants.F_OK, (err) => {
                    if (err) {
                        // Listar conteúdo do diretório
                        fs.readdir(fullPath, (err, files) => {
                            if (err) {
                                res.writeHead(500, { 'Content-Type': 'text/plain' });
                                res.end('Erro ao ler diretório');
                                return;
                            }

                            const fileList = files.map(file => 
                                `<li><a href="${path.join(filePath, file)}">${file}</a></li>`
                            ).join('');

                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(`
                                <html>
                                    <head>
                                        <title>Índice de ${filePath}</title>
                                        <style>
                                            body { font-family: Arial, sans-serif; padding: 2rem; }
                                            ul { list-style-type: none; }
                                            li { margin: 0.5rem 0; }
                                            a { color: #6366f1; text-decoration: none; }
                                            a:hover { text-decoration: underline; }
                                        </style>
                                    </head>
                                    <body>
                                        <h1>📁 Índice de ${filePath}</h1>
                                        <ul>${fileList}</ul>
                                        <hr>
                                        <a href="/">🏠 Voltar para o Desafio Felipão</a>
                                    </body>
                                </html>
                            `);
                        });
                    } else {
                        serveFile(res, indexPath);
                    }
                });
            } else {
                // Servir arquivo
                serveFile(res, fullPath);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log('🌐 Servidor Web do Desafio Felipão iniciado!');
    console.log('=' .repeat(50));
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`📁 Servindo arquivos de: ${WEB_DIR}`);
    console.log('=' .repeat(50));
    console.log('💡 Dicas:');
    console.log('   • Acesse http://localhost:3000 para ver a interface web');
    console.log('   • Use Ctrl+C para parar o servidor');
    console.log('   • As interações via linha de comando continuam funcionando!');
    console.log('=' .repeat(50));
});
