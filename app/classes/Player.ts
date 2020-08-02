class Player extends Character {

    private activeScene: Scene; 

    constructor() {
        super();
        this.activeScene = new Scene;
        this.activeScene.load("./../rooms/room1.json");
        this.health = 15;
        this.staerke = 5;
    }

 

    public prepareToupdateConsole(_userMessage: string): void {
        var parameterMessage = "";
        if (_userMessage.replace(/\s+/g, ' ').split(" ").length > 1) {
            var splitUserMessage = _userMessage.replace(/\s+/g, ' ').split(" ");
            parameterMessage = splitUserMessage[1].trim();
            _userMessage = splitUserMessage[0].trim();
            _userMessage = _userMessage.trim().toLowerCase();
        }
        updateConsole("<span style='color:#ff4040'>" + _userMessage + " " + parameterMessage + "</span>");
        this.switchUserInput(_userMessage, parameterMessage);
    }

    private switchUserInput(_userMessage: string, _parameterMessage: string = ""): void {
        switch (_userMessage.toLocaleLowerCase()) {
            case "l":
            case "look":
                if (_parameterMessage.trim() === "")
                    this.listRoom();
                else
                    this.lookAT(_parameterMessage);
                break;
            case "clear":
                updateConsole(_userMessage);
                break;
            case "c":
            case "commands":
                this.listCommands();
                break;
            case "d":
            case "description":
                updateConsole(this.activeScene.getRoomDescrtiption());
                break;
            case "i":
            case "inventory":
                this.showBackpack();
                break;
            case "dr":
            case "drop":
                this.dropItem(_parameterMessage);
                break;
            case "t":
            case "take":
                this.take(_parameterMessage);
                break;
            case "talk":
                this.talkTo(_parameterMessage);
                break;
            case "w":
            case "walk":
                this.walk(_parameterMessage);
                break;
            case "a":
            case "attack":
                this.attack(_parameterMessage);
                break;
            default:
                updateConsole(_userMessage + " verstehe ich nicht!");
        }
    }

    private listRoom() {
        updateConsole("Ich sehe:");
        updateConsole("<span style='color:yellow'>Gegenstände</span>");
        for (let element of this.activeScene.getItems()) {
            updateConsole("Name: " + element.name);
        }

        updateConsole("<span style='color:yellow'>Personen oder Monster</span>");
        for (let element of this.activeScene.getNpcs()) {
            updateConsole("Name: " + element.name);
        }
        updateConsole("<span style='color:yellow'>Ausgänge</span>");
        for (let element of this.activeScene.getConnections()) {
            updateConsole("Einen Ausgang nach " + element);
        }
    }

    private listCommands(): void {
        updateConsole("attack(a) {who}");
        updateConsole("cIear");
        updateConsole("commands(c)");
        updateConsole("description(d)");
        updateConsole("drop(dr) {object}");
        updateConsole("inventory(i)");
        updateConsole("look(l) ?{object}");
        updateConsole("take(t) {object}");
        updateConsole("talk {who}");
        updateConsole("walk(w) {where}");
    }

    private showBackpack(): void {
        updateConsole("In meinem Inventar ist:")
        for (let element of this.inventory) {
            updateConsole("Name: " + element.name);
            updateConsole("Schaden: " + element.schaden);
            updateConsole("Beschreibung: " + element.beschreibung);
        }
    }

    private checkPlayerHealth(): void {
        if (this.health <= 0) {
            updateConsole("Du wurdest getötet");
            location.reload();
        }
    }


    private attack(_npc: string): void {
        let checkFlag: boolean = false;
        for (let element of this.activeScene.getNpcs()) {
            if (element.name.toLowerCase() == _npc.toLowerCase()) {
                let diff: number = this.staerke - element.staerke;
                if (diff >= 0) {
                    element.health -= diff;
                    updateConsole("Du hast " + _npc + " " + diff + " Schaden hinzugefügt");
                } else {
                    this.health += diff;
                    updateConsole(_npc.toLocaleUpperCase() + " hat dir " + diff * (-1) + " Schaden hinzugefügt");
                }
                if (element.health <= 0) {
                    for (let item of element.inventory) {
                        this.activeScene.addItem(new Item(item.name, item.schaden, item.beschreibung));
                    }
                    this.activeScene.killNpc(_npc);
                    updateConsole(_npc + " wurde getötet");
                }
                this.checkPlayerHealth();
                checkFlag = true;
            }
        }
        if (!checkFlag)
            updateConsole(_npc + " sehe ich hier leider nicht");
    }

    private take(_item: string): void {
        //todo check if items is in room
        let checkFlag: boolean = false;
        for (let element of this.activeScene.getItems()) {
            if (element.name.toLowerCase() == _item.toLowerCase()) {
                checkFlag = true;
                updateConsole("Du hast " + element.schaden + " Stärke hinzubekommen");
                this.staerke += element.schaden;
                this.inventory.push(element);
                this.activeScene.removeItem(_item);

            }
        }
        if (!checkFlag)
            updateConsole(_item + " sehe ich hier leider nicht");
        else
            updateConsole(_item + " aufgehoben");

    }

    private talkTo(_npc: string): void {
        let checkFlag: boolean = false;
        for (let element of this.activeScene.getNpcs()) {
            if (element.name.toLowerCase() == _npc.toLowerCase()) {
                checkFlag = true;
                updateConsole(element.interactions[Math.floor((Math.random() * element.interactions.length))])
            }
        }
        if (!checkFlag)
            updateConsole(_npc + " sehe ich hier leider nicht");

    }

    private walk(_direction: string): void {
        let checkFlag: boolean = false;
        for (let connection of this.activeScene.getConnections()) {
            if (connection.toLowerCase() == _direction.toLowerCase()) {
                checkFlag = true;
                this.activeScene.setActiveRoom(_direction.toLowerCase());
            }
        }
        if (!checkFlag)
            updateConsole(_direction + " sehe ich hier leider nicht");
    }



    private lookAT(_objectToLookAt: string) {
        let checkFlag: boolean = false;
        for (let element of this.activeScene.getItems()) {
            if (element.name.toLowerCase() == _objectToLookAt.toLocaleLowerCase()) {
                checkFlag = true;
                updateConsole("Name: " + element.name);
                updateConsole("Schaden: " + element.schaden);
                updateConsole("Beschreibung: " + element.beschreibung);
            }
        }
        if (checkFlag === false) {
            for (let element of this.activeScene.getNpcs()) {
                if (element.name.toLowerCase() == _objectToLookAt.toLocaleLowerCase()) {
                    updateConsole("Wenn ich " + element.name + " näher anschaue sieht er/sie aus wie " + element.alter + " Jahre." + element.beschreibung);
                    updateConsole("Leben: " + element.health);
                    updateConsole("Stärke: " + element.staerke);
                    checkFlag = true;
                }
            }
        }
        if (!checkFlag)
            updateConsole(_objectToLookAt + " sehe ich hier leider nicht");
    }

    private dropItem(_itemToDrop: string): void {
        _itemToDrop = _itemToDrop.trim();
        let checkFlag: boolean = false;
        let counter: number = 0;
        for (let element of this.inventory) {
            if (element.name.toLowerCase() == _itemToDrop.toLocaleLowerCase()) {
                this.staerke -= element.schaden;
                updateConsole("Du hast " + element.schaden + " Stärke verloren");
                this.activeScene.addItem((new Item(element.name, element.schaden, element.beschreibung)));
                this.inventory.splice(counter, 1);
                checkFlag = true;

            }
            counter++;

        }

        if (!checkFlag)
            updateConsole(_itemToDrop + " ist nicht im Rucksack");
        else
            updateConsole(_itemToDrop + " abgelegt");
    }

}