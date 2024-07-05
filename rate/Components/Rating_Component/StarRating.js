
let template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="Components/Rating_Component/StarRating.css">

    <div class="container">
        
    </div>
`

class StarRating extends HTMLElement{

    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        

       this.starOnMouseEnter = this.starOnMouseEnter.bind(this)
       this.containerOnMouseLeave = this.containerOnMouseLeave.bind(this)
    }
    
    connectedCallback(){

        for( let i=0;i<5;i++)
            this.shadowRoot.querySelector('.container').insertAdjacentHTML('beforeend',this.starTemplate)

        this.#allStarSvgs= Object.values(this.shadowRoot.querySelectorAll('.star .star-icon'))
        
        this.shadowRoot.querySelector('.container').addEventListener('mouseleave',this.containerOnMouseLeave)
            this.#allStarSvgs.forEach( (starSvg,index)=>{
            starSvg.setAttribute("data-number",`${index + 1}`)
            starSvg.addEventListener('mouseenter',this.starOnMouseEnter)
            starSvg.addEventListener('click',this.starOnClick.bind(this,starSvg.dataset.number))
        })

    }

    attributeChangedCallback(){}

    disconnectedCallback(){

        this.shadowRoot.querySelector('.container').removeEventListener('mouseleave',this.containerOnMouseLeave)
        this.#allStarSvgs.forEach(starSvg => starSvg.removeEventListener('mouseenter',this.starOnMouseEnter))

    }


    static get observedAttributes(){

        return []
    }

    starOnMouseEnter(event){
         this.#allStarSvgs.forEach(starSvg=>starSvg.classList.remove('hover'))
        
         this.#allStarSvgs.forEach(starSvg =>{
                 if(starSvg.dataset.number <= event.target.dataset.number)
                        starSvg.classList.add('hover') 
                     
                })
       
    }

    starOnClick(number,event){
        
        if(!this.#clicked){
            
            this.#clicked=true
            this.#allStarSvgs.forEach(starSvg =>{
            
            if(starSvg.dataset.number <= number)
                starSvg.classList.add('hover')
            })
        }
        else if(this.#clicked){
            
            this.#clicked=false
            this.#allStarSvgs.forEach(starSvg => starSvg.classList.remove('hover'))
        }
    }

    containerOnMouseLeave(){
        if(!this.#clicked)
            this.#allStarSvgs.forEach(starSvge=> starSvge.classList.remove('hover'))
    }

    #allStarSvgs

    #clicked=false




   starTemplate = `<div class="star">
        <svg class="star-icon" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	    viewBox="0 0 47.94 47.94" xml:space="preserve">
        <path  d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
	    c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
	    c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
	    c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
	    c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
	    C22.602,0.567,25.338,0.567,26.285,2.486z"/>
        </svg>
   </div>`

}


export {StarRating}