import { createWriteStream } from 'node:fs';
import fs from 'node:fs';
import { Writable } from 'node:stream';

import path from 'node:path';
import { fileURLToPath } from 'node:url';


const write2 = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileToWrite = `${__dirname}/files/fileToWrite.txt`;
    
    class MyWritable extends Writable {
        constructor() {
            super();
            fs.open(fileToWrite, 'w', (err, fd) => {
                this.fd = fd;
            });
        }
        _write(chunk, endoding, callback) {
            const reversed = chunk.reverse().toString();
            const buf = Buffer.alloc(reversed.length);
            buf.write(reversed);
            fs.write(this.fd, buf, 0, reversed.length, null, err => {
            });
            callback();
        }
        _final(callback) {
            fs.close(this.fd, er => {
            });
            callback();
        }
    }

    const ws = new MyWritable();

    process.stdin.pipe(ws);
};

const write = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileToWrite = `${__dirname}/files/fileToWrite.txt`;
    
    const ws = createWriteStream(fileToWrite);

    ws.on('data', (d) => {
        console.log(d);
    });

    process.stdin.pipe(ws);
};

// await write2();
await write();
