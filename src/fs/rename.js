import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const wrongFilename = `${__dirname}/files/wrongFilename.txt`;
const properFilename = `${__dirname}/files/properFilename.md`;

/**
 * rename.js 
 * implement function that renames file `wrongFilename.txt` to properFilename with extension `.md`
 * if 
 * - there's no file `wrongFilename.txt` or
 * - `properFilename.md` already exists 
 * Error with message `FS operation failed` must be thrown)
 */

const rename = async () => {
    // Write your code here 
    const error = new Error('FS operation failed');
    // Throw error if `properFilename` already exists
    try {
        await fs.access(properFilename);
        throw error;
    } catch(err) {
        if (err.syscall !== 'access') {
            throw err;
        }
    }
    // Throw error if `wrongFilename` does not exist
    try {
        await fs.access(wrongFilename);
    } catch(err) {
        throw error;
    }
    try {
        await fs.rename(wrongFilename, properFilename);
    } catch (err) {
        throw error;
    }
};

if (process.env.DHJN_ENV === 'test') {
    console.log('\n===== This is a personal test environment -- not RS school =====\n');
} else {
    await rename();
}

export { rename };
