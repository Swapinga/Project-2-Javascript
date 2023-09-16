let dados = 0;
let sumatotal = 0;
let sumadealer = 0;
let dadosdealer = 0;
let dadosplayer = 0;
const registro = [];
function blackjack() {
    document.querySelector("#botontirar").addEventListener("click", function () {
        dados = parseInt(document.getElementById("numero").value);

        if (dados > 0 && sumadealer === 0) {
            let currentSum = 0;
            for (let i = 0; i < dados; i++) {
                currentSum += Math.floor(Math.random() * 6) + 1;
            }
            sumatotal += currentSum;
            dadosplayer += dados;
            document.getElementById("resultadobox").innerHTML = "Tiraste " + dadosplayer + " dados y sumaste " + sumatotal + " puntos";
        }
        else if (sumadealer === 0){alert("El numero de dados debe ser mayor a 0")}
        if (sumatotal > 21 && sumadealer === 0){
            alert("Te pasaste de 21! El dealer gana")
            registro.push([false,sumatotal,sumadealer])
            reset()
        }
    })
}

blackjack();

function dealer() {
    document.querySelector("#botonquedarse").addEventListener("click", function () {
        let interval = setInterval(function () {
            if (sumadealer >= 21 || sumadealer > sumatotal) {
                clearInterval(interval);
                mostrarResultadoDealer();
            } else {
                sumadealer += Math.floor(Math.random() * 6) + 1;
                dadosdealer++;
                document.getElementById("resultadodealer").innerHTML = "El dealer tiro " + dadosdealer + " dados y sumo " + sumadealer + " puntos";
            }
        }, 2000); // 2000 milisegundos (2 segundos) entre cada tirada
    });

    function mostrarResultadoDealer() {
        document.getElementById("resultadodealer").innerHTML = "El dealer tiro " + dadosdealer + " dados y sumo " + sumadealer + " puntos";

        if (sumadealer > 21) {
            alert("El dealer se pasó de 21. ¡Ganaste!");
            registro.push([true,sumatotal,sumadealer])
            reset()
        } else if (sumadealer >= sumatotal) {
            alert("Tu puntaje: " + sumatotal + ". El dealer sacó: " + sumadealer + ". El dealer gana");
            registro.push([false,sumatotal,sumadealer])
            reset()
        } else {
            alert("Tu puntaje: " + sumatotal + ". El dealer sacó: " + sumadealer + ". ¡Ganaste!");
            registro.push([true,sumatotal,sumadealer])
            reset()
        }
    }
}
function reset() {
    dados = 0;
    sumatotal = 0;
    sumadealer = 0;
    dadosdealer = 0;
    dadosplayer = 0;
    currentSum = 0;
    console.log(registro); //el registro de todas las partidas jugadas sin recargar la pagina
}


    dealer();