
var lastCommands: string[] = [];
var inputElement: any;


document.addEventListener("DOMContentLoaded", () => {

    var el = document.getElementsByClassName("felx-item")[0];
    el.classList.add('show');
    el.classList.remove('hide');
    inputElement = document.getElementById("playerConsole");
    inputElement.addEventListener("keyup", function (event: any) {
        if (event.keyCode === 13) {
            var userMessage = inputElement.value;
            lastCommands.push(userMessage);
            inputElement.value = "";
            updateConsole(userMessage);
            cacheControll(inputElement, lastCommands);
        }
    });
    updateConsole("systemHello");
    updateConsole("systemHello");
    updateConsole("Hallo");
    updateConsole("Welt");
    updateConsole("und");
    updateConsole("so");
    let player = new Player();
    player.inventory = ["Schwert", "Schild", "Stift"];
    player.showBackpack();
    player.dropItem("Schwert    ");
    player.dropItem("Schild    ");
    player.dropItem("Hose    ");
    player.take("Buch");
    player.showBackpack();


});