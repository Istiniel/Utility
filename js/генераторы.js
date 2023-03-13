// !Генераторы - функции которые могут порождать (yield) множество значений одно за другим, по мере необходимости
// Для объявления генератора используется специальная синтаксическая конструкция: function*. Когда такая функция вызвана, она не выполняет свой код. Вместо этого она возвращает специальный объект, так называемый «генератор», для управления её выполнением

// !Основным методом генератора является next()
// Результатом метода next() всегда является объект с двумя свойствами:
// value: значение из yield,
// done: true, если выполнение функции завершено, иначе false
// Повторный вызов generator.next() возобновит выполнение кода и вернёт результат следующего yield

function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  return 5;
}

let generator = generateSequence();

let one = generator.next();

console.log(one); // {value: 1, done: false}

// Генераторы можно перебирать for...of. Значение return не возвращается

for (let value of generator) {
  console.log(value); // 2, 3, 4 (т.к. 1 был получен ранее)
}
let sequence = ['The generator: ', ...generateSequence()]; // spread может использоваться для получения данных вызова генератора
console.log(sequence);

// Функцию-генератор подходит для итерации объекта с помощью Symbol.iterator. Это возможно поскольку у функций-генераторов есть встроенный метод next(), который необходим Symbol.iterator для корректной работы

let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // краткая запись для [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};
console.log([...range]); // 1,2,3,4,5

// !Композиция генераторов
// Существует особый синтаксис yield*, который позволяет «вкладывать» генераторы один в другой (осуществлять их композицию)
// yield* означает, что перебираются все значения внутреннего генератора на который ссылается yield* и данные значения присваиваются внешнему генератору, как если бы они изначально были объявлены в нём

function* generateSequence1(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
  // 0..9
  yield* generateSequence1(48, 57);

  // A..Z
  yield* generateSequence1(65, 90);

  // a..z
  yield* generateSequence1(97, 122);
}
let yieldsValues = '';
let str = '';

for (let code of generatePasswordCodes()) {
  str += code;
}

for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}
console.log(yieldsValues); // 48...57 65...90 97...122
console.log(str); // 0..9A..Za..z

// !Значения генераторов можно изменять с помощью ввода аргумента при вызове next(arg)

function* gen() {
  let ask1 = yield '2 + 2 = ?';

  console.log('ask1: ' + ask1); // 4

  let ask2 = yield '3 * 3 = ?';

  console.log('ask2: ' + ask2); // 9
}
let generator1 = gen();

console.log(generator1.next().value); // "2 + 2 = ?"
console.log(generator1.next(4).value); // "3 * 3 = ?"
console.log(generator1.next(9).done); // true

// Первый .next() начинает выполнение… Оно доходит до первого yield,
// результат возвращается во внешний код.
// второй .next(4) передаёт 4 обратно в генератор как результат первого yield и возобновляет выполнение,
// …оно доходит до второго yield, который станет результатом .next(4),
// третий next(9) передаёт 9 в генератор как результат второго yield и возобновляет выполнение, которое завершается окончанием функции, так что done: true
// !next(value) передаёт в генератор значение, которое становится результатом текущего yield, возобновляет выполнение и получает выражение из следующего yield

// Для того, чтобы передать ошибку в yield, нам нужно вызвать generator.throw(err). В таком случае исключение err возникнет на строке с yield.
function* generate() {
  let result = yield '2 + 2 = ?'; // Ошибка в этой строке
}

let generator2 = generate();

let question = generator2.next().value;

try {
  generator2.throw(new Error('Ответ не найден в моей базе данных'));
} catch (e) {
  console.log(e); // покажет ошибку
}
