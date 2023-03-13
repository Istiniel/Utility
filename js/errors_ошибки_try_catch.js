// !Конструкция try..catch, которая позволяет «ловить» ошибки и вместо "выхода" из компиляции делать что-то более осмысленное
// Когда возникает ошибка, JavaScript генерирует объект, содержащий её детали. Затем этот объект передаётся как аргумент в блок catch

try {
  lalala; // код с возможной ошибкой, не задан тип переменной lalala
} catch (err) {
  // err !!объект!! ошибки, можно использовать другое название
  console.log(err.name); // обработка ошибки
  console.log(err.message);
  console.log(err.stack);
}
// Если в try {} нет ошибок, то блок catch(err) игнорируется, иначе
// try..catch работает синхронно с остальным кодом (одновременно)

// !Throw генерирует ошибку

// Создание объекта ошибки
let error = new Error(' Ого, ошибка! o_O');

console.log(error.name); // Error
console.log(error.message); //  Ого, ошибка! o_O

// !Проброс необходим для обработки непредвиденных ошибок, в таком случае ошибка передается в блок if () {...} else {...}. Например, проверяется наличие свойства name в объекте, но из-за неожиданной синтаксической ошибки (отсутствие let, const) catch может поймать "неожиданную ошибку". В этом случае и необходим проброс(выбрасивание) ошибки с использование if ... else
// Техника «проброс исключения» выглядит так:

// Блок catch получает все ошибки.
// В блоке catch(err) {...} мы анализируем объект ошибки err.
// Если мы не знаем как её обработать, тогда делаем throw err.

let json = '{ "age": 30 }'; // данные неполны
try {
  let user = JSON.parse(json);
  if (!user.name) {
    throw new SyntaxError('Данные неполны: нет имени');
  }
  blabla(); // неожиданная ошибка
} catch (e) {
  if (e.name == 'SyntaxError') {
    console.log('JSON Error: ' + e.message);
  } else {
    throw e; // проброс исключения, выбрасывает ошибки, которые не прошли фильтрацию в if()
  }
} finally {
  console.log('Обработка ошибок завершена успешно!');
}

// !Finally. Если данная секция есть, то она выполняется в любом случае:
// - после try, если не было ошибок,
// - после catch, если ошибки были
// - finally выполнится даже если в блоках try/catch есть return

// !Расширеные класса Error, создание собственных классов ошибок/исключений
// Краткое описание встроенного класса Error
// class Error {
//   constructor(message) {
//     this.message = message;
//     this.name = "Error"; // (разные имена для разных встроенных классов ошибок)
//     this.stack = <стек вызовов>; // нестандартное свойство, но обычно поддерживается
//   }
// }

// !Пример создания собственного класса ошибок для подтверждения данных (validation). "Обертывающий" класс исключений

class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends ReadError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super('Нет свойства: ' + property);
    this.property = property;
  }
}

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError('age');
  }
  if (!user.name) {
    throw new PropertyRequiredError('name');
  }
  return user;
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError('Синтаксическая ошибка', err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError('Ошибка валидации', err);
    } else {
      throw err;
    }
  }
}

// Обработка ошибок Пример 1:
try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
    console.log('Исходная ошибка: ' + e.cause);
    console.log(e);
  } else {
    throw e;
  }
}

// Обработка ошибок Пример 2:
try {
  readUser('{"name": "Johnson"}');
} catch (e) {
  if (e instanceof ReadError) {
    console.log('Исходная ошибка: ' + e.cause);
    console.log(e);
  } else {
    throw e;
  }
}
