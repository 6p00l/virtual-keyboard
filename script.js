const input = document.getElementById("input_main");

const keysEN = [
  { "`": "Backquote" },
  { 1: "Digit1" },
  { 2: "Digit2" },
  { 3: "Digit3" },
  { 4: "Digit4" },
  { 5: "Digit5" },
  { 6: "Digit6" },
  { 7: "Digit7" },
  { 8: "Digit8" },
  { 9: "Digit9" },
  { 0: "Digit0" },
  { "-": "Minus" },
  { "=": "Equal" },
  { Backspace: "Backspace" },
  { Tab: "Tab" },
  { q: "KeyQ" },
  { w: "KeyW" },
  { e: "KeyE" },
  { r: "KeyR" },
  { t: "KeyT" },
  { y: "KeyY" },
  { u: "KeyU" },
  { i: "KeyI" },
  { o: "KeyO" },
  { p: "KeyP" },
  { "[": "BracketLeft" },
  { "]": "BracketRight" },
  { "\\": "Backslash" },
  { Delete: "Delete" },
  { CapsLock: "CapsLock" },
  { a: "KeyA" },
  { s: "KeyS" },
  { d: "KeyD" },
  { f: "KeyF" },
  { g: "KeyG" },
  { h: "KeyH" },
  { j: "KeyJ" },
  { k: "KeyK" },
  { l: "KeyL" },
  { ";": "Semicolon" },
  { "'": "Quote" },
  { Enter: "Enter" },
  { Shift: "ShiftLeft" },
  { z: "KeyZ" },
  { x: "KeyX" },
  { c: "KeyC" },
  { v: "KeyV" },
  { b: "KeyB" },
  { n: "KeyN" },
  { m: "KeyM" },
  { ",": "Comma" },
  { ".": "Period" },
  { "/": "Slash" },
  { Shift: "ShiftRight" },
  { ArrowUp: "ArrowUp" },
  { Control: "ControlLeft" },
  { Alt: "AltLeft" },
  { " ": "Space" },
  { Alt: "AltRight" },
  { Control: "ControlRight" },
  { ArrowLeft: "ArrowLeft" },
  { ArrowRight: "ArrowRight" },
  { ArrowDown: "ArrowDown" },
];

const keysRU = [
  { ё: "Backquote" },
  { 1: "Digit1" },
  { 2: "Digit2" },
  { 3: "Digit3" },
  { 4: "Digit4" },
  { 5: "Digit5" },
  { 6: "Digit6" },
  { 7: "Digit7" },
  { 8: "Digit8" },
  { 9: "Digit9" },
  { 0: "Digit0" },
  { "-": "Minus" },
  { "=": "Equal" },
  { Backspace: "Backspace" },
  { Tab: "Tab" },
  { й: "KeyQ" },
  { ц: "KeyW" },
  { у: "KeyE" },
  { к: "KeyR" },
  { е: "KeyT" },
  { н: "KeyY" },
  { г: "KeyU" },
  { ш: "KeyI" },
  { щ: "KeyO" },
  { з: "KeyP" },
  { х: "BracketLeft" },
  { ъ: "BracketRight" },
  { "\\": "Backslash" },
  { Delete: "Delete" },
  { CapsLock: "CapsLock" },
  { Ф: "KeyA" },
  { Ы: "KeyS" },
  { В: "KeyD" },
  { А: "KeyF" },
  { П: "KeyG" },
  { Р: "KeyH" },
  { О: "KeyJ" },
  { Л: "KeyK" },
  { Д: "KeyL" },
  { Ж: "Semicolon" },
  { Э: "Quote" },
  { Enter: "Enter" },
  { Shift: "ShiftLeft" },
  { Я: "KeyZ" },
  { Ч: "KeyX" },
  { С: "KeyC" },
  { М: "KeyV" },
  { И: "KeyB" },
  { Т: "KeyN" },
  { Ь: "KeyM" },
  { Б: "Comma" },
  { Ю: "Period" },
  { ".": "Slash" },
  { Shift: "ShiftRight" },
  { ArrowUp: "ArrowUp" },
  { Control: "ControlLeft" },
  { Meta: "MetaLeft" },
  { Alt: "AltLeft" },
  { " ": "Space" },
  { Control: "ControlLeft" },
  { Alt: "AltRight" },
  { Meta: "MetaRight" },
  { Control: "ControlRight" },
  { ArrowLeft: "ArrowLeft" },
  { ArrowRight: "ArrowRight" },
  { ArrowDown: "ArrowDown" },
];

const wrapper = document.createElement("div");
wrapper.className = "wrapper";
document.body.appendChild(wrapper);

const Main = {
  caps: false,
  alt: false,
  shift: false,

  layout(lang, letterCase) {
    for (let i = 0; i < lang.length; i++) {
      const container = document.createElement("div");
      container.className = "button";
      container.addEventListener("focus", () => {
        this.keyEvents();
      });

      let key;
      let code;

      for (const k in lang[i]) {
        if (k) {
          key = k;
          code = lang[i][k];
          container.className = `button ${code}`;
        }
      }

      const keyDiv = `<div class='key ${code} ${key}' >${key}</div>`;
      container.innerHTML = keyDiv;
      wrapper.appendChild(container);

      this.keyEvents(key, container);
      this.realEvents();
    }
  },
  clone(e) {
    if (e.key == "Tab") {
      e.preventDefault();
      input.value += "\t";
      return;
    }
    const activeKey = document.querySelector(`.${e.code}`);
    activeKey.parentNode.classList.toggle("active");
  },

  keyEvents(key, div) {
    switch (key) {
      case "CapsLock":
        div.addEventListener("click", () => {
          this.caps = !this.caps;
          console.log(this.caps);

          input.focus();
        });
        break;
      case "Backspace":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;

          input.value = input.value.slice(0, pos - 1) + input.value.slice(pos);
          input.selectionStart = pos - 1;
          input.focus();
        });
        break;

      case "Tab":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;
          input.value = `${input.value.slice(0, pos)}\t${input.value.slice(
            pos
          )}`;
          input.selectionStart = pos + 1;
          input.focus();
        });
        break;
      case "Delete":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;
          input.value = input.value.slice(0, pos) + input.value.slice(pos + 1);
          input.selectionStart = pos;
          input.focus();
        });
        break;
      case "Alt":
        div.addEventListener("click", () => {
          if (this.shift) {
            wrapper.innerHTML = "";

            this.layout(keysRU);
            this.shift = false;
            this.alt = false;
          }
          this.alt = !this.alt;
          div.classList.toggle("active");
          input.focus();
        });
        break;
      case "Shift":
        div.addEventListener("click", () => {
          if (this.alt) {
            wrapper.innerHTML = "";
            this.layout(keysRU);
            this.shift = false;
            this.alt = false;
          }
          div.classList.toggle("active");
          this.shift = !this.shift;
          input.focus();
        });

        break;
      case "Enter":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;

          input.value = `${input.value.slice(0, pos)}\n${input.value.slice(
            pos
          )}`;
          input.selectionStart = pos + 1;
          input.focus();
        });
        break;
      case "ArrowLeft":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;

          input.selectionStart = pos - 1;
          input.focus();
        });
        break;
      case "ArrowRight":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;

          input.selectionStart = pos + 1;
          input.focus();
        });
        break;
      case "ArrowUp":
        div.addEventListener("click", () => {
          input.focus();
          const test = new KeyboardEvent("keydown", { code: "ArrowUp" });
          input.dispatchEvent(test);
          input.focus();
        });
        break;
      case "ArrowDown":
        break;

      case "Control":
        break;
      default:
        div.addEventListener("click", () => {
          let letter = key;
          if ((this.caps && !this.shift) || (this.shift && !this.caps)) {
            letter = letter.toUpperCase();
          }
          const pos = input.selectionStart;
          input.value =
            input.value.slice(0, pos) + letter + input.value.slice(pos);
          input.selectionStart = pos + 1;
          input.focus();
          div.classList.toggle("active");
          setTimeout(() => div.classList.toggle("active"), 200);
        });
        break;
    }
  },
  realEvents() {
    input.addEventListener("keydown", (e) => this.clone(e));
    input.addEventListener("keyup", (e) => this.clone(e));
  },
};

window.addEventListener("DOMContentLoaded", () => {
  Main.layout(keysEN, Main.caps);
  Main.shiftKey = document.querySelector(".Shift").parentNode;
  Main.altKey = document.querySelector(".Alt").parentNode;
});
