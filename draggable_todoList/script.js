
let addBtn=document.querySelector('.AddBtn')
let modal=document.querySelector('.modal')
let btn=document.querySelector('.btn')
let toDoContainers=document.querySelectorAll('.toDoContainer')

let NoStatusContainer=toDoContainers[0]

toDoContainers.forEach(function(element){
    element.addEventListener('dragover',statusesOnDragOver)
    element.addEventListener('drop',statusesOnDrop)
})


let toDoItem=document.querySelector('.item')
let input=document.querySelector('.input')
btn.addEventListener('click',btnOnClick)

let Xmodal=document.querySelector('.Xmodal')
addBtn.addEventListener('click',addBtnOnCLick)
Xmodal.addEventListener('click',XmodalOnClick)
document.querySelector('.Xitem').addEventListener('click',XtoDoItemsOnClick)
document.querySelector('body').addEventListener('keydown',keyDownFunction)

toDoItem.addEventListener('dragstart',toDoItemOnDragStart)
function addBtnOnCLick(event){

   modal.classList.add('active')

}

function XmodalOnClick(event){
    modal.classList.remove('active')
}

function XtoDoItemsOnClick(event){

    event.target.parentElement.remove()
}

function keyDownFunction(event){
    if(event.code=='Enter')
    {   
        createToDoItem()
        modal.classList.remove('active')
        input.value=""
    }
}

function btnOnClick(event){
    createToDoItem()
    modal.classList.remove('active')
    input.value=""
}


function createToDoItem(){
    if(input.value.length!=0){
        let newToDoItem=document.createElement('div')
        let newText=document.createElement('span')
        let newXIcon=document.createElement('span')
        newXIcon.setAttribute('class','Xitem')
        newXIcon.addEventListener('click',XtoDoItemsOnClick)
        newText.setAttribute('class','text')
        newToDoItem.setAttribute('class','item')
        newText.innerHTML=input.value
        newXIcon.innerHTML='&times;'
        newToDoItem.appendChild(newText)
        newToDoItem.appendChild(newXIcon)
        NoStatusContainer.appendChild(newToDoItem)
        newToDoItem.setAttribute('draggable','true')
        newToDoItem.addEventListener('dragstart',toDoItemOnDragStart)
    }
}


function toDoItemOnDragStart(event){
    event.target.setAttribute('id','draggedItem')
    event.dataTransfer.setData('draggedToDoItemID',event.target.getAttribute('id'))
  
    
}


function statusesOnDragOver(event){

    if(event.target.classList.contains('toDoContainer'))
        event.preventDefault()
   
}

function statusesOnDrop(event){
    let draggedToDoItemID=event.dataTransfer.getData('draggedToDoItemID')
    let draggedToDoItem=document.getElementById(draggedToDoItemID)
    event.target.appendChild(draggedToDoItem);
    draggedToDoItem.removeAttribute('id')
}