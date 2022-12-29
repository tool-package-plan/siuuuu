declare class Siuuuu {
    vue: Function;
    route: Function;
    promptOptions: Record<string, any>[];
    constructor();
    run(): void;
    generate(actionType: string, params?: Record<string, any>): void;
}
declare const siuuuu: Siuuuu;
export default siuuuu;
