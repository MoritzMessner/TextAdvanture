 class Player extends Character {



    /**
     * showBackpack
     * lists all items in user backpack
     */
    public showBackpack() {
        for (let element of this.inventory) {
            updateConsole(element);
        }
    }


    /**
     * take
     * method to add an item to the inventory
     */
    public take(_item: string): void {
        //todo check if items is in room

        updateConsole(_item + " sehe ich hier leider nicht");
    }



    /**
     * talkTo
       talks to an npc and outpputs a random phrase    
    **/
    public talkTo(_direction: string): void {

    }


    /**
     * walk
       changes active scene to a new one    
    **/
    public walk(_direction: string): void {

    }


    /**
     * lookAT
     *  outputs a random string about the desired object     
    **/
    public lookAT(_objectToLookAt: string) {


    }


    public dropItem(_itemToDrop: string): void {
        _itemToDrop = _itemToDrop.trim();
        if (this.inventory.includes(_itemToDrop)) {
            this.inventory.splice(this.inventory.indexOf(_itemToDrop),1);
            // Im UML muss das Item noch dem room hinzugefügt werden
            updateConsole(_itemToDrop + " wurde erfolgreich fallen gelassen");
        } else {
            // todo 
            // send to console update controller
            updateConsole(_itemToDrop + " ist leider nicht im Inventar");

        }

    }

}