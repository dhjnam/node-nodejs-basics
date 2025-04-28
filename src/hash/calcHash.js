import { createReadStream } from 'node:fs';
import { Transform } from 'node:stream';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const calculateHash = async () => {
    // Write your code here 

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    let hash = createHash('sha256');
    let digest;
    const readStream = createReadStream(`${__dirname}/files/fileToCalculateHashFor.txt`);
    
    readStream.on('error', error => {
        console.log(`Error: ${error}`);
    });
    
    const hashStream = new Transform({
        transform(chunk, encoding, callback) {
            hash.update(chunk);
            callback();
        },
        final(callback) {
            digest = hash.digest('hex');
            callback();
        }
    });
    hashStream.on('data', chunk => {
        hash += chunk;
    });
    hashStream.on('end', () => {
        console.log(digest);
    });
    hashStream.on('error', error => {
        console.log(`HashStream error ${error}`);
    });
    
    readStream.pipe(hashStream);

};

await calculateHash();