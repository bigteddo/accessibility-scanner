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
    protected makeIssueObject(messages: string, elements: any[]): {
        messages: string;
        issues: any[];
    };
    getTags(): HTMLElement[];
    hasIssues(): boolean;
    showIssues(): any[];
}

declare class Anchor extends BaseRules {
    type: string;
    private links;
    messages: {
        textMissing: string;
        hrefMissing: string;
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
    messages: {
        incorrectOrder: string;
    };
    getTags(): HTMLElement[];
    findOutOfOrderHeaders(): any;
    static areInOrder(doc: Document): boolean;
    hasIssues(): boolean;
    showIssues(): any[];
}

declare const _default: {
    Scanner: typeof Scanner;
    Anchor: typeof Anchor;
    Headings: typeof Headings;
};

export { _default as default };
