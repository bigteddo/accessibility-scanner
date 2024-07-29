declare class Scanner {
    private document;
    private rules;
    constructor(doc: Document);
    static fromHtmlText(html: string): Scanner;
    runScan(): any[];
}

interface RuleInterface {
    document: Document;
    type: string;
    getTags(): HTMLElement[];
    hasIssues(): boolean;
    showIssues(): any[];
}

declare class BaseRules implements RuleInterface {
    document: Document;
    type: string;
    constructor(doc: Document);
    protected makeIssueObject(key: string, criteria: string, elements: any[]): {
        type: string;
        key: string;
        criteria: string;
        issues: any[];
    };
    getTags(): HTMLElement[];
    hasIssues(): boolean;
    showIssues(): any[];
}

declare class Anchor extends BaseRules {
    type: string;
    private links;
    keys: {
        textMissing: {
            code: string;
            criteria: string;
        };
        hrefMissing: {
            code: string;
            criteria: string;
        };
    };
    constructor(doc: Document);
    getTags(): HTMLElement[];
    haveHrefAttribute(): boolean;
    getWithoutHrefAttribute(): any;
    haveText(): boolean;
    getWithoutText(): any;
    showIssues(): any[];
    hasIssues(): boolean;
}

declare class Headings extends BaseRules {
    type: string;
    issues: {
        incorrectOrder: {
            code: string;
            criteria: string;
        };
    };
    getTags(): HTMLElement[];
    findOutOfOrderHeaders(): any;
    static areInOrder(doc: Document): boolean;
    hasIssues(): boolean;
    showIssues(): any[];
}

export { Anchor, Headings, Scanner };
