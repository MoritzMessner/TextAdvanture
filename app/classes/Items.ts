class Item {
    public name: string;
    public schaden: number;
    public beschreibung: string;
    constructor(_name: string, _schaden: number, _beschreibung: string) {
        this.name = _name;
        this.schaden = _schaden;
        this.beschreibung = _beschreibung;
    }
}