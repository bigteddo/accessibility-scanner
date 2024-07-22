// src/utils/DOM.ts
var DOM = class {
  static parseFromString(html) {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }
  static isHTML(text) {
    const htmlTagPattern = /<\w*(\s.*?(\='.*?'|=\".*?\")*?)?(\s\/)?>/i;
    return htmlTagPattern.test(text);
  }
};

// src/rules/BaseRules.ts
var BaseRules = class {
  constructor(doc) {
    this.type = "";
    this.document = doc;
  }
  makeIssueObject(messages, elements) {
    return { messages, issues: elements };
  }
  getTags() {
    return [];
  }
  hasIssues() {
    return false;
  }
  showIssues() {
    return [];
  }
};

// src/rules/Headings.ts
var Headings = class _Headings extends BaseRules {
  constructor() {
    super(...arguments);
    this.type = "headings";
    this.messages = {
      incorrectOrder: "Heading tag is not in correct order"
    };
  }
  getTags() {
    let headerTags = [];
    const headers = ["h1", "h2", "h3", "h4", "h5", "h6"];
    headers.forEach((header) => {
      const tags = this.document.getElementsByTagName(header);
      headerTags.push(...tags);
    });
    return headerTags;
  }
  findOutOfOrderHeaders() {
    let headersIndex = 0;
    const headersList = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const elements = this.document.getElementsByTagName("*");
    const outOfOrderElements = [];
    for (let i = 0; i < elements.length; i++) {
      const tagName = elements[i].tagName.toLowerCase();
      if (headersList.includes(tagName)) {
        if (tagName === headersList[headersIndex] || tagName === headersList[headersIndex + 1]) {
          if (tagName === headersList[headersIndex + 1]) {
            headersIndex++;
          }
        } else {
          outOfOrderElements.push(elements[i]);
        }
      }
    }
    return this.makeIssueObject(this.messages.incorrectOrder, outOfOrderElements);
  }
  static areInOrder(doc) {
    let headersIndex = 0;
    const headers = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const elements = doc.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
      if (headers.includes(elements[i].tagName.toLowerCase())) {
        if (elements[i].tagName.toLowerCase() === headers[headersIndex] || elements[i].tagName.toLowerCase() === headers[headersIndex + 1]) {
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
  hasIssues() {
    return !_Headings.areInOrder(this.document);
  }
  showIssues() {
    return [this.findOutOfOrderHeaders()];
  }
};

// src/rules/Anchor.ts
import _ from "lodash";
var Anchor = class extends BaseRules {
  constructor(doc) {
    super(doc);
    this.type = "anchors";
    this.messages = {
      textMissing: "Link text is missing.",
      hrefMissing: "Link Href is missing. "
    };
    this.links = this.getTags();
  }
  getTags() {
    return [...this.document.getElementsByTagName("a")];
  }
  haveHrefAttribute() {
    const withoutHref = this.getWithoutHrefAttribute();
    return withoutHref.issues.length === 0;
  }
  getWithoutHrefAttribute() {
    const links = this.links.filter((link) => !link.hasAttribute("href"));
    return this.makeIssueObject(this.messages.hrefMissing, links);
  }
  haveText() {
    const withoutText = this.getWithoutText();
    return withoutText.issues.length === 0;
  }
  getWithoutText() {
    const links = this.links.filter((anchor) => _.isEmpty(anchor.textContent));
    return this.makeIssueObject(this.messages.textMissing, links);
  }
  showIssues() {
    return [...this.getWithoutText(), this.getWithoutHrefAttribute()];
  }
  hasIssues() {
    const haveHrefAttr = this.haveHrefAttribute();
    const haveText = this.haveText();
    return haveHrefAttr || haveText;
  }
};

// src/Scanner.ts
var Scanner = class _Scanner {
  constructor(doc) {
    this.document = null;
    this.rules = [Headings, Anchor];
    this.document = doc;
  }
  static fromHtmlText(html) {
    if (DOM.isHTML(html)) {
      return new _Scanner(DOM.parseFromString(html));
    }
    return new _Scanner(DOM.parseFromString("<div>" + html + "</div>"));
  }
  runScan() {
    let issues = [];
    this.rules.forEach((ruleClass) => {
      const rule = new ruleClass(this.document);
      if (rule.hasIssues()) {
        issues.push({ type: rule.type, problems: rule.showIssues() });
      }
    });
    return issues;
  }
};

// src/index.ts
var src_default = {
  Scanner,
  Anchor,
  Headings
};
export {
  src_default as default
};
