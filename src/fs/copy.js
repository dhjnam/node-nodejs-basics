import { promises as fs } from 'node:fs';
import { dirname, basename } from 'path';
import { fileURLToPath } from 'url';

/**
 * copy.js
 * implement function that copies folder files files with all its content into folder files_copy at the same level 
 * If 
 * - files folder doesn't exist or
 * - files_copy has already been created 
 * Error with message FS operation failed must be thrown
 */

const copy = async () => {
    // Write your code here 

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const folder = `${__dirname}/files`;
    const copyFolder = `${__dirname}/files_copy`;
    
    // Throw if `files` folder doesn't exists or `files_copy` exists.
    const error = new Error('FS operation failed');
    // `files` does not exist
    try {
        await fs.access(folder);
    } catch (err) {
        if (err.syscall === 'access') {
            throw error;
        }
    }
    // `files_copy` already exists
    try {
        await fs.access(copyFolder);
        throw error;
    } catch (err) {
        if (err === error) {
            throw error;
        }
    }
    await fs.cp(folder, copyFolder, { recursive: true });
};

if (process.env.DHJN_ENV === 'test') {
    console.log('\n===== This is a personal test environment -- not RS school =====\n')
} else {
    await copy();
}

export { copy };
