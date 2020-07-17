export function cacheControll(inputElement: any, lastCommands: string[]) {
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

export function updateConsole(_newOutput: string) {
    _newOutput = _newOutput.trim();
    var outputDiv = document.getElementById("output");
    if (_newOutput.toLowerCase() === "clear") {
        outputDiv.innerHTML = "";
    } else {
        outputDiv.innerHTML += "<p>> " + _newOutput + "</p>";
        //ScrollBar nach immer nach ganz unten
        var objDiv = document.getElementById("output");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}


