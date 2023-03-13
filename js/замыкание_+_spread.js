function multiplyBy8(...arr) {
  let tempMultiplyResult = arr.reduce((a, b) => a + b * 8, 0);
  function mult(...arr1) {
    return (tempMultiplyResult =
      tempMultiplyResult + arr1.reduce((a, b) => a + b * 8, 0));
  }

  return mult;
}

let tempfunc = multiplyBy8(1, 2);
console.log(tempfunc(3, 4));
console.log(tempfunc(1));

console.log(multiplyBy8(1, 2)(3, 4));
