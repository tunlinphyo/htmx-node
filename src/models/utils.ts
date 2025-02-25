export class Utils {
    public static loading(time: number | [number, number]) {
        const delay = Array.isArray(time) ? this.getRandomInteger(time[0], time[1]) : time
        return new Promise(resolve => {
            const timeout = setTimeout(() => {
                clearTimeout(timeout)
                resolve(delay)
            }, delay)
        })
    }

    public static isEmptyObjective(obj: object): boolean {
        return Object.keys(obj).length === 0;
    }

    public static getRandomInteger(min: number, max: number): number {
        if (min > max) {
            throw new Error("Min should be less than or equal to Max");
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}