/**
 * compress.js 
 * implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API
 */

import { createReadStream, createWriteStream } from 'node:fs';
import zlib from 'node:zlib';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const compress = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileToCompress = `${__dirname}/files/fileToCompress.txt`;
    const fileArchive = `${__dirname}/files/archive.gz`;

    // gz is an instance of Transform
    const gz = zlib.createGzip();

    const rs = createReadStream(fileToCompress);
    const ws = createWriteStream(fileArchive);


    rs.pipe(gz).pipe(ws);

};

await compress();