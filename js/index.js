function alert(...args) {
  console.log(...args);
}

// !Символы, глобальные и локальные

let id = Symbol.for('id'); // Глобальный символ, если указанного нет в реестре, создает новый глобальный символ
let id1 = Symbol('id11');

let user = {
  name: 'Вася',
  [id]: 123, //  id без [] не относится к символу, другой ключ
  id: 345,
};
console.log(user[id]);
console.log(user['id']);
console.log(Symbol.keyFor(id)); // Symbol.keyFor(...) получает символ из глобального реестра
console.log(id1);
console.log(id1.description);

// !Преобразование объектов

let user1 = {
  name: 'Alex',
  age: 20,
};

// Логическое преобразование true
console.log(`В boolean: ${Boolean(user1)}`);
console.log(`В boolean: ${!!user1}`);

// Строковое преобразование (объединение строк +) [object Object]randomString
console.log(`В строку: ${user1 + 'randomString'}`);
console.log(`В строку: ${user1.toString()}`);

// Числовое преобразование NaN
console.log(`В число: ${+user1}`);
console.log(`valueOf(): ${user1.valueOf()}`);

// Переопределяем метод .@@toPrimitive()(вызывается при компиляции)
let user2 = {
  name: 'John',
  money: 1000,

  [Symbol.toPrimitive](hint) {
    console.log(`hint: ${hint}`);
    return hint == 'string' ? `{name: "${this.name}"}` : this.money;
  },
};

// демонстрация результатов преобразований:
console.log(user2); // hint: string -> {name: "John"}
console.log(+user2); // hint: number -> 1000
console.log(user2 + 500); // hint: default -> 1500

// Чаще всего достаточно определить obj.toString()

// !Числа

let billion = 1e9; // 10 в 9 степени
let ms = 1e-6; // 10 в -6 степени

// Метод num.toString(base) возвращает строковое представление числа num в системе счисления base
let numberTemp = 251;
let numberForRound = 5.1725;
console.log(`Перевод числа в 2-ную систему: ${numberTemp.toString(2)}`);

// Округление числа до заданной точности "5.1725".toFixed(3), возвращает строку "5.1725"
console.log(`Округление до 0.001: ${numberForRound.toFixed(3)}`);
console.log(typeof (5.1245).toFixed(3));

// Math.round округляет число до ближайшего верхнего целого
console.log(Math.round(2.7));

// Math.floor округляет число до ближайшего меньшего целого
console.log(Math.floor(2.7));

// Десятичные числа в ряде случаев представляются как бесконечная дробь, отчего происходят ошибки в выражениях. Исправляется с помощью toFixed с указанной точностью
console.log(`0.1 в интерпретации js: ${(0.1).toFixed(20)}`);
console.log(`toFixed --> : ${(0.1).toFixed(2)}`);

console.log(`0.1 + 0.2 == 0.3 без toFixed: ${0.1 + 0.2 == 0.3}`);
console.log(`(0.1 + 0.2).toFixed(1) == 0.3: ${(0.1 + 0.2).toFixed(1) == 0.3}`);

// Для повышения точности можно использовать умножение и деление на 10,100 и т.д.
// alert( 6.35.toFixed(20) ); // 6.34999999999999964473, поэтому toFixed(1) дает 6.3

console.log(`6.35.toFixed(1): ${(6.35).toFixed(1)}`);
console.log(`(6.35 * 10).toFixed(1) / 10: ${(6.35 * 10).toFixed(1) / 10}`);

// parseInt(num, base) возвращает число num, base указывает систему счисления num

console.log(`parseInt('100px'): ${parseInt('100px')}`); // 100
console.log(`parseInt('12.5em'): ${parseFloat('12.5em')}`); // 12.5
console.log(`parseInt('12.3'): ${parseInt('12.3')}`); // 12, вернётся только целая часть
console.log(`parseFloat('12.3.4'): ${parseFloat('12.3.4')}`); // 12.3, произойдёт остановка чтения на второй точке
console.log(`parseInt('1101', 2): ${parseInt('1101', 2)}`);

// !Строки String

// str.indexOf(substr, pos) возвращает индекс substr начиная с позиции pos
let str = 'Widget with id';

// 0, потому что подстрока 'Widget' найдена в начале
console.log(`indexOf: ${str.indexOf('Widget')}`);

// -1, совпадений нет, поиск чувствителен к регистру
console.log(str.indexOf('widget'));

// 1, подстрока "id" найдена на позиции 1 (..idget with id)
console.log(str.indexOf('id'));

//str.includes(substr, pos) возвращает true, если в строке str есть подстрока substr, либо false, если нет.
console.log(`includes: ${'Widget with id'.includes('Widget')}`); // true
console.log('Hello'.includes('Bye')); // false

// Метод charCodeAt() возвращает числовое значение Юникода для символа по указанному индексу
console.log(`Строка25.charCodeAt(3): ${'Строка25'.charCodeAt(3)}`);

//String.fromCharCode() возвращается строчку из указанного кода UTF-16
console.log(`String.fromCharCode(1086): ${String.fromCharCode(1086)}`);

//str.trim() убирает пробелы
console.log(`'  nice template    '.trim(): ${'  nice template    '.trim()}`);

let countries = ['b', 'c', 'a'];

console.log(
  `Сортировка массива sort: ${countries.sort((a, b) => (a > b ? 1 : -1))}` // [a, b, c]
);

// !Массивы
// Шпаргалка по методам массива:

// Для добавления/удаления элементов:

// push (...items) – добавляет элементы в конец,
// pop() – извлекает элемент с конца,
// shift() – извлекает элемент с начала,
// unshift(...items) – добавляет элементы в начало.
// splice(pos, deleteCount, ...items) – начиная с индекса pos, удаляет deleteCount элементов и вставляет items.
// slice(start, end) – создаёт новый массив, копируя в него элементы с позиции start до end (не включая end).
// concat(...items) – возвращает новый массив: копирует все члены текущего массива и добавляет к нему items. Если какой-то из items является массивом, тогда берутся его элементы.
// Для поиска среди элементов:

// indexOf/lastIndexOf(item, pos) – ищет item, начиная с позиции pos, и возвращает его индекс или -1, если ничего не найдено.
// includes(value) – возвращает true, если в массиве имеется элемент value, в противном случае false.
// find/filter(func) – фильтрует элементы через функцию и отдаёт первое/все значения, при прохождении которых через функцию возвращается true.
// findIndex похож на find, но возвращает индекс вместо значения.
// Для перебора элементов:

// forEach(func) – вызывает func для каждого элемента. Ничего не возвращает.
// Для преобразования массива:

// map(func) – создаёт новый массив из результатов вызова func для каждого элемента.
// sort(func) – сортирует массив «на месте», а потом возвращает его.
// reverse() – «на месте» меняет порядок следования элементов на противоположный и возвращает изменённый массив.
// split/join – преобразует строку в массив и обратно.
// reduce/reduceRight(func, initial) – вычисляет одно значение на основе всего массива, вызывая func для каждого элемента и передавая промежуточный результат между вызовами.
// Дополнительно:

// Array.isArray(arr) проверяет, является ли arr массивом.
// Обратите внимание, что методы sort, reverse и splice изменяют исходный массив.

// Array.from(obj) превращает объект(псевдомассив) в массив

// !Уникальный итератор объекта Symbol.iterator

let range = {
  from: 1,
  to: 5,
};

// 1. вызов for..of сначала вызывает эту функцию
range[Symbol.iterator] = function () {
  // ...она возвращает объект итератора:
  // 2. Далее, for..of работает только с этим итератором, запрашивая у него новые значения
  return {
    current: this.from,
    last: this.to,

    // 3. next() вызывается на каждой итерации цикла for..of
    next() {
      // 4. он должен вернуть значение в виде объекта {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

for (let num of range) {
  console.log(`Уникальный итератор указывает на: ${num}`); // 1, затем 2, 3, 4, 5
}

console.log(`Array.from(range): ${Array.from(range)}`);

// Объекты, которые можно использовать в цикле for..of, называются итерируемыми.

// Технически итерируемые объекты должны иметь метод Symbol.iterator.
// Результат вызова obj[Symbol.iterator] называется итератором. Он управляет процессом итерации.
// Итератор должен иметь метод next(), который возвращает объект {done: Boolean, value: any}, где done:true сигнализирует об окончании процесса итерации, в противном случае value – следующее значение.
// Метод Symbol.iterator автоматически вызывается циклом for..of, но можно вызвать его и напрямую.
// Встроенные итерируемые объекты, такие как строки или массивы, также реализуют метод Symbol.iterator.
// Строковый итератор знает про суррогатные пары.
// Объекты, имеющие индексированные свойства и length, называются псевдомассивами. Они также могут иметь другие свойства и методы, но у них нет встроенных методов массивов.

// Если мы заглянем в спецификацию, мы увидим, что большинство встроенных методов рассчитывают на то, что они будут работать с итерируемыми объектами или псевдомассивами вместо «настоящих» массивов, потому что эти объекты более абстрактны.

// Array.from(obj[, mapFn, thisArg]) создаёт настоящий Array из итерируемого объекта или псевдомассива obj, и затем мы можем применять к нему методы массивов. Необязательные аргументы mapFn и thisArg позволяют применять функцию с задаваемым контекстом к каждому элементу.

// ! Map/Set карта значений (ключ/значение)
// Map
// Map – это коллекция ключ/значение, как и Object. Но основное отличие в том, что Map позволяет использовать ключи любого типа.

// Методы и свойства:

// new Map() – создаёт коллекцию.
// map.set(key, value) – записывает по ключу key значение value.
// map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
// map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
// map.delete(key) – удаляет элемент по ключу key.
// map.clear() – очищает коллекцию от всех элементов.
// map.size – возвращает текущее количество элементов.

let map = new Map();
map.set('1', 'str1').set(1, 'num1').set(true, 'bool1');

let recipeMap = new Map([
  ['огурец', 500],
  ['помидор', 350],
  ['лук', 50],
]);

// Для перебора коллекции Map есть 3 метода
// map.keys() – возвращает итерируемый объект по ключам,
// map.values() – возвращает итерируемый объект по значениям,
// map.entries() – возвращает итерируемый объект по парам вида [ключ, значение]

// .keys(), .values(), entries() возвращают объект-итератор, содержащий метод next(),
// next() для каждого ключа/значение возвращает объект со значением value и done,
// до тех пор пока done == false, итерация может продолжаться
const iterator1 = recipeMap.keys();
console.log(`iterator1.next().value: ${iterator1.next().value}`);
console.log(`iterator1.next().value: ${iterator1.next().value}`);
console.log(`iterator1.next().value: ${iterator1.next().value}`);
console.log(`iterator1.next().value: ${iterator1.next().value}`);

// перебор по ключам (овощи)
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable); // огурец, помидор, лук
}

// перебор по значениям (числа)
for (let amount of recipeMap.values()) {
  console.log(amount); // 500, 350, 50
}

// перебор по элементам в формате [ключ, значение]
for (let entry of recipeMap) {
  // то же самое, что и recipeMap.entries()
  console.log(entry); // огурец,500 (и так далее)
}

// Перевод Map в Array
console.log(Array.from(recipeMap)[0]);

// Перевод Map в отдельный объект
console.log(Object.fromEntries(recipeMap));

// !Set множество значений
// Объект Set – это особый вид коллекции: «множество» значений (без ключей), где каждое значение может появляться только один раз.

// Его основные методы это:

// new Set(iterable) – создаёт Set, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый Set.
// set.add(value) – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
// set.delete(value) – удаляет значение, возвращает true, если value было в множестве на момент вызова, иначе false.
// set.has(value) – возвращает true, если значение присутствует в множестве, иначе false.
// set.clear() – удаляет все имеющиеся значения.
// set.size – возвращает количество элементов в множестве.
// Основная «изюминка» – это то, что при повторных вызовах set.add() с одним и тем же значением ничего не происходит, за счёт этого как раз и получается, что каждое значение появляется один раз.

// ! WeakMap и WeakSet
// WeakMap – это Map-подобная коллекция, позволяющая использовать в качестве ключей только объекты, и автоматически удаляющая их вместе с соответствующими значениями, как только они становятся недостижимыми иными путями.
// WeakSet – это Set-подобная коллекция, которая хранит только объекты и удаляет их, как только они становятся недостижимыми иными путями.
// Обе этих структуры данных не поддерживают методы и свойства, работающие со всем содержимым сразу или возвращающие информацию о размере коллекции. Возможны только операции на отдельном элементе коллекции.
// WeakMap и WeakSet используются как вспомогательные структуры данных в дополнение к «основному» месту хранения объекта. Если объект удаляется из основного хранилища и нигде не используется, кроме как в качестве ключа в WeakMap или в WeakSet, то он будет удалён автоматически, в отличие от того же случая в Map и Set

// !Пример работы WeakSet

// Массивы объектов непрочитанных писем из другого файла
let messages = [
  { text: 'Hello', from: 'John' },
  { text: 'How goes?', from: 'John' },
  { text: 'See you soon', from: 'Alice' },
];

//Вводим символьный знак для пометки непрочитанных сообщений
let isRead = Symbol('isRead');

//Создаем WeakSet для полученных непрочитанных сообщений
let readMessages = new WeakSet();

// Функция для прочтения массива непрочитанных сообщений
function readMessage(message) {
  for (let check of message) {
    console.log(`${check['text']} from: ${check['from']}`);
    check[isRead] = true;
    readMessages.add(check);
  }
  return message;
}

readMessage(messages);

// Проверка добавления прочитанного сообщения в WeakMap
console.log(readMessages.has(messages[0]));

// Удаление прочитанных сообщений из массива непрочитанных сообщений
for (let message of messages) {
  if (message[isRead] != undefined) {
    messages.splice(messages.indexOf(message));
  }
}

//Проверка наличия непрочитанных сообщений в массиве
console.log(messages.length);

// !Разница в перечислениях for ... in и for ... of

let iterable = [3, 5, 7];
iterable.foo = 'hello';
console.log('Разница for...in и for...of');
for (let i in iterable) {
  console.log(` ${i}: ${iterable[i]}`);
  // i выведет само наименование свойства объекта: 0, 1, 2, "foo", "arrCustom", "objCustom"
  // iterable[i] выведет значения свойства объекта: 3, 5, 7, "hello"
}

for (let i of iterable) {
  console.log(` ${i}: ${iterable.indexOf(i)}`);
  // for ... of выводит непосредственно значения итерируемого объета
}

// !Функции Object.keys(obj), Object.values(obj), Object.entries(obj)
let user3 = {
  name: 'John',
  age: 30,
};

// !Деструктуризация, примеры

let arrRandom1 = ['Ilya', 'Kantor'];

let [firstName, surname] = arrRandom1;

console.log(firstName); // Ilya

let [a, b, c] = 'abc';
let [one, two, three] = new Set([1, 2, 3]);
console.log(one);

let options = {
  size: {
    width: 100,
    height: 200,
  },
  items: ['Cake', 'Donut'],
  extra: true,
};

// деструктуризация разбита на несколько строк для ясности
let {
  size: {
    // положим size сюда
    width,
    height,
  },
  items: [item1, item2], // добавим элементы к items
  title = 'Menu', // отсутствует в объекте (используется значение по умолчанию)
} = options;

console.log(`Примеры деструктуризации, результаты: ${title}`); // Menu
console.log(width); // 100
console.log(height); // 200
console.log(item1); // Cake
console.log(item2); // Donut

let options1 = {
  title: 'My menu',
  items: ['Item1', 'Item2'],
};

function showMenu({
  title = 'Untitled',
  width: w = 100, // width присваиваем в w
  height: h = 200, // height присваиваем в h
  items: [item1, item2], // первый элемент items присваивается в item1, второй в item2
}) {
  console.log(`${title} ${w} ${h}`); // My Menu 100 200
  console.log(item1); // Item1
  console.log(item2); // Item2
}

showMenu(options1);

// function({
//   incomingProperty: varName = defaultValue
//   ...
// })
// Для объекта с параметрами будет создана переменная varName для свойства с именем incomingProperty по умолчанию равная defaultValue

let guest = 'Jane';
let admin = 'Pete';

// Давайте поменяем местами значения: сделаем guest = "Pete", а admin = "Jane"
[guest, admin] = [admin, guest];

console.log(`${guest} ${admin}`); // Pete Jane (успешно заменено!)

// !Дата , объекта дата

let now = new Date();
console.log(now); // показывает текущие дату и время Fri Nov 18 2022 14:40:42 GMT+0300 (Москва, стандартное время)

// Добавим 24 часа к 01.01.1970 UTC+0 и получим 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log(Jan02_1970);

// new Date(year, month, date, hours, minutes, seconds, ms)
let date = new Date('2017-01-26');
console.log(date);

let date1 = new Date(2011, 0, 1, 2, 3, 4, 567);
console.log(date1); // 1.01.2011, 02:03:04.567

// date.getUTCDay() (как пример), возвращает данные для часовой зоны UTC+0
console.log('Year: ' + now.getFullYear()); // Получить год (4 цифры)
console.log('Month - 1: ' + now.getMonth()); // Получить месяц, от 0 до 11
console.log('DayofMonth: ' + now.getDate()); // Получить день месяца, от 1 до 31
console.log('Hour: ' + now.getHours());
console.log('Minutes: ' + now.getMinutes());
console.log('Second: ' + now.getSeconds());
console.log('Milliseconds: ' + now.getMilliseconds());
console.log('DayofWeek: ' + now.getDay()); //Вернуть день недели 0-6 (0 воскресенье)

// Получить timestamp, количество мс, пройденных от текущей даты
console.log('Timestamp in ms: ' + date.getTime());
console.log('Timestamp in ms: ' + +date); // Числовое преобразование даты

// Метод Date.parse(str) считывает дату из строки.
// Формат строки должен быть следующим: YYYY-MM-DDTHH:mm:ss.sssZ, где:
// YYYY-MM-DD – это дата: год-месяц-день.
// Символ "T" используется в качестве разделителя.
// HH:mm:ss.sss – время: часы, минуты, секунды и миллисекунды.
// Необязательная часть 'Z' обозначает часовой пояс в формате +-hh:mm. Если указать просто букву Z, то получим UTC+0.
// Метод Date.now() возвращает количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC

// Для получения даты используем метод toLocaleDateString()
// У данного метода два аргумента: локаль - язык отображения даты, например 'ru-RU', 'en-US', 'en-Br' и объект options в котором перечисляются какие параметры даты и в каком представлении нужно отображать
const options12 = {
  day: 'numeric',
  weekday: 'long',
  month: 'long',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'UTC',
};
const currentDate = new Date().toLocaleDateString('en-EN', options12);

currentDate = new Date().toLocaleTimeString('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
});

function getSec() {
  let dateT = new Date();
  let tomorrow = new Date(
    dateT.getFullYear(),
    dateT.getMonth(),
    dateT.getDate() + 1
  );
  console.log(dateT);
  console.log(tomorrow);
  return ((tomorrow - dateT) / 1000).toFixed(0);
}
console.log(getSec());

// !JSON (JavaScript Object Notation) – это общий формат для представления значений и объектов

// JSON является независимой от языка спецификацией для данных, поэтому JSON.stringify пропускает некоторые специфические свойства объектов JavaScript.
// А именно:
// Свойства-функции (методы),
// Символьные ключи и значения,
// Свойства, содержащие undefined.

let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null,
};

let json = JSON.stringify(student);

console.log('JSON.stringify пример: ' + typeof json); // мы получили строку!

console.log(json);

let room = {
  number: 23,
};

// JSON replacer (2-й аргумент в JSON.stringify(), фильтрует ключи/значения объекта с помощью отдельной функции или массива ключей [], space (3 аргумент) - указывает вид отступа

let userObj = {
  name: { extraName: 'Sammy', extraName2: 'Sammy2' },
  email: 'sammy@example.com',
  plan: 'Pro',
};

function replacer(key, value) {
  if (key === 'email') {
    return undefined;
  }
  return value;
}

// Ключи в replacer проверяются для всех вложенностей объектов
let userStrReplacer = JSON.stringify(userObj, replacer);
let userStrReplacer1 = JSON.stringify(userObj, ['name', 'email'], '...');
let userStrReplacer2 = JSON.stringify(
  userObj,
  ['name', 'email', 'extraName'],
  '...'
);
console.log(userStrReplacer);
console.log(userStrReplacer1);
console.log(userStrReplacer2);

// JSON.parse(obj) трансформирует строку JSON в объект JS (важен исходный вид объекта, скобки только "")

let user5 =
  '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

console.log(JSON.parse(userStrReplacer));

// !Возведение в степень с помощью рекурсии, хвостовой рекурсии

// Обычная рекурсия
function powXN(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * powXN(x, n - 1);
  }
}
console.log(powXN(5, 3));

// Хвостовая рекурсия
function powXNtail(x, n, tail_acc = 1) {
  console.log(`счетчик: ${n}, результат: ${tail_acc}`);
  if (n === 0) {
    return tail_acc;
  } else {
    return powXNtail(x, n - 1, tail_acc * x);
  }
}

console.log(powXNtail(5, 3));

// Пример: рекурсивный способ подсчета зарплаты
let company = {
  sales: [
    { name: 'John', salary: 1000 },
    { name: 'Alice', salary: 600 },
  ],
  development: {
    sites: [
      { name: 'Peter', salary: 2000 },
      { name: 'Alex', salary: 1800 },
    ],
    internals: [{ name: 'Jack', salary: 1300 }],
  },
};

function sumSalaries(department) {
  if (Array.isArray(department)) {
    return department.reduce((prev, current) => prev + current.salary, 0);
  } else {
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep);
    }
    return sum;
  }
}
for (let temp in company) {
  console.log(temp);
}

console.log(sumSalaries(company)); // 6700

// !Связанные списки LinkedList

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

let secondList = list.next.next; // Разбивка списка на разные части
list.next.next = null; // Разбивка списка на разные части

let temp1 = JSON.stringify(list);
let temp2 = JSON.stringify(secondList);
console.log(temp2);

list.next.next = secondList; // Объединение списка

// добавление нового элемента в список
list = { value: 'new item', next: list };
console.log(JSON.stringify(list));

// Удаление выборочного элемента из связного списка
list.next = list.next.next;
console.log(JSON.stringify(list));

// !Разница spread и rest
// spread "распаковывает" значения массива внутри другого массива при вызове
// rest помещает "оставшиеся" элементы массива внутри аргумента функции ...rest

// spread - помещает содержимое массива внутрь другого, "разворачивает" содержимое
let spreadExample = [1, 2, 5];
let randomArray = ['a', 'a125', ...spreadExample, 'exampleSpread1'];
console.log(randomArray);

// rest - помещает оставшиеся аргумента переданные функции в массив (rest1)
function restExample(a, b, ...rest1) {
  console.log(a);
  console.log(b);
  console.log(rest1);
}
restExample(1, 2, 5, 7, 5, 3);

// !Замыкание
// Замыкание — это комбинация функции и лексического окружения, в котором эта функция была объявлена. Это окружение состоит из произвольного количества локальных переменных, которые были в области действия функции во время создания замыкания. Переменные внешней функции (makeCounter()) запоминаются в лексическом окружении при возвращении внутренней функции (см. пример).

function makeCounter() {
  let count = 0;
  return function () {
    return count++;
  };
}

let counter1 = makeCounter();
let counter2 = makeCounter();

console.log('Замыкание в js: ' + counter1()); // 0
console.log(counter1()); // 1
console.log(counter2()); // 0 (независимо)

function inArray(arr) {
  return function (x) {
    return arr.includes(x);
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.filter(inArray([1, 2, 10]))); // [1,2]

// !Hoisting ("всплытие", "поднятие") - особенность переменных var. Независимо от места присвоения значения переменной, var видны во всей области

function sayHi() {
  phrase = 'Привет';
  console.log(phrase);
  var phrase; // Объявление типа переменной phrase после строки с выводом
}
sayHi();

function sayHi2() {
  var phrase; // объявление переменной срабатывает вначале...
  console.log(phrase); // undefined
  phrase = 'Привет'; // ...присвоение - в момент, когда исполнится данная строка кода.
}
sayHi2();

// !Named Function Expression или NFE – это термин для Function Expression, у которого есть имя

let sayHi3 = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func('Guest');
  }
};
let welcome = sayHi3;
sayHi3 = null;
welcome(); // Hello, Guest (вложенный вызов работает)

function makeCounter1() {
  let count = -1;

  function counter() {
    return ++count;
  }

  counter.set = (value) => (count = value);
  counter.decrease = () => --count;
  return counter;
}

let tempf = makeCounter1();
console.log(tempf());
console.log(tempf());
console.log(tempf.set(15));
console.log(tempf.decrease());
console.log(tempf());

// !Объявление функции new Function()
let sum = new Function('a', 'b', 'return a + b');
console.log('sum(1, 2): ' + sum(1, 2)); // 3

// !setTimeout(func, [delay], ...arg), setInterval(func, [delay], ...arg)
// Метод, вызывающий функцию (func) с задержкой в мс (delay). setInterval повторяет указанную функцию с интервалом (delay). Чтобы остановить выполнение необходимо вызвать clearInterval()

// Задание интервального вызова функции через вложенный таймер
function timerIntimer() {
  let timerId1 = setTimeout(function tick() {
    console.log('tick-tuck');
    timerId1 = setTimeout(tick, 2000); // (*)
  }, 2000); // Запускает функцию tick() через 2 сек, внутренний таймер ссылается на собственную функцию (рекурсия) с интервалом 2 сек

  setTimeout(() => {
    clearInterval(timerId1); // clearInterval останавливает timerId1, прекращает цикл повторений
    console.log('stop tick-tuck');
  }, 12100);
}
timerIntimer();

// setTimeout() не задерживает выполнение остального кода, функция в таймере выполняется "отдельно", на основе задержки, указанной в функции
function tempTimer() {
  setTimeout(() => {
    console.log('Этот');
    console.log('текст');
    console.log('будет');
    console.log('выведен');
    console.log('позже (хотя функция вызвана раньше)');
  }, 1000);

  console.log('...');
}

console.log('Привет');
tempTimer();

// !Заимствование метода join для объединения аргументов в одну строку
function hash(...args) {
  console.log(typeof arguments);
  console.log(args);
  console.log([].join.call(arguments, '_'));
  console.log([].join.call(arguments, ',')); // "," установлена по умолчанию
  console.log(args.join(','));
}

hash(1, 2, 5);

// !bind
// Вызов mul.bind(null, 2) создаёт новую функцию, которая передаёт вызов mul переменной, фиксируя null как контекст, и 2 – как первый аргумент. Следующие аргументы передаются при вызове непосредственно double
// В данном случае мы на самом деле не используем this. Но для bind это обязательный параметр, так что мы должны передать туда что-нибудь вроде null или this, который будет ссылаться на глобальный объект (window)

function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

console.log(double(3)); // = mul(2, 3) = 6
console.log(double(4)); // = mul(2, 4) = 8
console.log(double(5)); // = mul(2, 5) = 10

// !Стрелочные функции, this
// Когда внутри стрелочной функции обращаются к this, то его значение берётся извне

let user9 = {
  firstName: 'Ilya',
  sayHi() {
    let arrow = () => console.log(this.firstName); // this ссылается на user9
    arrow();
  },
};

let user10 = {
  firstName: 'Vasya',
  sayHi() {
    let arrow = function () {
      return console.log(this.firstName);
    };
    arrow(); // Т.к. используется обычная нестрелочная функция, то this ссылается на arrow или на undefined если функция задана через Function Declaration
  },
};
user9.sayHi(); // Ilya
// user10.sayHi(); // undefined

// Метод setTimeout в браузере имеет особенность: он устанавливает this=window для вызова функции (в Node.js this становится объектом таймера, но здесь это не имеет значения). Таким образом, для this.firstName он пытается получить window.firstName, которого не существует. В других подобных случаях this обычно просто становится undefined.

let user121 = {
  firstName: 'Вася',
  sayHi() {
    alert(`Привет, ${this.firstName}!`);
  },
};

setTimeout(user121.sayHi, 1000); // Привет, undefined!

// !Descriptor / Дескрипторы, флаги свойств
// Метод Object.getOwnPropertyDescriptor позволяет получить полную информацию о свойстве.
// writable – если true, свойство можно изменить, иначе оно только для чтения
// enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют
// configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

let user11 = {
  name: 'John',
};

let descriptor = Object.getOwnPropertyDescriptor(user11, 'name');

console.log(JSON.stringify(descriptor, null, 2));

// Object.defineProperty создает новое свойство и позволяет указать значения дескрипторов. По умолчанию все дескрипторы - false

Object.defineProperty(user11, 'surName', {
  value: 'Johnson',
  writable: true,
  enumerable: false,
});

descriptor = Object.getOwnPropertyDescriptor(user11, 'surName');
console.log(JSON.stringify(descriptor, null, 2));
console.log(Object.keys(user11)); // surName: Johnson не будет выведен, т.к. он неперичисляемый (enumerable = false)

// !get, set геттеры, сеттеры, свойства-аксессоры (accessor properties)
// Свойство-аксессор внутри объекта выглядит как обычное свойство. В этом и заключается смысл свойств-аксессоров. Мы не вызываем user.fullName как функцию (без ()), а читаем как обычное свойство: геттер выполнит всю работу за кулисами

let user12 = {
  _name: 'John',
  _surname: 'Smith',
};

Object.defineProperty(user12, 'fullName', {
  get() {
    return `${this._name} ${this._surname}`;
  },

  set(value) {
    [this._name, this._surname] = value.split(' ');
  },
});

console.log(user12.fullName); // John Smith

for (let key in user12) console.log(key); // name, surname

// Дескрипторы свойств доступа
// get – функция без аргументов, которая сработает при чтении свойства,
// set – функция, принимающая один аргумент, вызываемая при присвоении свойства,
// enumerable – то же самое, что и для свойств-данных,
// configurable – то же самое, что и для свойств-данных
// Технически, внешний код всё ещё может получить доступ к имени напрямую с помощью user._name, но существует широко известное соглашение о том, что свойства, которые начинаются с символа "_", являются внутренними, и к ним не следует обращаться из-за пределов объекта.

// !IIFE Immediately Invoked Function Expression - мгновенно вызываемые функции, аргументы передаются во второй паре скобок

(function test(...args) {
  console.log(args.join('+'));
})(1, 2, 3, 'IIFE'); // 1+2+3+IIFE

// !микро/макрозадачи, порядок выполнения кода в JS

function checkMicroTasks() {
  setTimeout(() => {
    console.log('timeout-0'); // 4
  }, 0);

  let promise = Promise.resolve();
  promise
    .then(() => console.log('then1')) // 2
    .then(() => console.log('then2')); // 3

  console.log('sync-console-log'); // 1
}
checkMicroTasks();

// !Встроенная функция eval позволяет выполнять строку кода

let code = 'console.log("This is eval feature")';
eval(code); // This is eval feature

// !Capturing groups
let teststring = '▶▼ Сладости (нажмиС меня)!';
let temp = teststring.match(/(^\S)(\S)/);
console.log(temp[0]);
console.log(temp[1]);
console.log(temp[2]);

// !RegularExpressions replace

function solution(string) {
  console.log(string.match(/([A-Z])/g));
  return string.replace(/([A-Z])/g, ' $1');
}

console.log(solution('camelCasingTestKekLol'));

function solution2(string) {
  console.log(string.match(/[a-z][A-Z]/g));
  return string.replace(/([a-z])([A-Z])/g, '$1 $2');
}

console.log(solution2('camelCasingTestKekLol'));

function incrementString1(strng) {
  console.log(strng.match(/([0-8]|\d?9+)?$/)[0]);
  return strng.replace(/([0-8]|\d?9+)?$/, (e) => (e ? +e + 1 : 1));
}

console.log(incrementString1('fo1obar00999'));

// !Подсчет количества строчек как значений в объекте

// Вариант 1
const strCount = (obj) =>
  typeof obj !== `string`
    ? Object.values(obj || {}).reduce((pre, val) => pre + strCount(val), 0)
    : 1;

// Вариант 2
function strCount1(obj) {
  let count = 0;
  for (key in obj) {
    if (typeof obj[key] == 'string') count++;
    if (typeof obj[key] == 'object') count += strCount(obj[key]);
  }
  return count;
}

console.log(
  strCount({
    one: '1',
    two: 2,
    three: false,
    four: {},
    another: '3',
    andit: ['123'],
    andyou: ['123123', 1],
    whatabout: { andone: 'and another', andtwo: 2, andthree: 'and again' },
    lastkey: [[[Array], false], 0],
  })
);

//!Switch конструкции - замена

function likes(names) {
  return {
    0: 'no one likes this',
    1: `${names[0]} likes this`,
    2: `${names[0]} and ${names[1]} like this`,
    3: `${names[0]}, ${names[1]} and ${names[2]} like this`,
    4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`,
  }[Math.min(4, names.length)];
}

console.log(likes(['Bill', 'Katie', 'Will']));

//!Рекурсия, сочетания чисел

function permutations(string) {
  if (string.length < 2) return [string];

  let result = [];

  for (let i = 0; i < string.length; i++) {
    let firstChar = string[i];
    let restChar = [...string.slice(0, i), ...string.slice(i + 1)];

    for (let evr of permutations(restChar)) {
      if (result.indexOf(firstChar + evr) == -1) {
        result.push(firstChar + evr);
      }
    }
  }
  return result;
}

console.log(permutations(''));

//
const nextSmaller = (n) => {
  let min = minify(n);
  while (--n >= min) {
    if (minify(n) === min) return n;
  }

  return -1;
};

const minify = (n) => [...`${n}`].sort().join``.replace(/^(0+)([1-9])/, '$2$1');

function mergeStrings(first, second) {
  function replacer(match, g1, g2) {
    return g1;
  }
  return (first + ' ' + second).replace(/(.*) \1/, replacer);
}

mergeStrings('abcde', 'cdefgh');

// !При копировании объекта через Object assign или spread необходимо учесть что вложенные объект все ещё будут ссылаться на 1 объект.
// !Для полного копирования необходимо использовать рекурсию

let user111 = {
  name: 'kekl',
  address: {
    street: 'ulic1',
  },
};

let user22 = { ...user111 };
user22 = Object.assign(user111);
user22.address.street = 'schmekl';

console.log(JSON.stringify(user111));
console.log(JSON.stringify(user22));

console.log(user111.address === user22.address);

function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i += 1) {
    if (n % i === 0) return false;
  }
  return true;
}
