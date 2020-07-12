var lastCommands = [];
var inputElement;
window.onload = function () {
    var el = document.getElementsByClassName("felx-item")[0];
    el.classList.add('show');
    el.classList.remove('hide');
    inputElement = document.getElementById("playerConsole");
    inputElement.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            var userMessage = inputElement.value;
            var outputDiv = document.getElementById("output");
            lastCommands.push(userMessage);
            inputElement.value = "";
            outputDiv.innerHTML += "<p>> " + userMessage + "</p>";
            cacheControll(inputElement);
        }
        //ScrollBar nach immer nach ganz unten
        var objDiv = document.getElementById("output");
        objDiv.scrollTop = objDiv.scrollHeight;

    });
}

function cacheControll(inputElement) {
    var index = 0;
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 38:
                if (index < lastCommands.length) {
                    inputElement.value = lastCommands[lastCommands.length - index - 1];
                    if (index !== lastCommands.length - 1)
                        index++;
                }
                break;
            case 40:
                if (index > 0) {
                    index--;
                    inputElement.value = lastCommands[lastCommands.length - index - 1];
                }
                break;

        }

    };
}
