// // !this - текущий объект, вызывающий функцию, доступный в текущем пространстве переменных
function alert(...args) {
  console.log(...args);
}

// function delay(f, ms) {
//   // возвращает обёртку, которая вызывает функцию f через таймаут
//   return function () {
//     // (*)

//     console.log(this);
//     setTimeout(() => f.apply(this, arguments), ms);
//   };
// }

// let tempUser = {
//   name: 'kek',
// };

// function sayHi(arg1) {
//   console.log('Hi! ' + this.name + ' ' + arg1);
// }

// tempUser.sayHi = delay(sayHi, 3000); // tempUser. передает контекст this
// tempUser.sayHi('randomString');

// sayHi = delay(sayHi, 3500); // Hi! undefined
// sayHi('randomString');

// // Метод setTimeout в браузере имеет особенность: он устанавливает this=window для вызова функции (в Node.js this становится объектом таймера, но здесь это не имеет значения). Таким образом, для this.firstName он пытается получить window.firstName, которого не существует. В других подобных случаях this обычно просто становится undefined.

let user121 = {
  firstName: 'Вася',
  sayHi() {
    alert(`Привет, ${this.firstName}!`);
  },
};

setTimeout(user121.sayHi, 5000); // Привет, undefined!
