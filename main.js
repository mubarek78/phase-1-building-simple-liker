const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
let modal = document.querySelector('#modal')
modal.setAttribute('Class', 'hidden')

let heartsSpan = document.querySelectorAll('span')

heartsSpan.forEach(heart => {
  heart.addEventListener('click', () => {
    switchHearts(heart)
    mimicServerCall()
      .then(res => {
        if (res === "Pretend remote server notified of action!") {
          switchHearts()
        }
      })
      .catch(error => {
        if (error === "Random server error. Try again.") {
          modal.className = "";
          modal.innerHTML = error;
          setTimeout(visibleModal, 3000)

        }
      })
  })
})


function switchHearts(heart) {
  if (heart.className === "like-glyph") {
    heart.innerHTML = FULL_HEART
    heart.className = "like-glyph activated-heart"
  } else if (heart.className === 'like-glyph activated-heart') {
    heart.innerHTML = EMPTY_HEART
    heart.className = 'like-glyph'
  }
}

function visibleModal() {
  modal.className = "hidden";
}



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}