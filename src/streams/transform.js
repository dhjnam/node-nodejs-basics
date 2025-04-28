import { Transform } from 'node:stream';

const transform = async () => {
    // Write your code here 
    
    const ts = new Transform({
        transform(chunk, encoding, callback) {
            const reversed = chunk.reverse();
            this.push(reversed);
            callback();
        },
        final(callback) {
            callback();
        }
    });

    process.stdin.pipe(ts).pipe(process.stdout);
};

await transform();