let $main = document.getElementsByTagName('main')[0];
let $h1 = document.querySelector('h1');
let $inputText = document.querySelector('input[type="number"]');
let $form = document.getElementsByTagName('form')[0];
//usamos un fragment para evitar el reflow
let fragment = document.createDocumentFragment();
let array = [];
let selection = [];
let tries = 1;
let finish = 0;
let n = 0;
//creamos tantas tarjetas como numero coloquemos en el input
$form.addEventListener('submit', function(e){
    e.preventDefault();
    n = $inputText.value;
    $inputText.value = "";
    array = [];
    //creamos dos tarjetas iguales
    for (let i = 0; i< n; i++) {
        array.push(i);
        array.push(i);
    }
    //desordenamos las tarjetas
    array.sort(() => Math.random() - 0.5);
    //antes del forEach creamos un contador para que cada tarjeta tenga un id distinto
    let counter = 0;
    array.forEach(e => {
        let div = document.createElement('div');
        div.setAttribute('id', counter)
        div.setAttribute('onclick', `spin(${counter})`);
        div.setAttribute('class', e+1);
        div.innerHTML = `
        <span class="behind">atras</span>
        <span class="face">${e+1}</span>`
        fragment.appendChild(div)
        counter++;
    })
    //vaciamos el contenedor e insertamos el fragment
    $main.innerHTML = "";
    $main.appendChild(fragment);
})

function spin(e){
    let card = document.getElementById(e);
    //si la carta no está dada vuelta la giramos y la agregamos a la selección
    if(card.style.transform != "rotateY(180deg)"){
        card.style.transform = "rotateY(180deg)";
        selection.push(
            {id : card.id,
            class : card.classList.value}
        );
    }
    //si hay dos cartas seleccionadas
    if(selection.length==2){
        let card1 = selection[0]
        let card2 = selection[1]
        //si son iguales cambiamos su estilo, su cursor y las hacemos no seleccionables
        if(card1.class==card2.class){
            setTimeout(function(){
                let cards = document.getElementsByClassName(card1.class)
                cards[0].children[1].style.backgroundColor = "yellow"
                cards[0].children[1].style.userSelect = "none";
                cards[0].style.cursor = "default";
                cards[1].children[1].style.backgroundColor = "yellow"
                cards[1].children[1].style.userSelect = "none";
                cards[1].style.cursor = "default";
            },1000);
            finish ++;
            setTimeout(function(){
                if (finish == n){
                    if(tries > 1){
                        $main.innerHTML += `<section class="finish">
                            <h1>Congratulations!</h1>
                            <p>You finished in only ${tries} tries</p>
                            <button id="close">Play Again</button>
                            </section>`;
                    }
                    else{
                        $main.innerHTML += `<section class="finish">
                        <h1>WOW! Are you a Machine?!</h1>
                        <p>You finished in only ${tries} try</p>
                        <p>Congratulations!</p>
                        <button id="close">Play Again</button>
                        </section>`;
                    }
                    finish = 0;
                    tries = 1;
                    $h1.innerHTML = `Tries:`;
                }
            },1500);
        }
        //si son distintas las volvemos a girar
        else{
            tries ++;
            $h1.innerHTML = `Tries: ${tries}`;
            setTimeout(function(){
                document.getElementById(card1.id).style.transform = "rotateY(0deg)";
                document.getElementById(card2.id).style.transform = "rotateY(0deg)";
            },1000);
        }
        //vaciamos la seleccion
        selection = [];
        console.log(finish)
        console.log(n)
    }
}

$main.addEventListener("click", function(e){
    console.log(e.target)
    if (e.target == document.getElementById('close')){
        close();
    }
})
function close(){
    $main.innerHTML = ''
}