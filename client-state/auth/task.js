const signin = document.getElementById("signin");
const signinForm = document.getElementById("signin__form");

const welcomeMessage = document.getElementById("welcome");
const userId = document.getElementById("user_id");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(signinForm);
  const request = new XMLHttpRequest();
  request.open("POST", "https://students.netoservices.ru/nestjs-backend/auth");

  request.addEventListener("readystatechange", function () {
    if (this.readyState !== this.DONE) return;

    switch (this.status) {
      case 0:
        alert("Нет ответа от сервера");
        break;

      case 201:
        let answer = JSON.parse(this.responseText);
        if (answer.success === undefined) {
          alert("Ошибка ответа сервера");
          return;
        }
        if (!answer.success) {
          alert("Неверный логин/пароль");
          return;
        }

        localStorage.setItem("user_id", userId);
        savedId = localStorage.getItem("user_id");
        userId.textContent = savedId;
        signin.classList.remove("signin_active");
        welcome.classList.add("welcome_active");

        break;

      default:
        alert(`Ошибка, код ответа ${this.status} (${this.statusText})`);
    }
  });

  request.send(formData);

  for (const input of signinForm.querySelectorAll("input")) input.value = "";
});

window.addEventListener("load", () => {
  savedId = localStorage.getItem("user_id");
  if (savedId) {
    userId.textContent = savedId;
    signin.classList.remove("signin_active");
    welcome.classList.add("welcome_active");
  }
});
