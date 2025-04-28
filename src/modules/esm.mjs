import path from 'node:path';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import { readFile } from 'node:fs/promises';
import './files/c.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const random = Math.random();

let unknownObject;

async function aOrB() {
    if (random > 0.5) {
        const data = await readFile(`${__dirname}/files/a.json`);
        return JSON.parse(data);
    } else {
        const data = await readFile(`${__dirname}/files/b.json`);
        return JSON.parse(data);
    }
}
unknownObject = await aOrB();

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};

