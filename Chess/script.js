
let button = document.querySelector('.btn')

let chessContainer=document.querySelector('.chess')

let inputs=document.querySelectorAll('.form-container input')


button.addEventListener('click',btnOnClick)

let _2digitNumberRegEX= /^\d{1,2}$/

let chessBoxWidth

let fragment=document.createDocumentFragment()

let evenBoxClass,OddBoxClass

function btnOnClick(event){
    console.log("hello");
    for(let child of fragment.children)
        child.remove()

    Object.values(chessContainer.children).forEach(element=>{
        element.remove()
    })

  
    console.log(chessContainer.children.length);

    if(!_2digitNumberRegEX.test(inputs[0].value))
        return
    
    for(let i=0 ; i<inputs[1].value ;i++){

        if(i%2 == 0){
            evenBoxClass='box-dark'
            OddBoxClass='box-light'
         }
        else{
            evenBoxClass='box-light'
            OddBoxClass='box-dark'
          }

        for(let j=0 ; j<inputs[0].value ;j++){
            let box=document.createElement('div')
            chessBoxWidth = chessContainer.offsetWidth / Number(inputs[0].value) - 1
            box.style.width=`${chessBoxWidth}px`
            box.style.height=` ${chessBoxWidth}px`
            box.setAttribute('data-row',String(i+1))
            box.setAttribute('data-column',String(j+1))
            box.addEventListener('mouseover',mouseOverForBoxes)

            if(j%2==0)
                box.classList.add('box',evenBoxClass)
            else
                box.classList.add('box',OddBoxClass)
            fragment.append(box)
        }
    }

    chessContainer.appendChild(fragment)
    
}

function mouseOverForBoxes(event){
    console.clear()
    console.log('row: ',event.target.dataset.row)
    console.log('column: ',event.target.dataset.column)
}


window.addEventListener('load',function(event){

    inputs.forEach(input => {
        input.value=""
    })

})

