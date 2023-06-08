document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var author = document.getElementById("authorInput").value;
  var title = document.getElementById("titleInput").value;
  var imageURL = document.getElementById("imageURLInput").value;

  var card = document.createElement("div");
  card.classList.add("image-card");

  var image = document.createElement("img");
  image.src = imageURL;

  var authorPara = document.createElement("p");
  authorPara.textContent = "Автор: " + author;

  var titlePara = document.createElement("p");
  titlePara.textContent = "Заголовок: " + title;

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Удалить";
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", function () {
    card.remove();
  });

  card.appendChild(image);
  card.appendChild(authorPara);
  card.appendChild(titlePara);
  card.appendChild(deleteButton);

  var gallery = document.getElementById("gallery");
  gallery.appendChild(card);

  document.getElementById("authorInput").value = "";
  document.getElementById("titleInput").value = "";
  document.getElementById("imageURLInput").value = "";
});
