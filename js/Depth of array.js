class DepthCalculator {
  calculateDepth(array, depth = 1) {
    if (!Array.isArray(array)) return false;

    let count = depth;
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        const subArrayDepth = this.calculateDepth(array[i], depth + 1);
        if (subArrayDepth > count) {
          count = subArrayDepth;
        }
      }
    }
    return count;
  }
}

let calc = new DepthCalculator();

console.log(calc.calculateDepth([[[[[[[]]]], [[]]]]]));
