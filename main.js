function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function clearBox(e){
      document.getElementById(e).innerHTML = "";
  }


{

    async function handlebtnSubmit(type){
        clearBox('pokeCards')
        let info = await getPokeInfo(type, 'type')
        pokeCardType(info)

    }

    let form = document.getElementById('pokeForm')
    async function handleSubmit(e){
        e.preventDefault();
        clearBox('pokeCards')
        let pokeInput = document.getElementById("pokeInput").value;
        let searchBy = e.target.searchBy.value;
        let info = await getPokeInfo(pokeInput, searchBy)
        if (searchBy === "type"){
        pokeCardType(info)}
        else if(searchBy === 'generation'){
            pokeCardGenration(info)
        }
        else if(searchBy ==='move'){
            pokeCardMove(info)
        }
        else{
            pokeCard(info)
        }
    }
    async function getPokeInfo(pokeInput, searchBy){
        let res = await fetch(`https://pokeapi.co/api/v2/${searchBy}/${pokeInput}`)
        let data = await res.json()
        return data
    }
    async function getPokeInfo2(pokemon_url){
        let res =await fetch(pokemon_url)
        let data = await res.json();
        pokeCard(data)
    }
    function pokeCardType(pokeObj){  
        type_url = pokeObj.pokemon
            for(let i in type_url){
                pokemon_url = type_url[i].pokemon.url
                getPokeInfo2(pokemon_url)
            }
        }
    function pokeCardGenration(pokeObj){
        gen_url = pokeObj.pokemon_species
        for(let i in gen_url){
            pokeName = gen_url[i].name
            getPokeInfo2(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
        }
    }
    function pokeCardMove(pokeObj){
       move_url = pokeObj.learned_by_pokemon
       for(let i in move_url){
        getPokeInfo2(move_url[i].url)
       } 
    }

    function pokeCard(pokeObj){
            let card = document.createElement('div')
            card.className = 'card';
            card.style = 'width: 18 rem';
            let defaultImg = document.createElement('img')
            defaultImg.src = "./static/pokeball2.png"
            let cardImg = document.createElement('img')
            cardImg.className = "card-img-top";
            cardImg.src = pokeObj.sprites.front_default  !== null ? pokeObj.sprites.front_default : defaultImg.src
            card.append(cardImg)
            let cardBody = document.createElement('div')
            cardBody.className = "card-body"
            let cardTItle = document.createElement('h4')
            cardTItle.className = 'card-title'
            cardTItle.innerHTML = capitalizeFirstLetter(pokeObj.name)
            let pokeId = document.createElement('h6')
            pokeId.innerHTML = `ID# ${pokeObj.id}`
            let pokeHeight = document.createElement('h6')
            pokeHeight.innerHTML = `Height: ${pokeObj.height}`
            let pokeWeight = document.createElement('h6')
            pokeWeight.innerHTML = `Weight: ${pokeObj.weight}`
            let btnControl = document.createElement('div')
            btnControl.className = 'container d-flex justify-content-evenly'

            cardBody.append(cardTItle)
            cardBody.append(pokeId)
            cardBody.append(pokeHeight)
            cardBody.append(pokeWeight)

            for(i in pokeObj.types){
            var type = pokeObj.types[i].type.name
            var pokeType = document.createElement('button')
            pokeType.innerHTML = type
            pokeType.value = type


            if (type == 'electric'){
                pokeType.className = 'btn btn-warning btn-lg typeBtn'
            }
            else if(type == 'ground'){
                pokeType.className = 'btn btn-warning btn-lg typeBtn'
            }
            else if(type == 'normal'){
                pokeType.className = 'btn btn-secondary btn-lg typeBtn'
            }
            else if(type == 'fire'){
                pokeType.className = 'btn btn-danger btn-lg typeBtn'
            }
            else if(type == 'fighting'){
                pokeType.className = 'btn btn-danger btn-lg typeBtn'
            }
            else if(type == 'flying'){
                pokeType.className = 'btn btn-info btn-lg typeBtn'
            }
            else if(type == 'poison'){
                pokeType.className = 'btn btn-success btn-lg typeBtn'
            }
            else if(type == 'rock'){
                pokeType.className = 'btn btn-warning btn-lg typeBtn'
            }
            else if(type == 'bug'){
                pokeType.className = 'btn btn-success btn-lg typeBtn'
            }
            else if(type == 'steel'){
                pokeType.className = 'btn btn-secondary btn-lg typeBtn'
            }
            else if(type == 'ghost'){
                pokeType.className = 'btn btn-dark btn-lg typeBtn'
            }
            else if(type == 'water'){
                pokeType.className = 'btn btn-primary btn-lg typeBtn'
            }
            else if(type == 'grass'){
                pokeType.className = 'btn btn-success btn-lg typeBtn'
            }
            else if(type == 'psychic'){
                pokeType.className = 'btn btn-danger btn-lg typeBtn'
            }
            else if(type == 'ice'){
                pokeType.className = 'btn btn-info btn-lg typeBtn'
            }
            else if(type == 'dragon'){
                pokeType.className = 'btn btn-primary btn-lg typeBtn'
            }
            else if(type == 'dark'){
                pokeType.className = 'btn btn-dark btn-lg typeBtn'
            }
            else if(type == 'fairy'){
                pokeType.className = 'btn btn-danger btn-lg typeBtn'
            }
            else if(type == 'shadow'){
                pokeType.className = 'btn btn-dark btn-lg typeBtn'
            }
            else{
                pokeType.className = 'btn btn-secondary btn-lg typeBtn'
            }
        pokeType.id = 'type_id'
        // pokeType.addEventListener('click', handlebtnSubmit(type))

        btnControl.append(pokeType)
        }
            let moreInfo = document.createElement('a')
            moreInfo.innerHTML = 'More>>>'
            moreInfo.href = '#'
            moreInfo.setAttribute('data-bs-toggle', 'modal')
            moreInfo.setAttribute('data-bs-target', 'myModal')
            cardBody.append(btnControl)
            cardBody.append(moreInfo)
            card.append(cardBody)

            let modalDiv = document.createElement('div')
            modalDiv.className = 'modal fade'
            modalDiv.id = "myModal"
            modalDiv.tabindex= "-1"
            modalDiv.setAttribute('aria-labelledby', 'myModal')
            modalDiv.setAttribute('aia-label', 'true')
            let modalDialouge = document.createElement('div')
            modalDialouge.className= "modal-dialog"
            let modalContent = document.createElement('div')
            modalContent.className = 'modal-content'
            let modalHeader =document.createElement('div')
            modalHeader.className = "modal-header"
            let modalTitle = document.createElement('h5')
            modalTitle.className = 'modal-title'
            modalTitle.id = "myModalLabel"
            modalTitle.innerHTML = capitalizeFirstLetter(pokeObj.name)
            let headerBtn = document.createElement('button')
            headerBtn.className = 'btn-close'
            headerBtn.setAttribute('data-bs-dismiss', 'modal')
            headerBtn.setAttribute('aria-label', 'Close')
            modalHeader.append(modalTitle)
            modalHeader.append(headerBtn)
            let modalBody = document.createElement('div')
            modalBody.className = "modal-body"
            let lst = document.createElement('ul')
            let stats = pokeObj.stats
            for (let i in stats){
                let bullets = document.createElement('li')
                bullets.innerhtml= `${stats[i].stat.name}: ${stats[i].base_stat}`
            }
            lst.append(stats)
            modalBody.append(lst)
            let modalFooter = document.createElement('div')
            modalFooter.className = 'modal-footer'
            let close = document.createElement('button')
            close.className = "btn btn-danger"
            close.type= "button"
            close.setAttribute('data-bs-dismiss', 'modal')
            close.innerHTML = "Close"
            modalFooter.append(close)
            modalContent.append(modalHeader)
            modalContent.append(modalBody)
            modalContent.append(modalFooter)
            modalDialouge.append(modalContent)
            modalDiv.append(modalDialouge)



            let col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-3'
            col.append(card)
            document.getElementById('pokeCards').append(col)
            document.getElementById('pokeCards').append(modalDiv)

    }



    form.addEventListener('submit', handleSubmit);

 }
