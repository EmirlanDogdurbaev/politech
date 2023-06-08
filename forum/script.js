let topics = [];

function addTopic(event) {
  event.preventDefault();

  const titleInput = document.getElementById("topic-title");
  const contentInput = document.getElementById("topic-content");

  const topic = {
    id: Date.now(),
    title: titleInput.value,
    content: contentInput.value,
    comments: [],
  };

  topics.push(topic);

  titleInput.value = "";
  contentInput.value = "";

  displayTopics();
}

function deleteTopic(topicId) {
  topics = topics.filter((topic) => topic.id !== topicId);
  displayTopics();
}

function addComment(event, topicId) {
  event.preventDefault();

  const commentInputId = `comment-input-${topicId}`;
  const commentInput = document.getElementById(commentInputId);

  const topic = topics.find((topic) => topic.id === topicId);
  if (topic) {
    topic.comments.push(commentInput.value);
    displayTopics();
  }

  commentInput.value = "";
}

function deleteComment(topicId, commentIndex) {
  const topic = topics.find((topic) => topic.id === topicId);
  if (topic) {
    topic.comments.splice(commentIndex, 1);
    displayTopics();
  }
}

function displayTopics() {
  const topicsList = document.getElementById("topics-list");
  topicsList.innerHTML = "";

  topics.forEach((topic) => {
    const topicElement = document.createElement("div");
    topicElement.classList.add("topic");
    topicElement.innerHTML = `
      <h2>${topic.title}</h2>
      <p>${topic.content}</p>
      <button onclick="deleteTopic(${topic.id})">Delete Topic</button>
    `;

    const commentsSection = document.createElement("div");
    commentsSection.classList.add("comments");

    topic.comments.forEach((comment, commentIndex) => {
      const commentElement = document.createElement("p");
      commentElement.textContent = comment;
      commentsSection.appendChild(commentElement);

      const deleteCommentButton = document.createElement("button");
      deleteCommentButton.textContent = "Delete Comment";
      deleteCommentButton.addEventListener("click", () =>
        deleteComment(topic.id, commentIndex)
      );
      commentsSection.appendChild(deleteCommentButton);
    });

    const commentInputId = `comment-input-${topic.id}`;
    const commentForm = document.createElement("form");
    commentForm.innerHTML = `
      <input type="text" id="${commentInputId}" placeholder="Enter comment" required>
      <button type="submit">Add Comment</button>
    `;
    commentForm.addEventListener("submit", (event) =>
      addComment(event, topic.id)
    );
    commentsSection.appendChild(commentForm);

    topicElement.appendChild(commentsSection);
    topicsList.appendChild(topicElement);
  });
}

const topicForm = document.getElementById("topic-form");
topicForm.addEventListener("submit", addTopic);
