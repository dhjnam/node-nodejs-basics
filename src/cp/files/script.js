const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('CLOSE')) process.exit(0);
    process.send(chunk.toString());
    process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
};

// process.stdin.on('data', echoInput);
process.stdin.on('data', (chunk) => {
    echoInput(chunk);
});

process.on('message', (msg) => {
    console.log(`Child process received message: ${msg}`);
});
