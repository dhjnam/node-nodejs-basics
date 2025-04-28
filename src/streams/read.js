import { Readable } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import fs from 'node:fs';

import path from 'node:path';
import { fileURLToPath } from 'node:url';


const read2 = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileToRead = `${__dirname}/files/r.txt`;
    // const fileToRead = `${__dirname}/files/fileToRead.txt`;

    class MyReadStream extends Readable {
        constructor() {
            super();
            this.fd = null;
        }
        _construct(callback) {
            fs.open(fileToRead, 'r', (err, fd) => {
                if (err) return callback(err);
                this.fd = fd;
                callback();
            })
        }
        _read(size) {
            console.log(`\n\nsize = ${size}\n\n`);
            const buf = Buffer.alloc(size);
            // Gives infinite loop:
            fs.read(this.fd, buf, 1, 1000, null, (err, bytesRead, buffer) => {
                if (err) return this.destroy(err);
                this.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null);
                let b = 2;
            });
            let a = 2;
            // fs.read(this.fd, buf, 0, size, null, (err, bytesRead) => {
            //     if (err) return this.destroy(err);
            //     this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
            // });
        }
        _destroy(err, callback) {
            if (this.fd) {
                fs.close(this.fd, (er) => callback(er || err));
            } else {
                callback(err);
            }
        }
    }

    const myReadStream = new MyReadStream(fileToRead);
    // myReadStream.on('data', (d, err) => {
    //     // console.log(d);
    //     console.log(err);
    //     if (err) {
            
    //     }
    // });

    let a;
    myReadStream.push('hallo ihr');
    a = await myReadStream.read(10);
    console.log(`a = ${a}`);
    a = await myReadStream.read(20);
    console.log(`a = ${a}`);

    myReadStream.pipe(process.stdout);
    myReadStream.on('data', async d => {
        console.log(d);
        const f = myReadStream.read(10);
        console.log(f);
    });
    

};

const read = async () => {
    // Write your code here 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const rs = createReadStream(`${__dirname}/files/fileToRead.txt`);

    rs.pipe(process.stdout);

};

await read();