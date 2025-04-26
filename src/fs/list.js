import { promises as fs } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folder = `${__dirname}/files`;


/**
 * list.js
 * implement function that prints array of all filenames from files folder into console
 * if files folder doesn't exists Error with message `FS operation failed` must be thrown
 */

const list = async () => {
    // Write your code here 

    const error = new Error('FS operation failed');
    try {
        await fs.access(folder);
    } catch (err) {
        throw error;
    }
    
    try {
        const files = await fs.readdir(folder);
        // console.log(files)
        for (const file of files) {
            console.log(file)
        }
    } catch (err) {
        
    }
    
};


if (process.env.DHJN_ENV === 'test') {
    console.log('\n===== This is a personal test environment -- not RS school =====\n');
} else {
    await list();
}

export { list };

