System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    exports_1("cacheControll", cacheControll);
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
    exports_1("updateConsole", updateConsole);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=updateCanvas.js.map