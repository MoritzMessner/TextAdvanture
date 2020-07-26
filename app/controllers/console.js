"use strict";
function cacheControll(inputElement, lastCommands) {
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
function updateConsole(_newOutput) {
    _newOutput = _newOutput.trim();
    var outputDiv = document.getElementById("output");
    if (_newOutput.toLowerCase() === "clear") {
        outputDiv.innerHTML = "";
    }
    else {
        outputDiv.innerHTML += "<p>> " + _newOutput + "</p>";
        //ScrollBar nach immer nach ganz unten
        var objDiv = document.getElementById("output");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}
/* todo typewriter effect
function typeWriter(_newOutput: string, i: number): any {
    var speed: number = Math.floor(Math.random() * 70) + 10;
    var outputDiv = document.getElementById("output");
    if (i < _newOutput.length) {
        outputDiv.innerHTML += _newOutput.charAt(i);
        i++;
        setTimeout(typeWriter(_newOutput, i), speed);
    }
    if (i == _newOutput.length) {
        outputDiv.innerHTML += "<p>> " + _newOutput + "</p>";
    }
}
*/
//# sourceMappingURL=console.js.map