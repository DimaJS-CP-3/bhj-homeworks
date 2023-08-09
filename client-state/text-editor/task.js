const editor = document.getElementById("editor");
const key = "txt";
window.addEventListener("unload", () => (localStorage[key] = editor.value));
editor.value = localStorage[key];
