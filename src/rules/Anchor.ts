import _ from 'lodash'
import {BaseRules} from "./BaseRules";

export class Anchor extends BaseRules {

    public type: string = 'anchors'
    private links
    public keys = {
        textMissing: {
            code: 'link_text_missing',
            criteria: '2.4.4'
        },
        hrefMissing:{
            code: 'link_href_missing',
            criteria: '2.4.4'
        }

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
        return this.makeIssueObject(this.keys.hrefMissing.code,this.keys.hrefMissing.criteria, links)

    }


    public haveText(): boolean {
        const withoutText = this.getWithoutText()
        return withoutText.issues.length === 0
    }

    public getWithoutText(): any {
        const links = this.links.filter((anchor: HTMLElement) => _.isEmpty(anchor.textContent))
        return this.makeIssueObject(this.keys.textMissing.code,this.keys.textMissing.criteria, links)
    }

    showIssues(): any[] {
        return [this.getWithoutText(), this.getWithoutHrefAttribute()].filter(res => res.issues.length > 0);
    }

    hasIssues(): boolean {
        const hasTags = this.getTags().length > 0
        const haveHrefAttr = this.haveHrefAttribute()
        const haveText = this.haveText()

        return hasTags && (!haveHrefAttr || !haveText);

    }


}
