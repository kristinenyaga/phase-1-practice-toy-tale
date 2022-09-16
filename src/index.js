let addToy = false;

let toyCollection=document.querySelector("#toy-collection")
let toyForm=document.querySelector(".add-toy-form")
let toyName=document.querySelector(".input")
let toyUrl=document.querySelector(".input-url")
let toyBtn=document.querySelector(".like-btn")


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToy()

  toyForm.addEventListener("submit",handleSubmit)

  
});


function getToy(){

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.map(toy =>{
      let card = document.createElement('div')
      card.className= "card"
      card.innerHTML=
    `
      
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes}</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>
      
    `
    toyCollection.appendChild(card)
    let btn=card.querySelector(".like-btn")
    btn.addEventListener('click',(e)=>{
      toy.likes+=1
      // card.querySelector('p').textContent=toy.likes
      updateLike(toy)
    })
  

   })

   })

}

function handleSubmit(e){
  e.preventDefault()
  
  fetch("http://localhost:3000/toys",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      "name":toyName.value,
      "image":toyUrl.value,
      "likes":0
    })

  })
  
  .then(response => response.json())
  .then(toy => console.log(toy))
  toyForm.reset()

}

function updateLike(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method:"PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(toy)
  })
  

}