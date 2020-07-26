
var lastCommands: string[] = [];
var inputElement: any;

document.addEventListener("DOMContentLoaded", () => {

    let scene = new Scene();
    var player = new Player(scene);
    player.inventory = ["Schwert", "Schild", "Stift"];

    inputElement = document.getElementById("playerConsole");
    inputElement.addEventListener("keyup", function (event: KeyboardEvent) {
        if (event.keyCode === 13) {
            var userMessage = inputElement.value;
            lastCommands.push(userMessage);
            inputElement.value = "";
            player.prepareToupdateConsole(userMessage);
            cacheControll(inputElement, lastCommands);
        }
    });

   
    

    var el = document.getElementsByClassName("hide")[0];
    el.classList.add('show');
    el.classList.remove('hide');



});
