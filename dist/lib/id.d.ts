declare const prefixes: Record<string, unknown>;
interface GenerateIdOptions {
    length?: number;
    separator?: string;
}
export declare function generateId(prefixOrOptions?: keyof typeof prefixes | GenerateIdOptions, inputOptions?: GenerateIdOptions): string;
export {};
//# sourceMappingURL=id.d.ts.map