import {BaseRules} from "./BaseRules";

export class Headings extends BaseRules {

    public type = 'headings'
    public issues = {
        incorrectOrder: {
            code: 'heading_order_incorrect',
            criteria: '2.4.10'
        } ,
    }

    public getTags(): HTMLElement[] {

        let headerTags: any[] = [];
        const headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        headers.forEach((header: string) => {
            const tags = this.document.getElementsByTagName(header);
            headerTags.push(...tags);
        })
        return headerTags;
    }

    public findOutOfOrderHeaders(): any {
        let headersIndex = 0;
        const headersList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const elements = this.document.getElementsByTagName('*');
        const outOfOrderElements: any[] = [];

        for (let i = 0; i < elements.length; i++) {
            const tagName = elements[i].tagName.toLowerCase();
            if (headersList.includes(tagName)) {
                if (tagName === headersList[headersIndex] ||
                    tagName === headersList[headersIndex + 1]) {
                    if (tagName === headersList[headersIndex + 1]) {
                        headersIndex++;
                    }
                } else {
                    outOfOrderElements.push(elements[i]);
                }
            }
        }
        return this.makeIssueObject(this.issues.incorrectOrder.code,this.issues.incorrectOrder.criteria,outOfOrderElements);
    }

    public static areInOrder(doc: Document) {
        let headersIndex = 0;
        const headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

        const elements = doc.getElementsByTagName('*');
        for (let i = 0; i < elements.length; i++) {
            if (headers.includes(elements[i].tagName.toLowerCase())) {
                if(headersIndex == 0){
                    headersIndex = headers.indexOf(elements[i].tagName.toLowerCase());
                }
                if (elements[i].tagName.toLowerCase() === headers[headersIndex] ||
                    elements[i].tagName.toLowerCase() === headers[headersIndex + 1]) {
                    if (elements[i].tagName.toLowerCase() === headers[headersIndex + 1]) {
                        headersIndex++;
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    hasIssues(): boolean {
        return !Headings.areInOrder(this.document);
    }

    showIssues(): any[] {
        return [this.findOutOfOrderHeaders()];
    }


}
