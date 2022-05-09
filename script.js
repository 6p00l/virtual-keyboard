const keysEN = [
  ["`", "Backquote"],
  ["1", "Digit1"],
  ["2", "Digit2"],
  ["3", "Digit3"],
  ["4", "Digit4"],
  ["5", "Digit5"],
  ["6", "Digit6"],
  ["7", "Digit7"],
  ["8", "Digit8"],
  ["9", "Digit9"],
  ["0", "Digit0"],
  ["-", "Minus"],
  ["=", "Equal"],
  ["Backspace", "Backspace"],
  ["Tab", "Tab"],
  ["q", "KeyQ"],
  ["w", "KeyW"],
  ["e", "KeyE"],
  ["r", "KeyR"],
  ["t", "KeyT"],
  ["y", "KeyY"],
  ["u", "KeyU"],
  ["i", "KeyI"],
  ["o", "KeyO"],
  ["p", "KeyP"],
  ["[", "BracketLeft"],
  ["]", "BracketRight"],
  ["Delete", "Delete"],
  ["CapsLock", "CapsLock"],
  ["a", "KeyA"],
  ["s", "KeyS"],
  ["d", "KeyD"],
  ["f", "KeyF"],
  ["g", "KeyG"],
  ["h", "KeyH"],
  ["j", "KeyJ"],
  ["k", "KeyK"],
  ["l", "KeyL"],
  [";", "Semicolon"],
  ["'", "Quote"],
  ["\\", "Backslash"],
  ["Enter", "Enter"],
  ["Shift", "ShiftLeft"],
  ["z", "KeyZ"],
  ["x", "KeyX"],
  ["c", "KeyC"],
  ["v", "KeyV"],
  ["b", "KeyB"],
  ["n", "KeyN"],
  ["m", "KeyM"],
  [",", "Comma"],
  [".", "Period"],
  ["/", "Slash"],
  ["AU", "ArrowUp"],
  ["Shift", "ShiftRight"],
  ["Control", "ControlLeft"],
  ["Alt", "AltLeft"],
  [" ", "Space"],
  ["Alt", "AltRight"],
  ["Control", "ControlRight"],
  ["AL", "ArrowLeft"],
  ["AD", "ArrowDown"],
  ["AR", "ArrowRight"],
];
const keysRU = [
  ["`", "Backquote"],
  ["1", "Digit1"],
  ["2", "Digit2"],
  ["3", "Digit3"],
  ["4", "Digit4"],
  ["5", "Digit5"],
  ["6", "Digit6"],
  ["7", "Digit7"],
  ["8", "Digit8"],
  ["9", "Digit9"],
  ["0", "Digit0"],
  ["-", "Minus"],
  ["=", "Equal"],
  ["Backspace", "Backspace"],
  ["Tab", "Tab"],
  ["й", "KeyQ"],
  ["ц", "KeyW"],
  ["у", "KeyE"],
  ["к", "KeyR"],
  ["е", "KeyT"],
  ["н", "KeyY"],
  ["г", "KeyU"],
  ["ш", "KeyI"],
  ["щ", "KeyO"],
  ["з", "KeyP"],
  ["х", "BracketLeft"],
  ["ъ", "BracketRight"],
  ["Delete", "Delete"],
  ["CapsLock", "CapsLock"],
  ["ф", "KeyA"],
  ["ы", "KeyS"],
  ["в", "KeyD"],
  ["а", "KeyF"],
  ["п", "KeyG"],
  ["р", "KeyH"],
  ["о", "KeyJ"],
  ["л", "KeyK"],
  ["д", "KeyL"],
  ["ж", "Semicolon"],
  ["э", "Quote"],
  ["\\", "Backslash"],
  ["Enter", "Enter"],
  ["Shift", "ShiftLeft"],
  ["я", "KeyZ"],
  ["ч", "KeyX"],
  ["с", "KeyC"],
  ["м", "KeyV"],
  ["и", "KeyB"],
  ["т", "KeyN"],
  ["ь", "KeyM"],
  ["б", "Comma"],
  ["ю", "Period"],
  [".", "Slash"],
  ["AU", "ArrowUp"],
  ["Shift", "ShiftRight"],
  ["Control", "ControlLeft"],
  ["Alt", "AltLeft"],
  [" ", "Space"],
  ["Alt", "AltRight"],
  ["Control", "ControlRight"],
  ["AL", "ArrowLeft"],
  ["AD", "ArrowDown"],
  ["AR", "ArrowRight"],
];

const wrapper = document.createElement("div");
const textarea =
  "<div className='textarea'><textarea value=''></textarea></div>";
wrapper.className = "wrapper";
document.body.innerHTML = textarea;
document.body.appendChild(wrapper);
const input = document.querySelector("textarea");

const Main = {
  caps: false,
  alt: false,
  shift: false,
  tab: false,

  layout(lang) {
    for (let i = 0; i < lang.length; i += 1) {
      const container = document.createElement("div");
      container.className = "button";
      container.addEventListener("focus", () => {
        this.keyEvents();
      });

      const key = lang[i][0];
      const code = lang[i][1];
      container.className = `button ${code}`;

      const keyDiv = `<div class='key  ${key}' >${key}</div>`;
      container.innerHTML = keyDiv;
      wrapper.appendChild(container);

      this.keyEvents(key, container);
    }
    this.realEvents();
  },
  clone(e) {
    if (e.key === "Tab") {
      if (!this.tab) {
        e.preventDefault();
        const pos = input.selectionStart;
        input.value = `${input.value.slice(0, pos)}\t${input.value.slice(pos)}`;
        input.selectionStart = pos + 1;
        input.selectionEnd = pos + 1;

        this.tab = !this.tab;
      } else this.tab = !this.tab;
    }
    const activeKey = document.querySelector(`.${e.code}`);

    activeKey.classList.toggle("active");
  },

  keyEvents(key, div) {
    switch (key) {
      case "CapsLock":
        div.addEventListener("click", () => {
          this.caps = !this.caps;
          div.classList.toggle("active");
          input.focus();
        });
        break;
      case "Backspace":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;

          input.value = input.value.slice(0, pos - 1) + input.value.slice(pos);
          input.selectionStart = pos - 1;
          input.selectionEnd = pos - 1;
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
          input.selectionEnd = pos + 1;
          input.focus();
        });
        break;
      case "Delete":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;
          input.value = input.value.slice(0, pos) + input.value.slice(pos + 1);
          input.selectionStart = pos;
          input.selectionEnd = pos;
          input.focus();
        });
        break;
      case "Alt":
        div.addEventListener("click", () => {
          if (this.shift) {
            this.reLang();
          } else this.alt = !this.alt;

          div.classList.toggle("active");
          input.focus();
        });
        break;
      case "Shift":
        div.addEventListener("click", () => {
          if (this.alt) {
            this.reLang();
          } else this.shift = !this.shift;

          div.classList.toggle("active");
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
          input.selectionEnd = pos + 1;
          input.focus();
        });
        break;
      case "AL":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;

          input.selectionStart = pos - 1;
          input.selectionEnd = pos - 1;
          input.focus();
        });
        break;
      case "AR":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;

          input.selectionStart = pos + 1;
          input.selectionEnd = pos + 1;
          input.focus();
        });
        break;
      case "AU":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;
          input.value = `${input.value.slice(0, pos)}⮝${input.value.slice(
            pos
          )}`;
          input.selectionStart = pos + 1;
          input.selectionEnd = pos + 1;
          input.focus();
          div.classList.toggle("active");
          setTimeout(() => div.classList.toggle("active"), 200);
        });
        break;
      case "AD":
        div.addEventListener("click", () => {
          const pos = input.selectionStart;
          input.value = `${input.value.slice(0, pos)}⮟${input.value.slice(
            pos
          )}`;
          input.selectionStart = pos + 1;
          input.selectionEnd = pos + 1;
          input.focus();
          div.classList.toggle("active");
          setTimeout(() => div.classList.toggle("active"), 200);
        });
        break;

      case "Control":
        div.addEventListener("click", () => {
          input.focus();
        });
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
          input.selectionEnd = pos + 1;
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

  reLang() {
    if (!localStorage.getItem("lang")) {
      localStorage.setItem("lang", "EN");
    }
    wrapper.innerHTML = "";
    this.shift = false;
    this.alt = false;
    if (localStorage.getItem("lang") === "EN") {
      this.layout(keysRU);
      localStorage.setItem("lang", "RU");
    } else {
      this.layout(keysEN);
      localStorage.setItem("lang", "EN");
    }
    if (this.caps === true) {
      document.querySelector(".CapsLock").classList.toggle("active");
    }
  },
};

window.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang");
  if (lang === "RU") {
    Main.layout(keysRU);
  } else Main.layout(keysEN);

  Main.shiftKey = document.querySelector(".Shift").parentNode;
  Main.altKey = document.querySelector(".Alt").parentNode;
});
