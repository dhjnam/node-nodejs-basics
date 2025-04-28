/**
 * args.js 
 * implement function that parses command line arguments 
 * (given in format --propName value --prop2Name value2, you don't need to validate it) 
 * and prints them to the console in the format `propName is value, prop2Name is value2`
 */

const parseArgs = () => {
  // Write your code here 
  const values = [];
  // for ( const [i, argv] of Object.entries(process.argv) ) {
  for ( let i = 0; i < process.argv.length; i++ ) {
    const arg = process.argv[i];
    if ( arg.startsWith('--') ) {
      if ( i == process.argv.length - 1 || process.argv[i+1].startsWith('--') ) {
        values.push(`${arg.slice(2)} is `);
      } else {
        values.push(`${arg.slice(2)} is ${process.argv[i+1]}`);
        i += 1;
      }
    }
  }
  console.log(values.join(', '));
};


if (process.env.DHJN_ENV === 'test') {
  console.log('\n===== This is a personal test environment -- not RS school =====\n')
} else {
  parseArgs();
}

export { parseArgs };
