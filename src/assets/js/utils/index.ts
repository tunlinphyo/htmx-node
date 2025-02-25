
export class Utils {
    public static log(message: string) {
        console.log("CUSTOMLOG::", message)
    }

    public static elem<T extends HTMLElement>(selector: T | string, parent?: HTMLElement) {
        if (selector instanceof HTMLElement) return selector
        return (parent || document).querySelector(selector) as T | null
    }

    public static elems<T extends HTMLElement>(selector: string, parent?: HTMLElement): NodeListOf<T> {
        return (parent || document).querySelectorAll(selector) as NodeListOf<T>
    }

}