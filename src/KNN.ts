import ClassificatedDistance from "./ClassificatedDistance";
import PredictResultInterface from "./PredictResultInterface";
import SampleInterface from "./SampleInterface";

export default class KNN {
    private k: number;
    private samples: SampleInterface[];

    constructor(k: number = 1, data: SampleInterface[]) {
        this.k = k;
        this.samples = data;
    }

    public predict(point: number[]): PredictResultInterface {
        const map: ClassificatedDistance[] = this.generateDistanceMap(point);
        const votes = map.slice(0, this.k);
        const voteCounts = votes.reduce(
            (obj: any, vote: any) =>
                Object.assign({}, obj, { [vote.label]: (obj[vote.label] || 0) + 1 }),
            {}
        );
        const sortedVotes = Object.keys(voteCounts)
            .map((label) => ({ label, count: voteCounts[label] }))
            .sort((a, b) => (a.count > b.count ? -1 : 1));

        return {
            label: sortedVotes[0].label,
            voteCounts,
            votes,
        };
    }

    private generateDistanceMap(point: number[]): ClassificatedDistance[] {
        const map: ClassificatedDistance[] = [];
        let maxDistanceInMap: number | null = null;

        for (let index = 0; index < this.samples.length; index++) {
            const otherPoint: number[] = this.samples[index].value;
            const otherPointLabel: string = this.samples[index].sex;
            const actualDistance: number = this.getDistanceBetweenPoints(point, otherPoint);

            if (!maxDistanceInMap || actualDistance < maxDistanceInMap) {
                let classificatedDistance: ClassificatedDistance = new ClassificatedDistance(
                    index,
                    actualDistance,
                    otherPointLabel
                );
                map.push(classificatedDistance);

                map.sort((a: ClassificatedDistance, b: ClassificatedDistance) =>
                    a.distance < b.distance ? -1 : 1
                );

                if (map.length > this.k) {
                    map.pop();
                }

                maxDistanceInMap = map[map.length - 1].distance;
            }
        }

        return map;
    }

    private getDistanceBetweenPoints(pointA: number[], pointB: number[]): number {
        return Math.sqrt(
            pointA
                .map((x: number, i: number) => {
                    return pointB[i] - x;
                })
                .reduce((sumOfSquares: number, diff: number) => {
                    return sumOfSquares + diff * diff;
                }, 0)
        );
    }
}
