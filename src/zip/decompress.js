import { createReadStream, createWriteStream } from 'node:fs';
import zlib from 'node:zlib';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const decompress = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileArchive = `${__dirname}/files/archive.gz`;
    const fileDecompressed = `${__dirname}/files/decompressed.txt`;

    // gz is an instance of Transform
    const gunzip = zlib.createGunzip();

    const rs = createReadStream(fileArchive);
    const ws = createWriteStream(fileDecompressed);

    rs.pipe(gunzip).pipe(ws);

};

await decompress();
