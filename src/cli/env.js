/**
 * env.js
 * implement function that parses environment variables with prefix RSS_ and 
 * prints them to the console in the format RSS_name1=value1; RSS_name2=value2
 */
const parseEnv = () => {
  // Write your code here 
  const keyval = Object.entries(process.env);
  let fil = keyval.filter( ([key, val]) => key.startsWith('RSS_') )
  let mp = fil.map( (key, val) => `${key}=${val}` )
  let jn = mp.join('; ');
  const keyvals = Object.entries(process.env)
    .filter( ([key, val]) => key.startsWith('RSS_') )
    .map( ([key, val]) => `${key}=${val}` )
    .join('; ');
  console.log(keyvals);
};


if (process.env.DHJN_ENV === 'test') {
  console.log('\n===== This is a personal test environment -- not RS school =====\n')
} else {
  parseEnv();
}

export { parseEnv };

