document.getElementById("addRecipeBtn").addEventListener("click", function (e) {
  e.preventDefault();

  var dish = document.getElementById("dishInput").value;
  var ingredients = document.getElementById("ingredientsInput").value;
  var instructions = document.getElementById("instructionsInput").value;

  var recipe = document.createElement("li");
  recipe.classList.add("recipe");

  var title = document.createElement("h3");
  title.textContent = dish;

  var ingredientsPara = document.createElement("p");
  ingredientsPara.textContent = "Ингредиенты: " + ingredients;

  var instructionsPara = document.createElement("p");
  instructionsPara.textContent = "Инструкции: " + instructions;

  var commentForm = document.createElement("form");
  commentForm.classList.add("comment-form");

  var commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.placeholder = "Оставьте комментарий...";

  var commentButton = document.createElement("button");
  commentButton.textContent = "Добавить комментарий";

  commentForm.appendChild(commentInput);
  commentForm.appendChild(commentButton);

  var commentList = document.createElement("ul");
  commentList.classList.add("comment-list");

  recipe.appendChild(title);
  recipe.appendChild(ingredientsPara);
  recipe.appendChild(instructionsPara);
  recipe.appendChild(commentForm);
  recipe.appendChild(commentList);

  var recipes = document.getElementById("recipes");
  recipes.appendChild(recipe);

  document.getElementById("dishInput").value = "";
  document.getElementById("ingredientsInput").value = "";
  document.getElementById("instructionsInput").value = "";

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var commentText = commentInput.value;

    if (commentText.trim() !== "") {
      var commentItem = document.createElement("li");
      commentItem.textContent = commentText;

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Удалить";
      deleteButton.classList.add("delete-comment");

      commentItem.appendChild(deleteButton);
      commentList.appendChild(commentItem);

      commentInput.value = "";
    }
  });

  commentList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-comment")) {
      var commentItem = e.target.parentElement;
      commentList.removeChild(commentItem);
    }
  });
});

document.getElementById("searchBtn").addEventListener("click", function (e) {
  e.preventDefault();
  performSearch();
});

function performSearch() {
  var searchValue = document.getElementById("searchInput").value.toLowerCase();
  var recipes = document.getElementsByClassName("recipe");

  for (var i = 0; i < recipes.length; i++) {
    var recipe = recipes[i];
    var title = recipe.getElementsByTagName("h3")[0].textContent.toLowerCase();
    var ingredients = recipe
      .getElementsByTagName("p")[0]
      .textContent.toLowerCase();

    if (title.includes(searchValue) || ingredients.includes(searchValue)) {
      recipe.style.display = "block";
    } else {
      recipe.style.display = "none";
    }
  }
}
