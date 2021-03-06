"use strict";
var lastCommands = [];
var inputElement;
document.addEventListener("DOMContentLoaded", async () => {
    var player = new Player();
    inputElement = document.getElementById("playerConsole");
    inputElement.addEventListener("keyup", function (event) {
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
//# sourceMappingURL=main.js.map