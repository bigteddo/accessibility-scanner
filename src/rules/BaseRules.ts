import RuleInterface from './contracts/RuleInterface'
export class BaseRules implements RuleInterface{
    document: Document;
    type: string = '';
    constructor(doc: Document) {
        this.document = doc
    }
    protected makeIssueObject(messages: string, elements: any[]){
        return {messages: messages, issues: elements}
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