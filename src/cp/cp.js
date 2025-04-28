import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const spawnChildProcess = async (args) => {
    // Write your code here
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileScript = `${__dirname}/files/script.js`;

    const child = spawn('node', [
        fileScript, 
        ...args
        // ...args.map(arg => toString(arg))
    ], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });
    child.stdin.on('data', (data) => {
        console.log(data);
    });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    child.on('message', (message) => {
        console.log(`From child message handler in master: ${message}`)
    });
    child.send('foobarbaz');
    
    return child;
};

// Put your arguments in function call to test this functionality
// spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
// spawnChildProcess([112, 'hallo', { foo: 'foo', one: 1 }]);
spawnChildProcess([{ foo: 'foo', one: 1 }, { a: 'aaa', b: 'bbb' }]);
