interface ITemplateConfig extends Record<string, any> {
    baseDir: string;
    componentBasePath: string;
    viewBasePath: string;
    sroreBasePath: string;
    routesFilePath: string;
}
declare const conf: ITemplateConfig;
export default conf;
