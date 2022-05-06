const input = document.getElementById("input_main");
function change(test) {
  inputV = test;
}

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
  { Control: "ControlLeft" },
  { Alt: "AltLeft" },
  { " ": "Space" },
  { Alt: "AltRight" },
  { Control: "ControlRight" },
  { ArrowLeft: "ArrowLeft" },
  { ArrowUp: "ArrowUp" },
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
  { Control: "ControlLeft" },
  { Meta: "MetaLeft" },
  { Alt: "AltLeft" },
  { " ": "Space" },
  { Control: "ControlLeft" },
  { AltGraph: "AltRight" },
  { Meta: "MetaRight" },
  { Control: "ControlRight" },
  { ArrowLeft: "ArrowLeft" },
  { ArrowUp: "ArrowUp" },
  { ArrowRight: "ArrowRight" },
  { ArrowDown: "ArrowDown" },
];

const wrapper = document.createElement("div");
wrapper.className = "wrapper";
document.body.appendChild(wrapper);

const Main = {
  caps: false,
  layout(lang, letterCase) {
    for (let i = 0; i < lang.length; i++) {
      const container = document.createElement("div");
      container.className = "button";

      let key;
      let code;
      for (const k in lang[i]) {
        if (letterCase === true) {
          key = k.toUpperCase();
        } else key = k;
        code = lang[i][k];
      }
      const keyDiv = `<div class='key ${code}' >${key}</div>`;
      container.innerHTML = keyDiv;
      wrapper.appendChild(container);

      this.keyEvents(key, container);
      this.realEvents();
    }
  },
  clone(e) {
    let activeKey = document.querySelector(`.${e}`);
    activeKey.parentNode.classList.toggle("active");
  },

  keyEvents(key, div) {
    switch (key) {
      case "CapsLock":
        div.addEventListener("click", () => {
          this.caps = !this.caps;
          console.log(this.caps);
          wrapper.innerHTML = "";
          this.layout(keysEN, this.caps);
        });
        break;
      case "Backspace":
      case "Tab":
      case "Delete":
      case "Alt":
      case "Shift":
      case "Enter":
      case "ArrowLeft":
      case "ArrowRight":
      case "AroowUp":
      case "ArrowDown":

      default:
        div.addEventListener("click", () => {
          console.log(123);
          input.value += key;
        });
        break;
    }
  },
  realEvents() {
    input.addEventListener("keydown", (e) => this.clone(e.code));
    input.addEventListener("keyup", (e) => this.clone(e.code));
  },
};

window.addEventListener("DOMContentLoaded", () => {
  Main.layout(keysEN, Main.caps);
});
