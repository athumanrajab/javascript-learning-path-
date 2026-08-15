'use strict';

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelectorAll(".show-modal");  // The querySelectorAll is used to select multiple elements with the same class, since the querySelector will only select the first element of the given class

const openModal = function(){
    modal.classList.remove("hidden"); //Here when using remove(), we pass the class name as it is "hidden" , without including the dot ".hidden"
    overlay.classList.remove("hidden");
}
// Creating the function that will close the model whenever the close X button is clicked , but also whenever the outer space(overlay space) is clicked
const closeModal = function(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

for(let i = 0; i < btnOpenModal.length; i++){
    btnOpenModal[i].addEventListener("click", openModal);
}

// Add event listen when X button is clicked , or when the overlay space is clicked
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

/*
// This will work but we'll be repeating the same code twice which is not efficient

btnCloseModal.addEventListener("click", function(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
})

overlay.addEventListener("click", function(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
})
*/

// Add event listener when the esc button on te keyboard is clicked

document.addEventListener("keydown", function(event){
    // console.log(`${event.key} was clicked!`) //the event is passed as paramenter and it's object and when you logged it on console it contain multiple properties such as key, code etc

    
    // if(event.key === "Escape"){
    //     if(!modal.classList.contains("hidden")){
    //        closeModal();
    //     }
    // }
    
    // The code above work, but inorder to keep the code clean and efficient , we can implement as follow
    if(event.key === "Escape" && !modal.classList.contains("hidden")){
        closeModal();
    }
})

