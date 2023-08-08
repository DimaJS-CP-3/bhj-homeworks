// Получаем ссылки на элементы
const loader = document.getElementById("loader");
const itemsContainer = document.getElementById("items");

// Функция для выполнения GET-запроса
async function getCurrencyData() {
  try {
    const response = await fetch(
      "https://students.netoservices.ru/nestjs-backend/slow-get-courses"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return null;
  }
}

// Функция для отображения данных о курсе валют на странице
function showCurrencyData(data) {
  if (!data || !data.response || !data.response.Valute) {
    // Если данные некорректны или отсутствуют, выводим сообщение об ошибке
    itemsContainer.textContent = "Ошибка загрузки данных";
    return;
  }

  const valutes = data.response.Valute;

  // Очищаем контейнер перед обновлением данных
  itemsContainer.innerHTML = "";

  for (const valute in valutes) {
    if (valutes.hasOwnProperty(valute)) {
      const currency = valutes[valute];
      const itemContainer = document.createElement("div");
      itemContainer.className = "item";

      // Создаем элементы для отображения данных о курсе валюты
      const itemCodeElement = document.createElement("div");
      itemCodeElement.className = "item__code";
      itemCodeElement.textContent = currency.CharCode;

      const itemValueElement = document.createElement("div");
      itemValueElement.className = "item__value";
      itemValueElement.textContent = currency.Value;

      const itemCurrencyElement = document.createElement("div");
      itemCurrencyElement.className = "item__currency";
      itemCurrencyElement.textContent = "руб.";

      // Добавляем элементы к контейнеру для валюты
      itemContainer.appendChild(itemCodeElement);
      itemContainer.appendChild(itemValueElement);
      itemContainer.appendChild(itemCurrencyElement);
      itemsContainer.appendChild(itemContainer);
    }
  }

  // После отображения данных, скрываем анимацию загрузки
  loader.style.display = "none";
}

// Загружаем данные и обновляем страницу после получения ответа
getCurrencyData()
  .then(showCurrencyData)
  .catch((error) => {
    console.error("Ошибка при выполнении запроса:", error);
    loader.style.display = "none"; // Скрываем анимацию загрузки в случае ошибки
    itemsContainer.textContent = "Ошибка загрузки данных";
  });
