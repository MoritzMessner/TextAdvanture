class Scene {
    private items: Item[] = [];
    private connections: string[] = [];
    private npcs: NPC[] = [];
    private roomName: string = "";
    private json: Object;
    private roomDescription: string = "";
    private roomCache: { [key: string]: Scene; } = {};

    public async load(_filename: string): Promise<void> {
        let response: Response = await fetch(_filename);
        let text: string = await response.text();
        let json: Object = JSON.parse(text);
        this.json = json;
        this.setActiveRoom("schlafzimmer");
    }

    public setActiveRoom(_roomName: string): void {
        if (this.roomCache[_roomName.toLocaleLowerCase()] !== undefined) {
            this.getRoomCache(_roomName);
            this.npcChangeRoom();
            updateConsole(this.getRoomDescrtiption());
        } else {
            for (let element in this.json) {
                if (element === _roomName) {
                    this.switchJson(_roomName);
                }
            }
        }
    }
    private getRoomCache(_roomName: string): void {
        this.items = this.roomCache[_roomName].items;
        this.connections = this.roomCache[_roomName].connections;
        this.npcs = this.roomCache[_roomName].npcs;
        this.roomName = this.roomCache[_roomName].roomName;
        this.json = this.roomCache[_roomName].json;
        this.roomDescription = this.roomCache[_roomName].roomDescription;
        this.roomCache = this.roomCache[_roomName].roomCache;
    }

    private switchJson(_roomName: string): void {
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
        var obj: Scene = {};
        obj["items"] = this.items;
        obj["connections"] = this.connections;
        obj["npcs"] = this.npcs;
        obj["roomName"] = this.roomName;
        obj["json"] = this.json;
        obj["roomDescription"] = this.roomDescription;
        obj["roomCache"] = this.roomCache;
        this.roomCache[_roomName] = obj;
    }



    private npcChangeRoom(): void {
        let counter: number = 0;
        for (let element of this.getNpcs()) {
            if (element.smart === true) {
                var randRoom: string = this.connections[Math.floor(Math.random() * this.connections.length)];
                if (this.roomCache[randRoom.toLocaleLowerCase()] !== undefined) {
                    this.roomCache[randRoom.toLocaleLowerCase()].npcs.push(element);
                    this.npcs.splice(counter, 1);
                }

            }
            counter++;
        }
    }

    public removeItem(_itemToRemove: string): void {
        let counter: number = 0;
        for (let element of this.getItems()) {
            if (element.name.toLowerCase() == _itemToRemove) {
                this.items.splice(counter, 1);

            }
            counter++;
        }
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

    public getNpcs(): NPC[] {
        return this.npcs;
    }

    public getConnections(): string[] {
        return this.connections;
    }


    public getRoomDescrtiption(): string {
        return this.roomDescription;
    }

    public getItems(): Item[] {
        return this.items;
    }

    public addItem(_item: Item): void {
        this.items.push(_item);
    }
}


