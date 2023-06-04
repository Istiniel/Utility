class Button {
  constructor(name) {
    this.name = name;
    this.lang = 'en';
    this.html = null;
  }

  build() {
    if (!this.html) {
      const container = document.createElement('div');
      container.innerHTML = this.name + this.lang;
      this.html = container;
      return container;
    } else {
      return this.html;
    }
  }

  changeLang() {
    if (this.lang === 'en') {
      this.lang = 'ru';
      this.html.innerHTML = this.name + this.lang;
    } else {
      this.lang = 'en';
      this.html.innerHTML = this.name + this.lang;
    }
  }
}

class Informer {
  constructor() {
    this.buttons = [];
  }

  register(button) {
    this.buttons.push(button);
  }

  changeLang() {
    this.buttons.forEach((button) => button.changeLang());
  }
}

const button1 = new Button('alt');
const button2 = new Button('ctrl');
const button3 = new Button('shift');

document.body.append(button1.build(), button2.build(), button3.build());

const informer = new Informer();
informer.register(button1);
informer.register(button2);
informer.register(button3);

const changeLangButton = document.createElement('button');
changeLangButton.innerHTML = 'change language';
document.body.append(changeLangButton);

changeLangButton.addEventListener('click', () => {
  informer.changeLang();
});
