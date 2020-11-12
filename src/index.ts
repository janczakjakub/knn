import KNN from "./KNN";
import * as simples from "./data/simples_weight_and_height";

const knnInstance = new KNN(5, simples.weight_and_height);

console.log("Run predict method");
console.log(knnInstance.predict([71, 175]));
