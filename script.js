const keysEN = [
  ['`', 'Backquote'],
  ['1', 'Digit1'],
  ['2', 'Digit2'],
  ['3', 'Digit3'],
  ['4', 'Digit4'],
  ['5', 'Digit5'],
  ['6', 'Digit6'],
  ['7', 'Digit7'],
  ['8', 'Digit8'],
  ['9', 'Digit9'],
  ['0', 'Digit0'],
  ['-', 'Minus'],
  ['=', 'Equal'],
  ['Backspace', 'Backspace'],
  ['Tab', 'Tab'],
  ['q', 'KeyQ'],
  ['w', 'KeyW'],
  ['e', 'KeyE'],
  ['r', 'KeyR'],
  ['t', 'KeyT'],
  ['y', 'KeyY'],
  ['u', 'KeyU'],
  ['i', 'KeyI'],
  ['o', 'KeyO'],
  ['p', 'KeyP'],
  ['[', 'BracketLeft'],
  [']', 'BracketRight'],
  ['Delete', 'Delete'],
  ['CapsLock', 'CapsLock'],
  ['a', 'KeyA'],
  ['s', 'KeyS'],
  ['d', 'KeyD'],
  ['f', 'KeyF'],
  ['g', 'KeyG'],
  ['h', 'KeyH'],
  ['j', 'KeyJ'],
  ['k', 'KeyK'],
  ['l', 'KeyL'],
  [';', 'Semicolon'],
  ["'", 'Quote'],
  ['\\', 'Backslash'],
  ['Enter', 'Enter'],
  ['Shift', 'ShiftLeft'],
  ['z', 'KeyZ'],
  ['x', 'KeyX'],
  ['c', 'KeyC'],
  ['v', 'KeyV'],
  ['b', 'KeyB'],
  ['n', 'KeyN'],
  ['m', 'KeyM'],
  [',', 'Comma'],
  ['.', 'Period'],
  ['/', 'Slash'],
  ['AU', 'ArrowUp'],
  ['Shift', 'ShiftRight'],
  ['Control', 'ControlLeft'],
  ['Alt', 'AltLeft'],
  [' ', 'Space'],
  ['Alt', 'AltRight'],
  ['Control', 'ControlRight'],
  ['AL', 'ArrowLeft'],
  ['AD', 'ArrowDown'],
  ['AR', 'ArrowRight'],
];
const keysRU = [
  ['`', 'Backquote'],
  ['1', 'Digit1'],
  ['2', 'Digit2'],
  ['3', 'Digit3'],
  ['4', 'Digit4'],
  ['5', 'Digit5'],
  ['6', 'Digit6'],
  ['7', 'Digit7'],
  ['8', 'Digit8'],
  ['9', 'Digit9'],
  ['0', 'Digit0'],
  ['-', 'Minus'],
  ['=', 'Equal'],
  ['Backspace', 'Backspace'],
  ['Tab', 'Tab'],
  ['й', 'KeyQ'],
  ['ц', 'KeyW'],
  ['у', 'KeyE'],
  ['к', 'KeyR'],
  ['е', 'KeyT'],
  ['н', 'KeyY'],
  ['г', 'KeyU'],
  ['ш', 'KeyI'],
  ['щ', 'KeyO'],
  ['з', 'KeyP'],
  ['х', 'BracketLeft'],
  ['ъ', 'BracketRight'],
  ['Delete', 'Delete'],
  ['CapsLock', 'CapsLock'],
  ['ф', 'KeyA'],
  ['ы', 'KeyS'],
  ['в', 'KeyD'],
  ['а', 'KeyF'],
  ['п', 'KeyG'],
  ['р', 'KeyH'],
  ['о', 'KeyJ'],
  ['л', 'KeyK'],
  ['д', 'KeyL'],
  ['ж', 'Semicolon'],
  ['э', 'Quote'],
  ['\\', 'Backslash'],
  ['Enter', 'Enter'],
  ['Shift', 'ShiftLeft'],
  ['я', 'KeyZ'],
  ['ч', 'KeyX'],
  ['с', 'KeyC'],
  ['м', 'KeyV'],
  ['и', 'KeyB'],
  ['т', 'KeyN'],
  ['ь', 'KeyM'],
  ['б', 'Comma'],
  ['ю', 'Period'],
  ['.', 'Slash'],
  ['AU', 'ArrowUp'],
  ['Shift', 'ShiftRight'],
  ['Control', 'ControlLeft'],
  ['Alt', 'AltLeft'],
  [' ', 'Space'],
  ['Alt', 'AltRight'],
  ['Control', 'ControlRight'],
  ['AL', 'ArrowLeft'],
  ['AD', 'ArrowDown'],
  ['AR', 'ArrowRight'],
];

class Main {
  constructor() {
    this.wrapper = document.createElement('div');
    this.textarea = "<div className='textarea'><textarea value=''></textarea></div>";
    this.wrapper.className = 'wrapper';
    document.body.innerHTML = this.textarea;
    this.shortcut = document.createElement('div');
    this.shortcut.innerHTML = '<div\'>alt+shift</div>';
    this.shortcut.className = 'shortcut';
    document.body.appendChild(this.wrapper);
    document.body.appendChild(this.shortcut);
    this.input = document.querySelector('textarea');
  }

  caps = false;

  alt = false;

  shift = false;

  tab = false;

  layout(lang) {
    for (let i = 0; i < lang.length; i += 1) {
      const container = document.createElement('div');
      container.className = 'button';
      container.addEventListener('focus', () => {
        this.keyEvents();
      });

      const key = lang[i][0];
      const code = lang[i][1];
      container.className = `button ${code}`;

      const keyDiv = `<div class='key  ${key}' >${key}</div>`;
      container.innerHTML = keyDiv;
      this.wrapper.appendChild(container);

      this.keyEvents(key, container);
    }
    this.realEvents();
  }

  clone(e, act) {
    if (e.key === 'Tab') {
      if (!this.tab) {
        e.preventDefault();
        const pos = this.input.selectionStart;
        this.input.value = `${this.input.value.slice(
          0,
          pos,
        )}\t${this.input.value.slice(pos)}`;
        this.input.selectionStart = pos + 1;
        this.input.selectionEnd = pos + 1;

        this.tab = !this.tab;
      } else this.tab = !this.tab;
    }
    if (e.key === 'Alt') {
      e.preventDefault();
    }
    if (document.querySelector(`.${e.code}`)) {
      const activeKey = document.querySelector(`.${e.code}`);
      activeKey.classList.toggle('active');
    }
    this.input.focus();
  }

  keyEvents(key, div) {
    switch (key) {
      case 'CapsLock':
        div.addEventListener('click', () => {
          this.caps = !this.caps;
          div.classList.toggle('active');
          this.input.focus();
        });
        break;
      case 'Backspace':
        div.addEventListener('click', () => {
          const pos = this.input.selectionStart;

          this.input.value = this.input.value.slice(0, pos - 1) + this.input.value.slice(pos);
          this.input.selectionStart = pos - 1;
          this.input.selectionEnd = pos - 1;
          this.input.focus();
        });
        break;

      case 'Tab':
        div.addEventListener('click', () => {
          const pos = this.input.selectionStart;
          this.input.value = `${this.input.value.slice(
            0,
            pos,
          )}\t${this.input.value.slice(pos)}`;
          this.input.selectionStart = pos + 1;
          this.input.selectionEnd = pos + 1;
          this.input.focus();
        });
        break;
      case 'Delete':
        div.addEventListener('click', () => {
          const pos = this.input.selectionStart;
          this.input.value = this.input.value.slice(0, pos) + this.input.value.slice(pos + 1);
          this.input.selectionStart = pos;
          this.input.selectionEnd = pos;
          this.input.focus();
        });
        break;
      case 'Alt':
        div.addEventListener('click', () => {
          if (this.shift) {
            this.reLang();
          } else this.alt = !this.alt;

          div.classList.toggle('active');
          this.input.focus();
        });
        break;
      case 'Shift':
        div.addEventListener('click', () => {
          if (this.alt) {
            this.reLang();
          } else this.shift = !this.shift;

          div.classList.toggle('active');
          this.input.focus();
        });

        break;
      case 'Enter':
        div.addEventListener('click', () => {
          const pos = this.input.selectionStart;

          this.input.value = `${this.input.value.slice(
            0,
            pos,
          )}\n${this.input.value.slice(pos)}`;
          this.input.selectionStart = pos + 1;
          this.input.selectionEnd = pos + 1;
          this.input.focus();
        });
        break;
      case 'AL':
        div.addEventListener('click', () => {
          const pos = this.input.selectionStart;

          this.input.selectionStart = pos - 1;
          this.input.selectionEnd = pos - 1;
          this.input.focus();
        });
        break;
      case 'AR':
        div.addEventListener('click', () => {
          const pos = this.input.selectionStart;

          this.input.selectionStart = pos + 1;
          this.input.selectionEnd = pos + 1;
          this.input.focus();
        });
        break;
      case 'AU':
        div.addEventListener('click', () => {
          const pos = this.input.selectionStart;
          this.input.value = `${this.input.value.slice(
            0,
            pos,
          )}⮝${this.input.value.slice(pos)}`;
          this.input.selectionStart = pos + 1;
          this.input.selectionEnd = pos + 1;
          this.input.focus();
          div.classList.toggle('active');
          setTimeout(() => div.classList.toggle('active'), 200);
        });
        break;
      case 'AD':
        div.addEventListener('click', () => {
          const pos = this.input.selectionStart;
          this.input.value = `${this.input.value.slice(
            0,
            pos,
          )}⮟${this.input.value.slice(pos)}`;
          this.input.selectionStart = pos + 1;
          this.input.selectionEnd = pos + 1;
          this.input.focus();
          div.classList.toggle('active');
          setTimeout(() => div.classList.toggle('active'), 200);
        });
        break;

      case 'Control':
        div.addEventListener('click', () => {
          this.input.focus();
        });
        break;
      default:
        div.addEventListener('click', () => {
          let letter = key;
          if ((this.caps && !this.shift) || (this.shift && !this.caps)) {
            letter = letter.toUpperCase();
          }
          const pos = this.input.selectionStart;
          this.input.value = this.input.value.slice(0, pos)
            + letter
            + this.input.value.slice(pos);
          this.input.selectionStart = pos + 1;
          this.input.selectionEnd = pos + 1;
          this.input.focus();
          div.classList.toggle('active');
          setTimeout(() => div.classList.toggle('active'), 200);
        });
        break;
    }
  }

  realEvents() {
    this.input.addEventListener('keydown', (e) => this.clone(e, true));
    this.input.addEventListener('keyup', (e) => this.clone(e, false));
  }

  reLang() {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'EN');
    }
    this.wrapper.innerHTML = '';
    this.shift = false;
    this.alt = false;
    if (localStorage.getItem('lang') === 'EN') {
      this.layout(keysRU);
      localStorage.setItem('lang', 'RU');
    } else {
      this.layout(keysEN);
      localStorage.setItem('lang', 'EN');
    }
    if (this.caps === true) {
      document.querySelector('.CapsLock').classList.toggle('active');
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const test = new Main();
  const lang = localStorage.getItem('lang');
  if (lang === 'RU') {
    test.layout(keysRU);
  } else test.layout(keysEN);
});
