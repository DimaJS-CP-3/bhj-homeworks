const form = document.getElementById("form");
const progress = document.getElementById("progress");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
  xhr.upload.addEventListener("progress", (el) => {
    if (xhr.readyState !== xhr.DONE) {
      progress.value = (el.loaded / el.total).toFixed(2);
    }
  });
  xhr.send(formData);
});
