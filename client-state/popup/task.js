const modalWindow = document.getElementById("subscribe-modal");
const windowClose = modalWindow.querySelector(".modal__close");

const getCookie = (name) => {
  const value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
};

windowClose.addEventListener("click", () => {
  modalWindow.classList.remove("modal_active");
  document.cookie = "modal=close; max-age=3600";
});

if (getCookie("modal") !== "close") modalWindow.classList.add("modal_active");
