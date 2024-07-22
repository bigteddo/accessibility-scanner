import _ from 'lodash'
import {BaseRules} from "./BaseRules";

export class Anchor extends BaseRules{

    public type: string = 'anchors'
    private links
    public messages = {
        textMissing: 'Link text is missing.',
        hrefMissing: 'Link Href is missing. '

    }

    constructor(doc: Document) {
        super(doc);
        this.links = this.getTags()
    }

    public getTags(): HTMLElement[] {
        return [...this.document.getElementsByTagName('a')]
    }

    public haveHrefAttribute(): boolean {
        const withoutHref = this.getWithoutHrefAttribute()
        return withoutHref.issues.length === 0
    }

    public getWithoutHrefAttribute(): any {
        const links = this.links.filter((link: HTMLElement) => !link.hasAttribute('href'))
        return  this.makeIssueObject(this.messages.hrefMissing,links)

    }



    public haveText(): boolean {
        const withoutText = this.getWithoutText()
        return withoutText.issues.length === 0
    }

    public getWithoutText():  any {
        const links =  this.links.filter((anchor: HTMLElement) => _.isEmpty(anchor.textContent))
        return  this.makeIssueObject(this.messages.textMissing,links)
    }

    showIssues(): any[] {
        return [...this.getWithoutText(), this.getWithoutHrefAttribute()]
    }

    hasIssues(): boolean {
        const haveHrefAttr = this.haveHrefAttribute()
        const haveText = this.haveText()

        return haveHrefAttr || haveText;

    }


}