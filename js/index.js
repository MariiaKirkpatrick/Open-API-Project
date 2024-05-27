let catScore = 0;
let dogScore = 0;

function answers(answer, button) {
  //Select all buttons within the same parent element
  const buttons = button.parentElement.querySelectorAll("button");

  //Remove the selected class
  buttons.forEach(function (btn) {
    btn.classList.remove("selected");
  });

  //Add the selected class to the clicked buttons
  button.classList.add("selected");

  //Update sores based pn the answer
  if (answer === "cat") {
    catScore++;
  } else if (answer === "dog") {
    dogScore++;
  }
}

const catPerson = document.querySelector("#catPerson");
const dogPerson = document.querySelector("#dogPerson");

function showResult() {
  //Hide questions, add class=hidden
  document.querySelector(".quiz").classList.add("hidden");
  //Show results, remove class=hidden
  document.querySelector("#result").classList.remove("hidden");

  let message = "";
  if (catScore > dogScore) {
    message = "cat";
    fetch(
      "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=bv4zfQoNzPa0KhiKb7cSy7dqmRkiGs68bI2HF8HaBmGpgjILNCygKkSGvV1gDD2K"
    )
      .then((res) => res.json())
      .then((data) => {
        catPerson.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          //To get 10 images of cats
          let imgElement = document.createElement("img");
          imgElement.src = data[i].url;
          imgElement.alt = "Cat Image";
          imgElement.className = "responsive-img";
          imgElement.addEventListener("mouseover", () =>
            fetchCatBreed(data[i].id, imgElement)
          ); //To show cat breed
          catPerson.appendChild(imgElement);
        }
      })
      .catch((error) => console.error("Error fetching cat image:", error));
  } else {
    message = "dog";
    fetch(
      "https://api.thedogapi.com/v1/images/search?limit=10&has_breeds=1&api_key=r5hjQEmUStvs0Dd72Hqghf3I7LLf4znDs3h8Gyoum1u6iKQbyfkMtO19iy6q4w2T"
    )
      .then((res) => res.json())
      .then((data) => {
        dogPerson.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          //To get 10 images of dogs
          let imgElement = document.createElement("img");
          imgElement.src = data[i].url;
          imgElement.alt = "Dog Image";
          imgElement.className = "responsive-img";
          imgElement.addEventListener("mouseover", function () {
            fetchDogBreed(data[i].id, imgElement);
          });
          dogPerson.appendChild(imgElement);
        }
      })
      .catch((error) => console.error("Error fetching dog image:", error));
  }

  //Add resultText
  document.querySelector("#resultText").innerText = message;
}

function fetchCatBreed(imageId, imgElement) {
  fetch(
    `https://api.thecatapi.com/v1/images/${imageId}?api_key=bv4zfQoNzPa0KhiKb7cSy7dqmRkiGs68bI2HF8HaBmGpgjILNCygKkSGvV1gDD2K`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.breeds && data.breeds.length > 0) {
        imgElement.title = data.breeds[0].name;
      } else {
        imgElement.title = "Unknown Breed";
      }
    })
    .catch((error) => console.error("Error fetching cat breed:", error));
}

function fetchDogBreed(imageId, imgElement) {
  fetch(
    `https://api.thedogapi.com/v1/images/${imageId}?api_key=r5hjQEmUStvs0Dd72Hqghf3I7LLf4znDs3h8Gyoum1u6iKQbyfkMtO19iy6q4w2T`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.breeds && data.breeds.length > 0) {
        imgElement.title = data.breeds[0].name;
      } else {
        imgElement.title = "Unknown Breed";
      }
    })
    .catch((error) => console.error("Error fetching dog breed:", error));
}

function restartQuiz() {
  catScore = 0;
  dogScore = 0;
  catPerson.innerHTML = "";
  dogPerson.innerHTML = "";

  // Remove the 'selected' class from all buttons
  const buttons = document.querySelectorAll("button"); // Select all buttons in the document
  buttons.forEach(function (btn) {
    btn.classList.remove("selected"); // Remove 'selected' class from each button
  });

  //To start new quiz: return questions and remove results
  document.querySelector(".quiz").classList.remove("hidden");
  document.querySelector("#result").classList.add("hidden");
}

const catImage = document.querySelector("#catImage");
const dogImage = document.querySelector("#dogImage");

function getCatImage() {
  fetch("https://api.thecatapi.com/v1/images/search")
    .then((res) => res.json())
    .then((data) => {
      catImage.innerHTML = `<img src="${data[0].url}" alt="Cat Image" class="responsive-img"/>`;
    })
    .catch((error) => console.error("Error fetching cat image:", error));
}

function getDogImage() {
  fetch("https://api.thedogapi.com/v1/images/search")
    .then((res) => res.json())
    .then((data) => {
      dogImage.innerHTML = `<img src="${data[0].url}" alt="Dog Image" class="responsive-img"/>`;
    })
    .catch((error) => console.error("Error fetching dog image:", error));
}

getCatImage();
getDogImage();
