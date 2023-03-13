// !Prototype прототипы, наследование
// У всех объектов имеется скрытое свойство [[Prototype]], которое либо равно null, либо ссылается на специальный объект prototype. JS ищет свойства и функции в прототипе, если не может найти их непосредственно в объекте

// Прототип – это объект, располагающийся по ссылке .prototype. У каждой функции-конструктора по умолчанию есть свойство-ссылка prototype, указывающая на объект прототип
// !Свойство ".prototype" является особым, только когда оно назначено функции-конструктору, которая вызывается оператором new. Если назначить обычному объекту (не функции-конструктору) свойство prototype, то создается обычное свойство

function test() {
  console.log('Hello!');
}
test.prototype = {
  commonObjProreprty: '1',
};
console.log(test.prototype);

// Свойство __proto__ — исторически обусловленный геттер/сеттер для [[Prototype]]

// !Прямое указание ссылки на прототип с помощью __proto__
let animal = {
  eats: true,
  walk() {
    console.log('Animal walk');
  },
};

let rabbit = {
  jumps: true,
  __proto__: animal,
};
// walk взят из прототипа

rabbit.walk(); // Animal walk
//
//
// Essence ---> Animal ---> Bird
function Essence() {}
Essence.prototype = {
  constructor: Essence,
  state: 'exists',
};

/* прототип по умолчанию
Essence.prototype = { constructor: Essence };
*/
// !! В частности, если мы заменим прототип по умолчанию на другой объект, то свойства "constructor" в нём не будет!!!!!

function Animal() {}

Animal.prototype = Object.create(Essence.prototype);
Animal.prototype.constructor = Animal;

Animal.prototype.describe = function () {
  console.log('My name is ' + this.name);
};

let dog = new Animal();

function Bird(name) {
  this.name = name;
}
Bird.prototype = Object.create(Animal.prototype);
// Создается объект Bird.prototype и ему устанавливается прототип Animal.prototype (прототипом Bird.prototype является Animal.prototype)
// Object.create(obj) creates a new object, and sets obj as the new object's prototype

// Свойство-конструктор constructor
Bird.prototype.constructor = Bird; // Указание параметра constructor для объекта Bird, позволяет проверить функцию-конструктор, создавший экземпляр объекта

let duck = new Bird('BigusBobus');
console.log(Object.getPrototypeOf(dog));
console.log(dog.__proto__);
console.log(Bird.prototype);
console.log(Object.getPrototypeOf(Bird.prototype));
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Bird.prototype)));
console.log(Object.getPrototypeOf(duck));
console.log(duck.__proto__);
//
console.log(duck.constructor === Bird); // true
duck.describe(); // My name is BigusBobus
console.log(duck.state);

// Свойство constructor объекта может использоваться для создания нового объекта на его основе (constructor ссылается на функцию конструктор)

function Rabbit1(name) {
  this.name = name;
  console.log(name);
}

let rabbit1 = new Rabbit1('White Rabbit');

let rabbit2 = new rabbit1.constructor('Black Rabbit');

// Современные методы работы с __proto__

// Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]], указанным как proto, и необязательными дескрипторами свойств descriptors
// Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj
// Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto
// !Свойство ".prototype" является особым, только когда оно назначено функции-конструктору, которая вызывается оператором new

// создание объекта с прототипом null позволяет использовать __proto__ в качестве ключа для объекта
let dictionary = Object.create(null, {
  toString: {
    // определяем свойство toString
    value() {
      // значение -- это функция
      return Object.keys(this).join();
    },
  },
});

// добавляем немного данных
dictionary.apple = 'Apple';
dictionary.__proto__ = 'test'; // здесь __proto__ -- это обычный ключ

// только apple и __proto__ выведены в цикле
for (let key in dictionary) {
  console.log(key); // "apple", затем "__proto__"
}

// ваш метод toString в действии
console.log(dictionary); // "apple,__proto__"

// !Классы
// Отдельное свойства классов (например: userType = "a1") не устанавливаются в User.prototype, но передаются объекту при создании

class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(this.name);
  }
}
let user = new User('Иван');
user.sayHi();
// Когда вызывается new User("Иван"):
// Создаётся новый объект,
// Сonstructor запускается с заданным аргументом и сохраняет его в this.name,

console.log(typeof User); // В общем смысле класс - разновидность функции. Код функции берётся из конструктора. Все остальные методы и свойства сохраняются в User.prototype
// !В результате объявления Class User {...} создается прототип User.prototype = {...}, который содержит все методы и свойства указанные в классе

console.log(User.prototype); // Ссылка на прототип через конструктор User
console.log(Object.getPrototypeOf(user)); // Ссылка на прототип через метод Object
console.log(user.__proto__); // Ссылка на прототип непосредственно через объект класса с использованием __proto__ (get, set для ссылки на прототип)

// !Class expression - выражение классов через переменные

let Admin = class {
  constructor(name) {
    this.name = name; // вызывает сеттер
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      console.log('Имя слишком короткое');
      return;
    }
    this._name = value;
  }
};

let user1 = new Admin("San'ok");
console.log(user1.name); // San'ok
console.log(Object.getPrototypeOf(user1));
let user2 = new Admin('Sanik');
user2.name = 'San'; // Имя слишком короткое

// !Наследование классов
class MammalsAnimal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} бежит со скоростью ${this.speed}.`);
  }
  stop() {
    // MammalsAnimal.stop.[[HomeObject]] ==  MammalsAnimal (объяснение работы super)
    this.speed = 0;
    console.log(`${this.name} стоит неподвижно.`);
  }
}
let tiger = new MammalsAnimal('Тигр');

class Rabbit extends MammalsAnimal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }

  hide() {
    console.log(`${this.name} прячется!`);
  }
  stop() {
    // Rabbit.stop.[[HomeObject]] ==  Rabbit (объяснение работы super)
    super.stop(); // вызываем родительский метод stop
    this.hide(); // и затем hide
  }
}

// Внутри ключевое слово extends работает по механике прототипов. Оно устанавливает Rabbit.prototype.[[Prototype]] в MammalsAnimal.prototype. Таким образом, если метода не оказалось в Rabbit.prototype, JavaScript берет его из Animal.prototype.

let whiteRabbit = new Rabbit('Белый кролик', 11);

whiteRabbit.run(5); // Белый кролик бежит со скоростью 5.
whiteRabbit.stop(); // Белый кролик прячется!
console.log(whiteRabbit.earLength); // 10

// super.method(...) вызывает родительский метод.
// super(...) для вызова родительского конструктора (работает только внутри нашего конструктора)
// У стрелочных функций нет super, например: в setTimeout(() => super.stop(), 1000) нет ошибки, т.к. у стрелочных функций нет своего контекста (this), this и super относятся к объекту вызвавшему super.stop() извне
// например: setTimeout(function() { super.stop() }, 1000) вызывает ошибку, т.к. function() ссылается на глобальный объект, нет родительского объекта
(function () {
  console.log('check: ' + this);
})(); // вызов функции без указания контекста, this относится к глобальному объекту window

// !Если класс расширяет другой класс и не имеет конструктора, то используется конструктор родительского объекта (super). Конструкторы в наследуемых классах должны обязательно вызывать super(...), и (!) делать это перед использованием this..
// Когда выполняется обычный конструктор, он создаёт пустой объект и присваивает его this
// Когда запускается конструктор унаследованного класса, он этого не делает. Вместо этого он ждёт, что это сделает конструктор родительского класса

// Когда функция объявлена как метод внутри класса или объекта, её свойство [[HomeObject]] становится равно этому объекту, что позволяет запоминать метод какого объекта необходимо вызывать при наследовании методов (необходимо для корректной работы "super")
// [[HomeObject]] есть только у функций, методов объявленных явно method(). Свойства-функции по типу method: function() не обладают [[HomeObject]]
// Благодаря [[HomeObject]] отсутствует необходимость явно указывать контекст при вызове родительского метода, движок JS понимает какой именно метод необходимо вызывать

// !Статические свойства и методы
//
//
class User5 {
  static role = 'admin';
  static staticMethod() {
    console.log(this === User5);
  }
}

User5.staticMethod(); // true

// Статические методы и свойства по существу принадлежат к самому классу/конструктору (User5)
// Равнозначная запись:
User5.role = 'admin';
User.staticMethod = function () {
  console.log(this === User);
};

// Статические методы недоступны для отдельных объектов
let randomUser = new User5();
// randomUser.staticMethod() - TypeError: randomUser.staticMethod is not a function

// !Статические свойства и методы наследуются
class Animals {}
class Rabbits extends Animals {}
// extends создаёт две ссылки на прототип:
// -- Функция Rabbits прототипно наследует от функции Animals (для статических методов/свойств)
// -- Rabbits.prototype прототипно наследует от Animals.prototype (для методов/свойств объектов класса)

// для статических методов, свойств
console.log(Rabbits.__proto__ === Animals); // true

// для обычных методов, свойств
console.log(Rabbits.prototype.__proto__ === Animals.prototype); // true

// Статические методы и свойства !!встроенных!! классов не наследуется, например Date не наследует метод keys() от Object

// !Инакпсуляция, защищенные и приватные поля
//
//
// Защищенные свойства. Для обозначения защищенных свойств классов принято условно обозначение с нижним подчеркиванием _exampleProperty. Существует негласное соглашение не ссылаться на данные свойства без применения геттеров/сеттеров, т.е. не ссылаться на защищенные свойства напрямую.
// Защищённые поля наследуются
// Пример, _waterAmount и _power защищённые свойства, которые не предполагают прямого изменения их значений, контроль осуществляется только через методы get, set
// Если нужно установить свойство только для чтения, например _power, необходимо указывать только get (геттер), без set (сеттера)

class CoffeeMachine {
  constructor(power) {
    this._power = power;
  }

  _waterAmount = 0;
  #waterLimit = 200;

  #checkWater(value) {
    if (value < 0) throw new Error('Отрицательный уровень воды');
    if (value > this.#waterLimit) {
      throw new Error('Слишком много воды');
    } else {
      console.log('Уровень воды: ' + value);
    }
  }

  set waterAmount(value) {
    if (value < 0) throw new Error('Отрицательное количество воды');
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  get powerAmount() {
    return this._power;
  }
}
// создаём новую кофеварку
let coffeeMachine = new CoffeeMachine(100);

// получаем значение мощности (Метод get). Установить мощность невозможно, отсутствует метод set, свойство только для чтения
console.log(coffeeMachine.powerAmount);

// устанавливаем количество воды
coffeeMachine.waterAmount = 10;
// coffeeMachine.waterAmount = -10 - Error: Отрицательное количество воды

// !Приватные поля/методы отмечаются с помощью "#", например #name. Обращение к приватным свойства разрешено только внутри класса где они определены

class Person {
  #name;
  #age;
  constructor(name, age) {
    this.#name = this.#checkName(name);
    this.#age = age;
  }
  #checkName(name) {
    if (name !== 'admin') return name;
  }
  setAge(age) {
    if (age > 0 && age < 110) this.#age = age;
  }
  print() {
    console.log(`Name: ${this.#name}  Age: ${this.#age}`);
  }
}
const tom = new Person('Tom', 37);
// tom.#name = "Sam";   // ! Ошибка - нельзя обратиться к приватному полю
// tom.#age = -45;      // ! Ошибка - нельзя обратиться к приватному полю
tom.print(); // Name: Tom  Age: 37
tom.setAge(22);
tom.print(); // Name: Tom  Age: 22
const bob = new Person('admin', 41);
bob.print(); // Name: Undefined  Age 41
//let personName = bob.#checkName("admin"); // ! Ошибка - нельзя обратится к приватному методу

// !Расширение встроенных классов
// Производные объекты ссылаются на тот же конструктор, что и исходные объекты. Но порой возникает необходимость в определении другого конструктора (возможно, одного из стандартных классов), для этого используется  @@species (символ Symbol.species])

Array[Symbol.species] === Array; // true
Map[Symbol.species] === Map; // true
RegExp[Symbol.species] === RegExp; // true

class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  static get [Symbol.species]() {
    return Array; // Производные объекты будут созданы с помощью конструктора Array, методы класса PowerArray не будут работать к производному объекту (isEmpty() больше не доступен)
  }
}

// Статический геттер static get [Symbol.species]() указывает, что конструктором производных объектов должен быть конструктор Array. Позже при фильтрации элементов массива array.filter() возвращает Array

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

// filter создаст новый массив, используя arr.constructor[Symbol.species] как конструктор. Без задания геттера [Symbol.species] конструктор совпадает с классом исходного объекта
let filteredArr = arr.filter((item) => item >= 10);
console.log(filteredArr instanceof PowerArray);
// filteredArr относится не к PowerArray, а к Array. isEmpty() больше не доступна для filteredArray
// console.log(filteredArr.isEmpty()) - Error: filteredArr.isEmpty is not a function

// !instanceof позволяет проверять является ли объект "образцом/экземпляром" класса
// Если внутри класса определён статически метод Symbol.hasInstance, то instanceof сперва вызывает его и ожидает true или false как результат

// проверка instanceof будет полагать, что всё со свойством model принадлежит к классу Car
class Car {
  static [Symbol.hasInstance](obj) {
    if (obj.model) return true;
  }
}

let obj = { model: 'BMW' };
console.log(obj instanceof Car); // true: вызван Car[Symbol.hasInstance](obj)

// Большая часть классов не имеет метода Symbol.hasInstance, в этом случае используется стандартная логика: проверяется, равен ли Class.prototype одному из прототипов в прототипной цепочке obj

obj.__proto__ === Car.prototype;
obj.__proto__.__proto__ === Car.prototype; // и т.д.

// если какой-то из ответов true, instanceof возвращает true, иначе false

// !toString() может использоваться в роли instanceof
console.log(Object.prototype.toString.call(1)); // [object Number]
console.log(Object.prototype.toString.call([2])); // [object Array]
console.log(Object.prototype.toString.call(null)); // [object Null]

// Второй тэг результата вызова toString можно настраивать, используя специальное свойство объекта Symbol.toStringTag.

let userRandom = {
  [Symbol.toStringTag]: 'A random user',
};
console.log(Object.prototype.toString.call(userRandom)); // [object A random user]
console.log({}.toString.call(userRandom)); // [object A random user]

// !Примеси, mixins - в JS это объект, содержимое которого назначают прототипу целевого объекта для возможности использования сторонних свойств/методов

// примесь (Mixin)
let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};

let sayHiMixin = {
  __proto__: sayMixin,
  sayHi() {
    super.say(`Привет, ${this.name}`);
  },
  sayBye() {
    super.say(`Пока, ${this.name}`);
  },
};
console.log(Object.getPrototypeOf(sayHiMixin));

class UserSelect {
  constructor(name) {
    this.name = name;
  }
}

// копируем методы
Object.assign(UserSelect.prototype, sayHiMixin); // Object.assign(User.prototype, seyHiMixin) назначает свойства и функции sayHiMixin объекту-прототипу UserSelect

new UserSelect('Вася').sayHi(); // Привет, Вася!
// при вызове sayHi объектом UserSelect "super" ссылается на sayMixin, т.к. во время создания метода sayHi JS запомнил метку [[HomeObject]], ссылавшуюся на sayMixin
