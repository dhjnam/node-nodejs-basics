import { access, constants, open, writeFile } from 'node:fs/promises';
import { dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const create = async () => {
    // Write your code here 
    
    // Working with promises API
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const freshFile = `${__dirname}/files/fresh.txt`;
    
    let fileHandle;
    const error = new Error('FS operation failed');
    try {
        await access(freshFile, constants.F_OK);
        // In any case, this try-block will throw an error:
        // Either from the access if `freshFile` does not exist
        // and if `freshFile` exists, by instruction, we must throw `error`.
        // ...
        throw error;
    } catch (err) {
        // ... Thus, when catching the error we must distinguish it
        if (err === error) {
            throw error;
        }
        // console.log(`${basename(freshFile)} does not exist yet:\n  ${err}\n  Continue with code execution though!`);
    }
    
    try {
        const data = 'I am fresh and young';
        fileHandle = await open(freshFile, 'w');
        await fileHandle.write(data);
        fileHandle.close();
        // await writeFile(freshFile, data);
    } catch (err) {
        console.log(`Error while attempting to write ${basename(freshFile)}: ${err}`);
    }

};

if (process.env.DHJN_ENV === 'test') {
    console.log('\n===== This is a personal test environment -- not RS school =====\n')
} else {
    await create();
}

export { create };
