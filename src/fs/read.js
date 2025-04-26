import { promises as fs, createReadStream } from 'node:fs';
import { dirname, basename, resolve } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToRead = `${__dirname}/../../src/fs/files/fileToRead.txt`;
const tmpFileToRead = `${__dirname}/../../src/fs/tmpFileToRead.txt`;


/**
 * read.js
 * implement function that prints content of the `fileToRead.txt` into console 
 * if there's no file fileToRead.txt Error with message FS operation failed must be thrown
 */

const read = async () => {
    // Write your code here 
    const error = new Error('FS operation failed');
    // Throw error if `fileToRead.txt` does not exist
    try {
        await fs.access(fileToRead);
    } catch (err) {
        throw error;
    }

    try {
        const readStream = createReadStream(fileToRead);

        const rl = createInterface({ input: readStream });

        for await (const line of rl) {
            console.log(line);
        }
    } catch (err) {
        let a = 1;
    }
};

if (process.env.DHJN_ENV === 'test') {
    console.log('\n===== This is a personal test environment -- not RS school =====\n');
} else {
    await read();
}

export { read };

