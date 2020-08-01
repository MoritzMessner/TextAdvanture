"use strict";
class Scene {
    constructor() {
        this.items = [];
        this.connections = [];
        this.npcs = [];
        this.roomName = "";
        this.roomDescription = "";
        this.roomCache = {};
    }
    getNpcs() {
        return this.npcs;
    }
    killNpc(_name) {
        let counter = 0;
        for (let element of this.getNpcs()) {
            if (element.name.toLowerCase() == _name) {
                this.npcs.splice(counter, 1);
            }
            counter++;
        }
    }
    getConnections() {
        return this.connections;
    }
    getRoomDescrtiption() {
        return this.roomDescription;
    }
    getItems() {
        return this.items;
    }
    addItem(_item) {
        this.items.push(_item);
    }
    removeItem(_itemToRemove) {
        let counter = 0;
        for (let element of this.getItems()) {
            if (element.name.toLowerCase() == _itemToRemove) {
                this.items.splice(counter, 1);
            }
            counter++;
        }
    }
    async load(_filename) {
        let response = await fetch(_filename);
        let text = await response.text();
        let json = JSON.parse(text);
        this.json = json;
        this.setActiveRoom("schlafzimmer");
    }
    npcChangeRoom() {
        let counter = 0;
        for (let element of this.getNpcs()) {
            if (element.smart === true) {
                var randRoom = this.connections[Math.floor(Math.random() * this.connections.length)];
                if (this.roomCache[randRoom.toLocaleLowerCase()] !== undefined) {
                    this.roomCache[randRoom.toLocaleLowerCase()].npcs.push(element);
                    this.npcs.splice(counter, 1);
                }
            }
            counter++;
        }
    }
    setActiveRoom(_roomName) {
        if (this.roomCache[_roomName.toLocaleLowerCase()] !== undefined) {
            this.getRoomCache(_roomName);
            this.npcChangeRoom();
            updateConsole(this.getRoomDescrtiption());
        }
        else {
            for (let element in this.json) {
                if (element === _roomName) {
                    this.switchJson(_roomName);
                }
            }
        }
    }
    getRoomCache(_roomName) {
        this.items = this.roomCache[_roomName].items;
        this.connections = this.roomCache[_roomName].connections;
        this.npcs = this.roomCache[_roomName].npcs;
        this.roomName = this.roomCache[_roomName].roomName;
        this.json = this.roomCache[_roomName].json;
        this.roomDescription = this.roomCache[_roomName].roomDescription;
        this.roomCache = this.roomCache[_roomName].roomCache;
    }
    switchJson(_roomName) {
        this.roomName = this.json[_roomName];
        for (let property in this.json[_roomName]) {
            switch (property) {
                case "items":
                    //Todo implement Item object
                    this.items = [];
                    for (let item of this.json[_roomName][property]) {
                        this.items.push(new Item(item.name, item.schaden, item.beschreibung));
                    }
                    break;
                case "connections":
                    this.connections = [];
                    for (let connection of this.json[_roomName][property]) {
                        this.connections.push(connection);
                    }
                    break;
                case "npcs":
                    this.npcs = [];
                    for (let npc of this.json[_roomName][property]) {
                        this.npcs.push(new NPC(npc.name, npc.smart, npc.health, npc.inventory, npc.staerke, npc.beschreibung, npc.alter, npc.interactions));
                    }
                    break;
                case "roomDescription":
                    this.roomDescription = this.json[_roomName][property];
                    updateConsole(this.getRoomDescrtiption());
                    break;
            }
        }
        var obj = {};
        obj["items"] = this.items;
        obj["connections"] = this.connections;
        obj["npcs"] = this.npcs;
        obj["roomName"] = this.roomName;
        obj["json"] = this.json;
        obj["roomDescription"] = this.roomDescription;
        obj["roomCache"] = this.roomCache;
        this.roomCache[_roomName] = obj;
    }
}
//# sourceMappingURL=Scene.js.map