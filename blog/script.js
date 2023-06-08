
let articles = [];

function addArticle(event) {
  event.preventDefault();

  const title = document.getElementById('title-input').value;
  const content = document.getElementById('content-input').value;
  const tags = document.getElementById('tags-input').value.split(',');

  const article = {
    id: Date.now(),
    title: title,
    content: content,
    tags: tags,
    comments: []
  };

  articles.push(article);
  displayArticles();

  document.getElementById('article-form').reset();
}

function addComment(event, articleId) {
  event.preventDefault();

  const commentInputId = `comment-input-${articleId}`;
  const commentInput = document.getElementById(commentInputId);
  const commentText = commentInput.value;

  const article = articles.find((article) => article.id === articleId);
  if (article) {
    article.comments.push(commentText);
    displayArticles();
  }

  commentInput.value = '';
}

function deleteArticle(articleId) {
  articles = articles.filter((article) => article.id !== articleId);
  displayArticles();
}

function deleteComment(articleId, commentIndex) {
  const article = articles.find((article) => article.id === articleId);
  if (article) {
    article.comments.splice(commentIndex, 1);
    displayArticles();
  }
}

function displayArticles() {
  const articlesList = document.getElementById('articles-list');
  articlesList.innerHTML = '';

  articles.forEach((article, index) => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');
    articleElement.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.content}</p>
      <p>Теги: ${article.tags.join(', ')}</p>
      <button onclick="deleteArticle(${article.id})">Удалить статью</button>
    `;

    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments');
    article.comments.forEach((comment, commentIndex) => {
      const commentElement = document.createElement('p');
      commentElement.textContent = comment;
      commentsSection.appendChild(commentElement);

      const deleteCommentButton = document.createElement('button');
      deleteCommentButton.textContent = 'Удалить комментарий';
      deleteCommentButton.addEventListener('click', () => deleteComment(article.id, commentIndex));
      commentsSection.appendChild(deleteCommentButton);
    });

    const commentInputId = `comment-input-${article.id}`;
    const commentForm = document.createElement('form');
    commentForm.innerHTML = `
      <input type="text" id="${commentInputId}" placeholder="Добавить комментарий">
      <button onclick="addComment(event, ${article.id})">Отправить</button>
    `;
    commentsSection.appendChild(commentForm);

    articleElement.appendChild(commentsSection);

    articlesList.appendChild(articleElement);
  });
}

function searchArticles(event) {
  event.preventDefault();

  const searchInput = document.getElementById('search-input').value.toLowerCase();

  const filteredArticles = articles.filter((article) => {
    const titleMatch = article.title.toLowerCase().includes(searchInput);
    const tagMatch = article.tags.some((tag) => tag.toLowerCase().includes(searchInput));

    return titleMatch || tagMatch;
  });

  displayFilteredArticles(filteredArticles);
}

function displayFilteredArticles(filteredArticles) {
  const articlesList = document.getElementById('articles-list');
  articlesList.innerHTML = '';

  filteredArticles.forEach((article, index) => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');
    articleElement.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.content}</p>
      <p>Теги: ${article.tags.join(', ')}</p>
      <button class="button-danger" onclick="deleteArticle(${article.id})">Удалить статью</button>
    `;

    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments');
    article.comments.forEach((comment, commentIndex) => {
      const commentElement = document.createElement('p');
      commentElement.textContent = comment;
      commentsSection.appendChild(commentElement);

      const deleteCommentButton = document.createElement('button');
      deleteCommentButton.className = "button-danger"
      deleteCommentButton.textContent = 'Удалить комментарий';
      deleteCommentButton.addEventListener('click', () => deleteComment(article.id, commentIndex));
      commentsSection.appendChild(deleteCommentButton);
    });

    const commentInputId = `comment-input-${article.id}`;
    const commentForm = document.createElement('form');
    commentForm.innerHTML = `
      <input type="text" id="${commentInputId}" placeholder="Добавить комментарий">
      <button onclick="addComment(event, ${article.id})">Отправить</button>
    `;
    commentsSection.appendChild(commentForm);

    articleElement.appendChild(commentsSection);

    articlesList.appendChild(articleElement);
  });
}

document.getElementById('article-form').addEventListener('submit', addArticle);

document.getElementById('search-form').addEventListener('submit', searchArticles);
