"use strict";
class Scene {
    constructor() {
        this.items = [];
        this.connections = [];
        this.npcs = [];
        this.json = JSON.parse('{"startRaum": {"player": true,"items": ["Schwert","Notiz"],"connections": ["South"],"npcs": [{"name": "Rainer","health": 5,"alter": 21,"interactions": ["Hallo Bruder","Wir haben dich bewusstlos am Strand gefunden.","Das sollten die besten Vorraussetzungen für ein super Rollenspiel sein.","Töte mich mit dem Schwert um aus dem Raum zu kommen","Das war nur ein Test, langsam langsam. Du kannst auch einfach so nach draußen gehen!"],"inventory": ["Bibel"]}]}} '); //this.getJson(_pathToJson);
        console.log(this.json);
    }
    setActiveRoom(_roomName) {
        for (let element in this.json) {
            console.log(element);
            if (element === _roomName) {
                this.activeScene = this.json[_roomName];
                console.log(this.json[_roomName]);
                for (let property in this.json[_roomName]) {
                    switch (property) {
                        case "items":
                            for (let item of this.json[_roomName][property]) {
                                this.items.push(item);
                            }
                            break;
                        case "connections":
                            for (let connection of this.json[_roomName][property]) {
                                this.connections.push(connection);
                            }
                            break;
                        case "npcs":
                            for (let npc of this.json[_roomName][property]) {
                                this.connections.push(npc);
                            }
                            break;
                    }
                }
            }
        }
    }
    listItmes() {
        updateConsole("Ich sehe:");
        for (let element of this.items) {
            updateConsole("> " + element);
        }
    }
    async getJson(_pathToJson) {
        let content = await this.load(_pathToJson);
        return content;
    }
    async load(_filename) {
        // let response: Response = await fetch(_filename);
        let response = '{"startRaum": {"player": true,"items": ["Schwert","Notiz"],"connections": ["South"],"npcs": [{"name": "Rainer","health": 5,"alter": 21,"interactions": ["Hallo Bruder","Wir haben dich bewusstlos am Strand gefunden.","Das sollten die besten Vorraussetzungen für ein super Rollenspiel sein.","Töte mich mit dem Schwert um aus dem Raum zu kommen","Das war nur ein Test, langsam langsam. Du kannst auch einfach so nach draußen gehen!"],"inventory": ["Bibel"]}]}} ';
        //let text: string = await response.text();
        let json = JSON.parse(response);
        // alternative: json = await response.json();
        return (json);
    }
}
//# sourceMappingURL=Scene.js.map