import ClassificatedDistance from "./ClassificatedDistance";

export default interface PredictResultInterface {
    label: string;
    voteCounts: object;
    votes: ClassificatedDistance[];
}
