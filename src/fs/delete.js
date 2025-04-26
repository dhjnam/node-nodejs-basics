import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToRemove = `${__dirname}/../../src/fs/files/fileToRemove.txt`;

/**
 * delete.js
 * implement function that deletes file fileToRemove.txt 
 * if
 * - there's no file fileToRemove.txt Error with message `FS operation failed` must be thrown
 */

const remove = async () => {
    // Write your code here #
    const error = new Error('FS operation failed')
    try {
        await fs.access(fileToRemove);
    } catch (err) {
        throw error;
    }
    try {
        await fs.rm(fileToRemove, { force: true });
    } catch (err) {
        throw error;
    }
};

if (process.env.DHJN_ENV === 'test') {
    console.log('\n===== This is a personal test environment -- not RS school =====\n');
} else {
    await remove();
}

export { remove };
