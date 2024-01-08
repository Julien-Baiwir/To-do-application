const newTaskInput = document.querySelector("#wrapper input");
const addBtn = document.querySelector("#add-btn");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");

// -------count value---------
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
  if (taskCount < 0) {
    taskCount = 0; // Set taskCount to 0 if it's negative
}
  countValue.innerText = taskCount;
};




// -------add task---------
const addTask = () => {
  const taskName = newTaskInput.value.trim();
  
  error.style.display = "none";
  if (!taskName){
    setTimeout(() => {
        error.style.display ="block";
    }, 200);
    return;
  }
  
  const task =
  `<div class="task"> 
  <input type="checkbox" class="task-check">
  <span class="taskName">${taskName}</span>
  
  <button class="edit">
  <i class="fa-solid fa-pen-to-square"></i>
  </button>
  
  <button class="delete"> 
  <i class="fa-solid fa-trash"></i>
  </button>
  
  </div>`
 tasksContainer.insertAdjacentHTML("beforeend", task);

 // -------delete task---------


 // -------edit task---------
 const editButtons = document.querySelectorAll(".edit");

  editButtons.forEach(editBtn => { 
  editBtn.onclick = (e) => {
    let targetElement = e.target;
    if (!(e.target.className == "edit")){
      targetElement = e.target.parentElement;
    } 
    newTaskInput.value = targetElement.previousElementSibling?.innerText;
    targetElement.parentNode.remove();
    taskCount -=1;
    displayCount (taskCount);
   }
 });
// ----- strike-through effect text-------
 const tasksCheck = document.querySelectorAll(".task-check");
 tasksCheck.forEach((checkBox) =>{
  checkBox.onchange = () =>{
    checkBox.nextElementSibling.classList.toggle("completed");
    if (checkBox.checked){
      taskCount -=1;
    }else {
      taskCount +=1;
    }
    displayCount(taskCount);
  }
 })
 // -------delete task---------
//  const deleteButtons = document.querySelectorAll(".delete");

//  deleteButtons.forEach(button => { 
//    button.onclick = () => {
//     button.parentNode.remove();
//      taskCount-=1; 
//      displayCount(taskCount); 
//    }
//  });
// ----delete 2 -----
const deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach(button => {
    button.onclick = () => {
        const parent = button.parentNode;
        const checkbox = parent.querySelector("input[type='checkbox']");
       
        parent.remove();
        
        if (checkbox && !checkbox.checked) {
            taskCount -= 1; // If checkbox is unchecked, decrement taskCount
        }

        displayCount(taskCount);
    };
});
// ---------

 taskCount ++;
 displayCount(taskCount);
 newTaskInput.value ="";
};

addBtn.addEventListener ('click',addTask);


// ---------
window.onload = () => {
   taskCount =0;
   displayCount(taskCount);
   newTaskInput.value ="";
};


// --------------



