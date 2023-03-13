// Пример №1
console.log('Пример №1');
let worker = {
  slow(min, max) {
    console.log(`Called with ${min},${max}`);
    return min + max;
  },
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function () {
    let key = hash(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments);

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

console.log(worker.slow(3, 5)); // работает
console.log(worker.slow(3, 5)); // работает

// !декоратор-шпион
// Пример №2
console.log('Пример №2');
function work(a, b) {
  console.log(a + b); // произвольная функция или метод
}

function spy(func) {
  function wrapper(...args) {
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9
console.log(work.calls[1]);
console.log(work.calls);
for (let args of work.calls) {
  // Проверка элементов массива, в которые записаны результаты вызова функции work
  console.log('call:' + args.join()); // "call:1,2", "call:4,5"
}
