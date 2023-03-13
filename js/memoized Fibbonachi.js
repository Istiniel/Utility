function memo(func) {
  let storage = {};
  return (arg) => storage[arg] || (storage[arg] = func(arg));
}

function fib(n) {
  if (n <= 1) {
    return n;
  } else {
    return memFib(n - 1) + memFib(n - 2);
  }
}
const memFib = memo(fib);

console.log(memFib(5));

function nthFibo(n) {
  if (n <= 1) return 0;
  return memFib(n) - memFib(n - 2);
}
console.log(nthFibo(5));
