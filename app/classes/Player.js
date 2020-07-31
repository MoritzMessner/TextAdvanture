"use strict";
class Player extends Character {
    constructor(_room) {
        super();
        this.activeScene = _room;
        this.health = 15;
        this.strength = 5;
    }
    listRoom() {
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
    listCommands() {
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
    prepareToupdateConsole(_userMessage) {
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
    switchUserInput(_userMessage, _parameterMessage = "") {
        switch (_userMessage) {
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
    showBackpack() {
        updateConsole("In meinem Inventar ist:");
        for (let element of this.inventory) {
            updateConsole("Name: " + element.name);
            updateConsole("Schaden: " + element.schaden);
            updateConsole("Beschreibung: " + element.beschreibung);
        }
    }
    checkPlayerHealth() {
        if (this.health <= 0) {
            updateConsole("Du wurdest getötet");
            location.reload();
        }
    }
    attack(_npc) {
        let checkFlag = false;
        for (let element of this.activeScene.getNpcs()) {
            if (element.name.toLowerCase() == _npc.toLowerCase()) {
                let diff = this.strength - element.staerke;
                if (diff >= 0) {
                    element.health -= diff;
                    updateConsole("Du hast " + _npc + " " + diff + " Schaden hinzugefügt");
                }
                else {
                    this.health += diff;
                    updateConsole(_npc.toLocaleUpperCase() + " hat dir " + diff * (-1) + " Schaden hinzugefügt");
                }
                if (element.health <= 0) {
                    for (let item of element.inventory) {
                        this.activeScene.addItem(item);
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
    take(_item) {
        //todo check if items is in room
        let checkFlag = false;
        for (let element of this.activeScene.getItems()) {
            if (element.name.toLowerCase() == _item.toLowerCase()) {
                checkFlag = true;
                updateConsole("Du hast " + element.schaden + " Stärke hinzubekommen");
                this.strength += element.schaden;
                this.inventory.push(element);
                this.activeScene.removeItem(_item);
            }
        }
        if (!checkFlag)
            updateConsole(_item + " sehe ich hier leider nicht");
        else
            updateConsole(_item + " aufgehoben");
    }
    talkTo(_npc) {
        let checkFlag = false;
        for (let element of this.activeScene.getNpcs()) {
            if (element.name.toLowerCase() == _npc.toLowerCase()) {
                checkFlag = true;
                updateConsole(element.interactions[Math.floor((Math.random() * element.interactions.length))]);
            }
        }
        if (!checkFlag)
            updateConsole(_npc + " sehe ich hier leider nicht");
    }
    walk(_direction) {
        let checkFlag = false;
        for (let connection of this.activeScene.getConnections()) {
            if (connection.toLowerCase() == _direction.toLowerCase()) {
                checkFlag = true;
                this.activeScene.setActiveRoom(_direction.toLowerCase());
            }
        }
        if (!checkFlag)
            updateConsole(_direction + " sehe ich hier leider nicht");
    }
    lookAT(_objectToLookAt) {
        let checkFlag = false;
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
    dropItem(_itemToDrop) {
        _itemToDrop = _itemToDrop.trim();
        let checkFlag = false;
        let counter = 0;
        for (let element of this.inventory) {
            if (element.name.toLowerCase() == _itemToDrop.toLocaleLowerCase()) {
                this.strength -= element.schaden;
                updateConsole("Du hast " + element.schaden + " Stärke verloren");
                this.activeScene.addItem(element);
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
//# sourceMappingURL=Player.js.map