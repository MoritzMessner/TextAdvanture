"use strict";
class Player extends Character {
    /**
     * showBackpack
     * lists all items in user backpack
     */
    showBackpack() {
        for (let element of this.inventory) {
            updateConsole(element);
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