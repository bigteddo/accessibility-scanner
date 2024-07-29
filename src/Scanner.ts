import {DOM, DOM as String} from './utils/DOM'
import {Headings} from "./rules/Headings";
import {Anchor} from "./rules/Anchor";
export class Scanner {
    private document: Document|null = null;
    private rules: any[]= [Headings,Anchor]
    constructor(doc: Document) {
          this.document = doc;
    }

    public static fromHtmlText(html: string): Scanner{
        if(DOM.isHTML(html)){
            return new Scanner(DOM.parseFromString(html))
        }
        return  new Scanner(DOM.parseFromString("<div>"+html+"</div>"))
    }

    public runScan(): any[]{
        let issues: any[]=[];
        this.rules.forEach((ruleClass)=>{
            const rule = new ruleClass(this.document)
            console.log(rule, rule.hasIssues())
            if(rule.hasIssues()){
                issues.push(rule.showIssues())
            }
        })
        console.log(issues)
        return issues.flat()
    }


}
