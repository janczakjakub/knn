export default class ClassificatedDistance {
    public index: number;
    public distance: number;
    public label: string;

    constructor(index: number, distance: number, label: string) {
        this.index = index;
        this.distance = distance;
        this.label = label;
    }
}
