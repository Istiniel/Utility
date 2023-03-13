function alert(...args) {
  console.log(...args);
}
// !Объект Proxy «оборачивается» вокруг другого объекта и может перехватывать разные действия с ним
// !Proxy – это особый, «экзотический», объект, у него нет собственных свойств. С пустым handler он просто перенаправляет все операции на target,
// let proxy = new Proxy(target, handler);
// target – это объект, для которого нужно сделать прокси, может быть чем угодно, включая функции,
// handler – конфигурация прокси: объект с «ловушками» («traps»): методами, которые перехватывают разные операции, например, ловушка get – для чтения свойства из target, ловушка set – для записи свойства в target и так далее

let target = {};
let proxy = new Proxy(target, {}); // пустой handler

proxy.test = 5; // записываем в прокси (1)
alert(target.test); // 5, свойство появилось в target!

alert(proxy.test); // 5, мы также можем прочитать его из прокси (2)

for (let key in proxy) alert(key); // test, итерация работает (3)

// !Proxy get
// чтобы перехватить операцию чтения, handler должен иметь метод get(target, property, receiver)
// в данном примере при отсутствии перевода в dictionary метод get() возвращается специальную строку

let dictionary = {
  Hello: 'Hola',
  Bye: 'Adiós',
};

// Принято что proxy полностью заменяет объект, в дальнейшем все изменения должны осуществляться через Proxy объект
dictionary = new Proxy(dictionary, {
  get(target, phrase) {
    // перехватываем чтение свойства в dictionary
    if (phrase in target) {
      // если перевод для фразы есть в словаре
      return target[phrase]; // возвращаем его
    } else {
      // иначе возвращаем непереведённую фразу
      return `Отсутствует в словаре: ${phrase}`;
    }
  },
});

// Запросим перевод произвольного выражения в словаре!
// В худшем случае оно не будет переведено
alert(dictionary['Hello']); // Hola
alert(dictionary['Welcome']); // Отсутствует в словаре: Welcome

// !Proxy set()
// Для изменения записи свойства в Proxy используется метод set(target, property, value, receiver)
// target – это оригинальный объект,
// property – имя свойства,
// value – значение свойства
// Для set реализация ловушки должна возвращать true в случае успешной записи свойства

let numbers = [];

numbers = new Proxy(numbers, {
  // (*)
  set(target, prop, val) {
    // для перехвата записи свойства
    if (typeof val == 'number') {
      target[prop] = val;
      return true; // Необходимо вернуть true если свойства соответствует требованиям
    } else {
      return false;
    }
  },
});

numbers.push(15); // добавилось успешно
numbers.push(23); // добавилось успешно
alert(numbers[1]); // 23

// !Proxy ownKeys(target)
// ловушка ownKeys в примере ниже, позволяет фильтровать ключи/значения объекта так, чтобы Object.keys и Object.values пропускали свойства, начинающиеся с подчёркивания _:

let userOld = {
  name: 'Вася',
  age: 30,
  _password: '***',
};

userOld = new Proxy(userOld, {
  ownKeys(target) {
    return Object.keys(target).filter((key) => !key.startsWith('_'));
  },
});

// ownKeys исключил _password
for (let key in userOld) alert(key); // name, затем: age

// аналогичный эффект для этих методов:
alert(Object.keys(userOld)); // name,age
alert(Object.values(userOld)); // Вася,30

// Пример: Proxy запрещающий чтение/изменение свойства которые начинаются с "_"

let user = {
  name: 'Вася',
  _password: '***',
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error('Отказано в доступе');
    } else {
      let value = target[prop];
      return typeof value === 'function' ? value.bind(target) : value; // value.bind(target) позволяет сохранить контекст при вызове функции
    }
  },
  set(target, prop, val) {
    // перехватываем запись свойства
    if (prop.startsWith('_')) {
      throw new Error('Отказано в доступе');
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) {
    // перехватываем удаление свойства
    if (prop.startsWith('_')) {
      throw new Error('Отказано в доступе');
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) {
    // перехватываем попытку итерации
    return Object.keys(target).filter((key) => !key.startsWith('_'));
  },
});

// "get" не позволяет прочитать _password
try {
  alert(user._password); // Error: Отказано в доступе
} catch (e) {
  alert(e.message);
}

// "set" не позволяет записать _password
try {
  user._password = 'test'; // Error: Отказано в доступе
} catch (e) {
  alert(e.message);
}

// "deleteProperty" не позволяет удалить _password
try {
  delete user._password; // Error: Отказано в доступе
} catch (e) {
  alert(e.message);
}

// "ownKeys" исключает _password из списка видимых для итерации свойств
for (let key in user) alert(key); // name

// !Proxy has(target, property)
// Ловушка has перехватывает вызовы in

let range = {
  start: 1,
  end: 10,
};

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  },
});

alert(5 in range); // true
alert(50 in range); // false
if (((100 * Math.random()) / 10).toFixed(0) in range) {
  console.log('yes');
}

// !Proxy apply(target, thisArg, args) активируется при вызове прокси как функции:
// target – это оригинальный объект (как мы помним, функция – это объект в языке JavaScript),
// thisArg – это контекст this,
// args – список аргументов

function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    },
  });
}

function sayHi(user) {
  alert(`Привет, ${user}!`);
}

sayHi = delay(sayHi, 3000);
alert(sayHi.length); // 1 (*) прокси перенаправляет чтение свойства length на исходную функцию
sayHi('Вася'); // Привет, Вася! (через 3 секунды)

// !Reflect - встроенный объект JS, открывающий доступ к скрытым параметрам ([[get]], [[set]] и др.), упрощает использование proxy, позволяет контролировать исходный объект в Proxy

// obj[prop]	       -->  Reflect.get(obj, prop)	          --> [[Get]]
// obj[prop] = value -->  Reflect.set(obj, prop, value)    	--> [[Set]]
// delete obj[prop]	 -->  Reflect.deleteProperty(obj, prop)	--> [[Delete]]
// new F(value)	     -->  Reflect.construct(F, value)	      --> [[Construct]]

let user2 = {
  name: 'Вася',
};

user2 = new Proxy(user2, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop} = ${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  },
});

let name = user2.name; // выводит "GET name"
user2.name = 'Петя'; // выводит "SET name=Петя"

// !Reflect позволяет обращаться к геттерам/сеттерам исходного объекта сохраняя контекст
// Пример:
let user3 = {
  _name: 'Гость',
  get name() {
    return this._name;
  },
};

let userProxy = new Proxy(user3, {
  get(target, prop, receiver) {
    // receiver = admin
    return Reflect.get(target, prop, receiver);
    // можно переписать как Reflect.get(...arguments)
    // receiver по умолчанию - исходный объект (target), необходим для сохранения контекста
  },
});

let admin = {
  __proto__: userProxy,
  _name: 'Админ',
};

alert(admin.name); // Админ

// !Proxy, ограничения
// некоторые методы встроенных объектов js Map, Set, Date, Promise, приватные поля (#), недоступны через Proxy, т.к. данные методы не используют [[set]], [[get]], которыми фигурирует Proxy
let map = new Map();

let proxy1 = new Proxy(map, {});

// proxy1.set('test', 1); - будет ошибка, метод объекта Map - set недоступен для Proxy

// !Пример использования Proxy (добавление обработчика при изменений свойств объекта)

let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Создадим хранилище обработчиков
  target[handlers] = [];

  // положим туда функции-обработчики для вызовов в будущем
  target.observe = function (handler) {
    this[handlers].push(handler);
  };

  // 2. Создадим прокси для реакции на изменения
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // перенаправим операцию к оригинальному объекту
      if (success) {
        // если не произошло ошибки при записи свойства
        // вызовем обработчики
        target[handlers].forEach((handler) => handler(property, value));
      }
      return success;
    },
  });
}

let userRandom1 = {};

userRandom1 = makeObservable(userRandom1);

userRandom1.observe((key, value) => {
  alert(`SET ${key} = ${value}`);
});

userRandom1.name = 'John';
