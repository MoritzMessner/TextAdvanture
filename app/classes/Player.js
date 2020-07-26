"use strict";
class Player extends Character {
    constructor(_room) {
        super();
        _room.setActiveRoom("startRaum");
        this.activeScene = _room.activeScene;
    }
    listItmes() {
        updateConsole("Ich sehe:");
        for (let element of this.activeScene.items) {
            updateConsole("> " + element);
        }
    }
    prepareToupdateConsole(_userMessage) {
        var parameterMessage = "";
        if (_userMessage.replace(/\s+/g, ' ').split(" ").length > 1) {
            console.log("in herte");
            var splitUserMessage = _userMessage.replace(/\s+/g, ' ').split(" ");
            parameterMessage = splitUserMessage[1].trim();
            console.log(parameterMessage);
            _userMessage = splitUserMessage[0].trim();
            _userMessage = _userMessage.trim().toLowerCase();
        }
        updateConsole(_userMessage + " " + parameterMessage);
        switch (_userMessage) {
            case "l":
            case "list":
                this.listItmes();
                break;
            case "clear":
                updateConsole(_userMessage);
                break;
            case "i":
            case "inventory":
                this.showBackpack();
                break;
            case "d":
            case "drop":
                this.dropItem(parameterMessage);
                break;
            default:
                updateConsole(_userMessage + " verstehe ich nicht!");
        }
    }
    /**
     * showBackpack
     * lists all items in user backpack
     */
    showBackpack() {
        updateConsole("In meinem Inventar ist:");
        for (let element of this.inventory) {
            updateConsole("> " + element);
        }
    }
    /**
     * take
     * method to add an item to the inventory
     */
    take(_item) {
        //todo check if items is in room
        updateConsole(_item + " sehe ich hier leider nicht");
    }
    /**
     * talkTo
       talks to an npc and outpputs a random phrase
    **/
    talkTo(_direction) {
    }
    /**
     * walk
       changes active scene to a new one
    **/
    walk(_direction) {
    }
    /**
     * lookAT
     *  outputs a random string about the desired object
    **/
    lookAT(_objectToLookAt) {
    }
    dropItem(_itemToDrop) {
        _itemToDrop = _itemToDrop.trim();
        if (this.inventory.includes(_itemToDrop)) {
            this.inventory.splice(this.inventory.indexOf(_itemToDrop), 1);
            // Im UML muss das Item noch dem room hinzugefügt werden
            updateConsole(_itemToDrop + " wurde erfolgreich fallen gelassen");
        }
        else {
            // todo 
            // send to console update controller
            updateConsole(_itemToDrop + " ist leider nicht im Inventar");
        }
    }
}
//# sourceMappingURL=Player.js.map