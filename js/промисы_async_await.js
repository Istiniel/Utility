// !Callback (функция-коллбэк, обратный вызов) - тип функций которые передаются в качестве аргумента и вызываюся изнутри других функций, после определенных вычислений (зачастую асинхронных, требующих времени для реализации)

// Пример «error-first callback»
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () =>
    callback(new Error(`Не удалось загрузить скрипт ${src}`));

  document.head.append(script);
}

// !Вызов функции loadScript
// loadScript('замыкание_+_spread.js', function (error, script) {
//   if (error) {
//      обрабатываем ошибку
//   } else {
//     скрипт успешно загружен
//   }
// });

// !Promise (промисы(обещания))
// Основное назначение промисов - выполнение асинхронных действий, например необходимо чтобы какая-либо функция отработала только после получения данных от сервера. Чтобы данная функция начала выполняться лишь после получения данных, необходимо использовать promise

const promise123 = new Promise((resolve, reject) => {
  const randomNumber = Math.random();

  if (randomNumber < 0.7) {
    resolve('Все прошло отлично!');
  } else {
    reject(new Error('Что-то пошло не так'));
  }
});
promise123.then(
  (data) => {
    console.log(data); // вывести 'Все прошло отлично!'
  },
  (error) => {
    console.log(error); // вывести ошибку
  }
);

let randomPromise = new Promise(function (resolve, reject) {
  // функция-исполнитель (executor) - функция переданная в Promise
  setTimeout(() => resolve('nicely done!'), 1000);

  // Исполнитель (executor) запускается автоматически, выполняет задачу (что-то, что обычно требует времени), затем вызывает resolve или reject, чтобы изменить состояние соответствующего Promise.
});
// У объекта promise, возвращаемого конструктором new Promise, есть внутренние свойства:

// state («состояние») — вначале "pending" («ожидание»), потом меняется на "fulfilled" («выполнено успешно») при вызове resolve или на "rejected" («выполнено с ошибкой») при вызове reject,
// result («результат») — вначале undefined, далее изменяется на value при вызове resolve(value) или на error при вызове reject(error)

// Исполнитель выполняет задачу (что-то, что обычно требует времени), затем вызывает resolve или reject, чтобы изменить состояние соответствующего Promise. Reject вызывается с объектом ошибкой

// !После выполнения обещания (promise), данные result (value или error) нужно отработать с помощью методов .then, .catch класса Promise
// Отдельный промис выполняет только 1 исход, либо result, либо error, оба варианта одновременно невозможны
randomPromise.then(
  (result) => console.log(result), // "nicely done!"
  (error) => console.log(error) // не будет запущена
);

let promise = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('Whoops!')), 2000);
});

// finally - обобщающий метод, позволяющий выполнить какие-то промежуточные действия перед обработкой promise методами .then, .catch. Finally ничего не возвращает, даже при указании return
promise = promise.finally(() => console.log('Promise завершён!'));

// .catch(f) это то же самое, что promise.then(null, f)
promise.catch((err) => console.log(err)); // выведет "Error: Whoops!"

// reject запустит вторую функцию, переданную в .then
promise.then(
  (result) => console.log(result), // не будет запущена
  (error) => console.log('Найдена ошибка: ' + error) // выведет "Error: Whoops!" спустя одну секунду
);

// !Цепочка promises
// Обработчик метода .then, переданный в .then(handler), может вернуть промис, в этом случае дальнейшие обработчики ожидают, пока он выполнится, и затем получают его результат
// Цепочка промисов работает, потому что вызов promise.then тоже возвращает промис, так что мы можем вызвать на нём следующий .then
// .then, .catch могут возвращать новые промисы, создавая ассинхронную цепочку действий
// Promise может возвращать любой объект содержащий метод .then, поэтому некоторые библиотеки реализуют свои классы с методом .then, для реализации цепочек promise

let testPromiseChain = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
})
  .then(function (value) {
    console.log(value); // 1
    return value * 2;
  })
  .then(function (result) {
    console.log(result); // 2
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 4
    return result * 2;
  });
console.log(Object.prototype.toString.call(testPromiseChain));

// !Thenable, редактирование результата .then с помощью сторонних классов
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    setTimeout(() => resolve(this.num * 2 + ' :changed value'), 1000); // (**)
  }
}

let testPromise2 = new Promise((resolve) => resolve(1)).then((result) => {
  return new Thenable(result); // (*)
});
// JavaScript проверяет объект, возвращаемый из обработчика .then в строке (*): если у него имеется метод then, который можно вызвать, то этот метод вызывается, а результат выполнения в .then класса Thenable запоминается в исходном объекте Promise в качестве value/error
// Упрощенно, можно сказать что Thenable с помощью своего метода then автоматически обрабатывает результат предыдущего значения promise и после обработки возвращает это значение объекту promise
testPromise2.then((value) => console.log(value));

// !Promise, обработка ошибок
new Promise((resolve, reject) => {
  resolve('ок');
})
  .then((result) => {
    blabla(); // нет такой функции
  })
  .catch((value) => console.log(value)) // ReferenceError: blabla is not defined
  .then((value) => console.log('Управление передано then!'));
//
//
// !Наиболее распространенные методы Promise
// Promise.all(promises) – ожидает выполнения всех промисов и возвращает массив с     результатами. Если любой из указанных промисов вернёт ошибку, то результатом работы Promise.all будет эта ошибка, результаты остальных промисов будут игнорироваться.

// Promise.allSettled(promises) (добавлен недавно) – ждёт, пока все промисы завершатся и возвращает их результаты в виде массива с объектами, у каждого объекта два свойства:
// status: "fulfilled", если выполнен успешно или "rejected", если ошибка,
// value – результат, если успешно или reason – ошибка, если нет.

// Promise.race(promises) – ожидает первый выполненный промис, который становится его результатом, остальные игнорируются.

// Promise.any(promises) (добавлен недавно) – ожидает первый успешно выполненный промис, который становится его результатом, остальные игнорируются. Если все переданные промисы отклонены, AggregateError становится ошибкой Promise.any.

// Promise.resolve(value) – возвращает успешно выполнившийся промис с результатом value.

// Promise.reject(error) – возвращает промис с ошибкой error.

// !Async/await
// У слова async один простой смысл: эта функция всегда возвращает промис. Значения других типов оборачиваются в успешно завершившийся промис

async function f() {
  return 'Await: 1';
}
f().then(console.log); // Await: 1

// Ключевое слово await заставит интерпретатор JavaScript ждать до тех пор, пока промис/функция справа от await не выполнится. После чего оно вернёт !!результат!! выполнения промиса, и выполнение кода продолжится
// Await работает только внутри async-функций
// await работает с «thenable»–объектами по аналогии с .then()

async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('готово!'), 1000);
  });

  let result = await promise; // будет ждать, пока промис не выполнится (*)

  console.log(result); // "готово!"
}

f();

// В данном примере выполнение функции остановится на строке (*) до тех пор, пока промис не выполнится. Это произойдёт через секунду после запуска функции. После чего в переменную result будет записан результат выполнения промиса

// !Существует возможность использовать метод [Symbol.asyncIterator]() для создания асинхронно итерируемых объектов. Для итерации используется конструкция for await (let value of range)
//
//
//
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    // ура, можно использовать await!
    await new Promise((resolve) => setTimeout(resolve, 1000));

    yield i;
  }
}

(async () => {
  let generator = generateSequence(7, 11);
  for await (let value of generator) {
    console.log(value); // 7, потом 8, потом 9, потом 10, потом 11
  }
})();
