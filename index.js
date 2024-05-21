let catScore = 0;
let dogScore = 0;

function answers(answer, button) {
//Select all buttons within the same parent element
const buttons = button.parentElement.querySelectorAll('button');

//Remove the selected class
buttons.forEach(function(btn) {
    btn.classList.remove('selected')
});

//Add the selected class to the clicked buttons
button.classList.add('selected');

//Update sores based pn the answer
    if (answer === 'cat') {
        catScore++;
    } else if (answer === 'dog') {
        dogScore++;
    }
}

const catPerson = document.querySelector('#catPerson');
const dogPerson = document.querySelector('#dogPerson');

function showResult() {
    //Hide questions, add class=hidden 
    document.querySelector('.quiz').classList.add('hidden');
    //Show results, remove class=hidden
    document.querySelector('#result').classList.remove('hidden');

    let message = '';
    if (catScore > dogScore) {
        message = 'cat'; 
            fetch('https://api.thecatapi.com/v1/images/search')
            .then(res => res.json())
            .then(data => {
                catPerson.innerHTML = `<img src="${data[0].url}" alt="Cat Image" class="responsive-img"/>`
            })
            .catch(error => console.error('Error fetching cat image:', error));
    } else {
        message = 'dog';
        fetch('https://api.thedogapi.com/v1/images/search')
    .then(res => res.json())
    .then(data => {
        dogPerson.innerHTML = `<img src="${data[0].url}" alt="Dog Image" class="responsive-img"/>`
    })
    .catch(error => console.error('Error fetching dog image:', error));
    }

    //Add resultText
    document.querySelector('#resultText').innerText = message;
}

function restartQuiz() {
    catScore = 0;
    dogScore = 0;
    catPerson.innerHTML = '';
    dogPerson.innerHTML = '';

     // Remove the 'selected' class from all buttons
     const buttons = document.querySelectorAll('button'); // Select all buttons in the document
     buttons.forEach(function(btn) { 
         btn.classList.remove('selected'); // Remove 'selected' class from each button
     });

    //To start new quiz: return questions and remove results 
    document.querySelector('.quiz').classList.remove('hidden');
    document.querySelector('#result').classList.add('hidden');
}

const catImage = document.querySelector('#catImage');
const dogImage = document.querySelector('#dogImage');

function getCatImage() {
    fetch('https://api.thecatapi.com/v1/images/search?limit=10')
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) 
            { console.log(data[i].url); 
                // catImage.innerHTML = `<img src="${data[0].url}" alt="Cat Image" class="responsive-img"/>`
    }
        
    })
    .catch(error => console.error('Error fetching cat image:', error));
}

function getDogImage() {
    fetch('https://api.thedogapi.com/v1/images/search')
    .then(res => res.json())
    .then(data => {
        dogImage.innerHTML = `<img src="${data[0].url}" alt="Dog Image" class="responsive-img"/>`
    })
    .catch(error => console.error('Error fetching cat image:', error));
}

getCatImage();
getDogImage();




