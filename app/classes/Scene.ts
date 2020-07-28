

class Scene {
    private items: object[] = [];
    private connections: string[] = [];
    private npcs: object[] = [];
    private roomName: string = "";
    private json: any; // Any muss noch raus
    private roomDescription: string = "";
    private roomCache: object | string = [];


    constructor() {

    }

    public getNpcs(): object[] {
        return this.npcs;
    }

    public killNpc(_name: string): void {
        let counter: number = 0;
        for (let element of this.getNpcs()) {
            if (element.name.toLowerCase() == _name) {
                this.npcs.splice(counter, 1);

            }
            counter++;
        }
    }

    public getConnections(): string[] {
        return this.connections;
    }


    public getRoomDescrtiption(): string {
        return this.roomDescription;
    }

    public getItems(): object[] {
        return this.items;
    }

    public addItem(_item: object): void {
        this.items.push(_item);
    }

    public removeItem(_itemToRemove: object): void {
        let counter: number = 0;
        for (let element of this.getItems()) {
            if (element.name.toLowerCase() == _itemToRemove) {
                this.items.splice(counter, 1);

            }
            counter++;
        }
    }


    public async load(_filename: string): Promise<void> {
        let response: Response = await fetch(_filename);
        let text: string = await response.text();
        let json: Object = JSON.parse(text);
        this.json = json;
        this.setActiveRoom("schlafzimmer");
    }

    private npcChangeRoom(): void {
        let counter: number = 0;
        for (let element of this.getNpcs()) {
            if (element.smart === true) {
                var randRoom: string = this.connections[Math.floor(Math.random() * this.connections.length)];
                this.roomCache[randRoom.toLocaleLowerCase()].npcs.push(element);
                this.npcs.splice(counter, 1);

            }
            counter++;
        }
    }



    public setActiveRoom(_roomName: string): void {


        if (this.roomCache[_roomName.toLocaleLowerCase()] !== undefined) {
            this.npcChangeRoom();
            this.items = this.roomCache[_roomName].items;
            this.connections = this.roomCache[_roomName].connections;
            this.npcs = this.roomCache[_roomName].npcs;
            this.roomName = this.roomCache[_roomName].roomName;
            this.json = this.roomCache[_roomName].json;
            this.roomDescription = this.roomCache[_roomName].roomDescription;
            this.roomCache = this.roomCache[_roomName].roomCache;
            updateConsole(this.getRoomDescrtiption());

        } else {

            for (let element in this.json) {
                if (element === _roomName) {
                    this.roomName = this.json[_roomName];
                    for (let property in this.json[_roomName]) {
                        //todo reset class properties
                        switch (property) {
                            case "items":
                                //Todo implement Item object
                                this.items = [];
                                for (let item of this.json[_roomName][property]) {
                                    this.items.push(item);
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
                                    this.npcs.push(npc);
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
        }
    }

    public listItmes() {
        updateConsole("Ich sehe:")
        for (let element of this.items) {
            updateConsole("> " + element);
        }
    }



}