export function parsePathList(str) {
  return str.split(' ');
}

/*
 todo(optional): improve
const basic = 'root/dir/subdir1 root/dir/subdir2';
const basicQuotes = '"root/dir/sub directory3" root/dir/subdir4';
const basicBackslashes = 'root/dir/sub directory5 root/dir/subdir6';

console.log(parsePathList(basic));
console.log(parsePathList(basicQuotes));
console.log(parsePathList(basicBackslashes));
 */
