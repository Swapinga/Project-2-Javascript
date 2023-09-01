let dados = 0;
let sumatotal = 0;

function blackjack() {
    document.querySelector(".button").addEventListener("click", function () {
        dados = parseInt(document.getElementById("numero").value);

        if (dados > 0) {
            let currentSum = 0;
            for (let i = 0; i < dados; i++) {
                currentSum += Math.floor(Math.random() * 6) + 1;
            }

            sumatotal += currentSum;

            document.getElementById("resultadobox").innerHTML = "Tiraste " + dados + " dados y sumaste " + sumatotal + " puntos";
        }
        else {alert("El numero de dados debe ser mayor a 0")}
        if (sumatotal > 21){
            alert("Te pasaste de 21! El dealer gana")
        }
    })

}

blackjack();

