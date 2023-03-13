Array.prototype.map = function (func, thisArg) {
  let result = new Array(this.length);

  for (let i in this) {
    if (isNaN(+i)) continue;
    // if thisArg is not defined in .map, then this is context
    // +i in apply need for making object key Numbers (object key is string by deafult)
    result[i] = func.apply(thisArg, [this[i], +i, this]);
  }
  return result;
};

console.log(
  [1, 2, 3].map(
    function (el, ind) {
      return el + this[ind];
    },
    [7, 4, 2]
  )
);
