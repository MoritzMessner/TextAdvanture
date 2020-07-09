window.onload = async function() {
        var el = document.getElementsByClassName("felx-item")[0];
        el.classList.add('show');
        el.classList.remove('hide');


        var input = document.getElementById("playerConsole");
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                var inputElement = document.getElementById("playerConsole");
                var userMessage = inputElement.value;
                var outputDiv = document.getElementById("output");

                inputElement.value = "";

                outputDiv.innerHTML += "<p>> " + userMessage + "</p>";
                /*var spllitInput = userMessage.split("");

                for (var i = 0; i < spllitInput.length; i++) {
                    outputDiv.innerHTML += spllitInput[i];
                    await sleep(i * 10000);
                }
                outputDiv.innerHTML += "</p>";
                */
            }


            //ScrollBar nach immer nach ganz unten
            var objDiv = document.getElementById("output");
            objDiv.scrollTop = objDiv.scrollHeight;

        });

    }
    /*
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    */