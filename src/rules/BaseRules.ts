import RuleInterface from './contracts/RuleInterface'

export class BaseRules implements RuleInterface {
    document: Document;
    type: string = '';

    constructor(doc: Document) {
        this.document = doc
    }

    protected makeIssueObject(key: string, criteria: string, elements: any[]) {
        return {type: this.type, key: key, criteria: criteria, issues: elements}
    }

    getTags(): HTMLElement[] {
        return [];
    }

    hasIssues(): boolean {
        return false;
    }

    showIssues(): any[] {
        return [];
    }

}
