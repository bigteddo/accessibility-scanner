export default interface RuleInterface {
        document: Document,
        type: string
        getTags(): HTMLElement[],
        hasIssues(): boolean,
        showIssues(): any[]
}
