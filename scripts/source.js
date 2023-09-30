let dados = 0;
let sumatotal = 0;
let sumadealer = 0;
let dadosdealer = 0;
let dadosplayer = 0; 
let winrate = 0;
let cantidadPartidas = 0;
let partidasGanadas = 0;
let partidasPerdidas = 0;   
const registro = [];
let recuperarDatos = localStorage.getItem("partida")
if (recuperarDatos !== null) {
    registro.unshift(...JSON.parse(recuperarDatos)); //Uso de spread para desarmar el array de arrays
  }
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
            registro.push([0,sumatotal,sumadealer])
            document.getElementById("botonreset").hidden = false;
            document.getElementById("botonstats").hidden = false;
            localStorage.setItem("partida", JSON.stringify(registro));
            estadisticas()
        }
    })
}



function dealer() {
    document.querySelector("#botonquedarse").addEventListener("click", function () {
        document.querySelector('#botontirar').disabled = true;
        document.querySelector('#botonquedarse').disabled = true;
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
            registro.push([1,sumatotal,sumadealer])
        } else if (sumadealer >= sumatotal) {
            alert("Tu puntaje: " + sumatotal + ". El dealer sacó: " + sumadealer + ". El dealer gana");
            registro.push([0,sumatotal,sumadealer])
        } else {
            alert("Tu puntaje: " + sumatotal + ". El dealer sacó: " + sumadealer + ". ¡Ganaste!");
            registro.push([1,sumatotal,sumadealer])
        }
        document.getElementById("botonreset").hidden = false;
        document.getElementById("botonstats").hidden = false;
        localStorage.setItem("partida", JSON.stringify(registro));
        estadisticas();
    }
}
function estadisticas(){
cantidadPartidas = registro.length;
partidasGanadas = registro.reduce((sum, innerArray) => {
   return sum + innerArray[0];}, 0);
partidasPerdidas = cantidadPartidas - partidasGanadas;
winrate = parseInt((partidasGanadas / partidasPerdidas) * 100)
document.getElementById("partidaN").innerHTML = "Esta es la partida #" + cantidadPartidas;
};


    
function stats() {
    document.querySelector("#botonstats").addEventListener("click", function () {
        alert("Partidas jugadas: " + cantidadPartidas + " Victorias: " + partidasGanadas + " Derrotas " + partidasPerdidas + " %Victoria " + winrate + "%")
    })
    };



function reset() {
    document.querySelector("#botonreset").addEventListener("click", function () {
    dados = 0;
    sumatotal = 0;
    sumadealer = 0;
    dadosdealer = 0;
    dadosplayer = 0;
    currentSum = 0;
    console.log(registro); //el registro de todas las partidas jugadas sin recargar la pagina
    document.getElementById("resultadodealer").innerHTML ="";
    document.getElementById("resultadobox").innerHTML ="";
    document.querySelector('#botonquedarse').disabled = false;
    document.querySelector('#botontirar').disabled = false;
    document.getElementById("botonreset").hidden = true;
})}



    estadisticas();
    stats();
    reset();
    dealer();
    blackjack();