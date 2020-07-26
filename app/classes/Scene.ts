

class Scene {
    private items: string[] = [];
    private connections: string[] = [];
    private npcs: object[] = [];
    private activeScene: any;
    private json: any; // Any muss noch raus


    constructor() {
        //this.json = JSON.parse('{"startRaum": {"player": true,"items": ["Schwert","Notiz"],"connections": ["South"],"npcs": [{"name": "Rainer","health": 5,"alter": 21,"interactions": ["Hallo Bruder","Wir haben dich bewusstlos am Strand gefunden.","Das sollten die besten Vorraussetzungen für ein super Rollenspiel sein.","Töte mich mit dem Schwert um aus dem Raum zu kommen","Das war nur ein Test, langsam langsam. Du kannst auch einfach so nach draußen gehen!"],"inventory": ["Bibel"]}]}} '); //this.getJson(_pathToJson);
        this.json = this.load("../rooms/room1.json");

        console.log(this.json);
    }


    private async load(_filename: string): Promise<Object> {
        let response: Response = await fetch(_filename);
        let text: string = await response.text();
        let json: Object = JSON.parse(text);
        return json;
    }



    public setActiveRoom(_roomName: string): void {
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

    public listItmes() {
        updateConsole("Ich sehe:")
        for (let element of this.items) {
            updateConsole("> " + element);
        }
    }

    private async getJson(_pathToJson: string): any {
        let content: any = await this.load(_pathToJson);
        return content;

    }

    /* private async load(_filename: string): any {
         // let response: Response = await fetch(_filename);
         let response = '{"startRaum": {"player": true,"items": ["Schwert","Notiz"],"connections": ["South"],"npcs": [{"name": "Rainer","health": 5,"alter": 21,"interactions": ["Hallo Bruder","Wir haben dich bewusstlos am Strand gefunden.","Das sollten die besten Vorraussetzungen für ein super Rollenspiel sein.","Töte mich mit dem Schwert um aus dem Raum zu kommen","Das war nur ein Test, langsam langsam. Du kannst auch einfach so nach draußen gehen!"],"inventory": ["Bibel"]}]}} ';
         //let text: string = await response.text();
         let json: any = JSON.parse(response);
         // alternative: json = await response.json();
         return (json);
     }*/

}