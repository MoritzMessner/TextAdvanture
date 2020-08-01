class NPC extends Character {
    public beschreibung: string;
    public alter: number;
    public interactions: string[];
    public name: string;
    public smart: boolean;
    constructor(_name: string, _smart: boolean, _health: number, _inventory: Item[], _strength: number, _description: string, _age: number, _interactions: string[]) {
        super();
        this.name = _name;
        this.smart = _smart;
        this.health = _health;
        this.inventory = _inventory;
        this.staerke = _strength;
        this.beschreibung = _description;
        this.alter = _age;
        this.interactions = _interactions;
    }
}