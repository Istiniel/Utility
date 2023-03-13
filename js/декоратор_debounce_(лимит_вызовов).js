function f(...args) {
  console.log(args.join('+'));
}
// создаём обёртки

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

let temp1 = throttle(f, 1000);

temp1(1, 'первый'); // Выполняется сразу
temp1(2); // проигнорировано

setTimeout(() => temp1(3), 100); // проигнорировано
setTimeout(() => temp1(4), 500); // проигнорировано
setTimeout(() => temp1(5), 550); // проигнорировано
setTimeout(() => temp1(6), 870); // записано в локальные переменные последним вызовом
setTimeout(() => temp1(7), 1750); // Выполняется
setTimeout(() => temp1(8), 4250); // Выполняется
setTimeout(() => temp1(9), 5250); // Выполняется
