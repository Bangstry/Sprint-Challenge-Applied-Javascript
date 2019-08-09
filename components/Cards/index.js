// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

axios
  .get("https://lambda-times-backend.herokuapp.com/articles")
  .then(response => {
    let Objects = response.data.articles;
    let Arrays = Object.values(Objects);
    let Topics = Object.keys(Objects);

    let tBtns = document.querySelectorAll(".tabs .topics div");
    tBtns .forEach(item => {
      let data = item.getAttribute("data-show");
      item.addEventListener("click", () => dataClick(data));
    });

    Arrays.forEach((array, index) => {
      array.forEach(article => {
        cardComp(article, Topics[index]);
      });
    });
  });

let container = document.querySelector(".cards-container");

function cardComp(article, topic) {
  let cDiv = document.createElement("div");
  cDiv.classList.add("card");
  cDiv.setAttribute("data-topic", topic);

  let hLine = document.createElement("div");
  hLine .classList.add("headline");
  hLine .textContent = article.headline;

  let authDiv = document.createElement("div");
  authDiv.classList.add("author");

  let imgDiv = document.createElement("div");
  imgDiv.classList.add("img-container");

  let aImg = document.createElement("img");
  aImg.src = article.authorPhoto;

  let nameSpan = document.createElement("span");
  nameSpan.textContent = article.authorName;

  imgDiv.appendChild(aImg);
  authDiv.appendChild(imgDiv);
  authDiv.appendChild(nameSpan);

  cDiv.appendChild(hLine);
  cDiv.appendChild(authDiv);

  container.appendChild(cDiv);
}

function dataClick(data) {
  let AllCards = document.querySelectorAll(".card");
  AllCards.forEach(card => {
    let thisTopic = card.getAttribute("data-topic");
    card.style.display = "none";
    if (thisTopic === data) {
      card.style.display = "flex";
    }
  });
}