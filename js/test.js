function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const test = [];

for (let i = 0; i < 17; i++) {
  test.push((randomNumber(92, 758) * 0.78).toFixed(2));
}

console.log(test);
