function permutations(str) {
  if (str.length === 1) return str;
  let result = [];

  for (let i = 0; i < str.length; i++) {
    let first = str.slice(i, i + 1);
    let restStr = str.slice(0, i) + str.slice(i + 1);
    for (let evr of permutations(restStr)) {
      if (result.indexOf(evr) === -1) {
        result.push(first + evr);
      }
    }
  }

  return result;
}

console.log(permutations('abc'));
