const pollTitleElement = document.getElementById("poll__title");
const pollAnswersElement = document.getElementById("poll__answers");

// Функция для выполнения GET-запроса и загрузки опроса
async function loadPoll() {
  try {
    const response = await fetch(
      "https://students.netoservices.ru/nestjs-backend/poll"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при загрузке опроса:", error);
    return null;
  }
}

// Функция для отображения опроса на странице
function showPoll(pollData) {
  if (
    !pollData ||
    !pollData.data ||
    !pollData.data.title ||
    !pollData.data.answers
  ) {
    pollTitleElement.textContent = "Ошибка загрузки опроса";
    return;
  }

  const title = pollData.data.title;
  const answers = pollData.data.answers;

  pollTitleElement.textContent = title;

  // Очищаем содержимое контейнера перед добавлением новых кнопок
  pollAnswersElement.innerHTML = "";

  // Создаем кнопки с вариантами ответов и добавляем их к контейнеру
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "poll__answer";
    button.textContent = answer;
    button.addEventListener("click", () => {
      // При клике на кнопку выводим диалоговое окно с сообщением
      alert("Спасибо, ваш голос засчитан!");
    });
    pollAnswersElement.appendChild(button);
  });
}

// Загружаем опрос и отображаем его на странице
loadPoll()
  .then(showPoll)
  .catch((error) => {
    console.error("Ошибка при выполнении запроса:", error);
    pollTitleElement.textContent = "Ошибка загрузки опроса";
  });
