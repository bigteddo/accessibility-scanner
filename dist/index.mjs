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
  makeIssueObject(key, criteria, elements) {
    return { section: this.type, key, success_criterion: criteria, issues: elements };
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
    this.issues = {
      incorrectOrder: {
        code: "heading_order_incorrect",
        criteria: "2.4.10"
      }
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
    return this.makeIssueObject(this.issues.incorrectOrder.code, this.issues.incorrectOrder.criteria, outOfOrderElements);
  }
  static areInOrder(doc) {
    let headersIndex = 0;
    const headers = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const elements = doc.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
      if (headers.includes(elements[i].tagName.toLowerCase())) {
        if (headersIndex == 0) {
          headersIndex = headers.indexOf(elements[i].tagName.toLowerCase());
        }
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
    this.keys = {
      textMissing: {
        code: "link_text_missing",
        criteria: "2.4.4"
      },
      hrefMissing: {
        code: "link_href_missing",
        criteria: "2.4.4"
      }
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
    return this.makeIssueObject(this.keys.hrefMissing.code, this.keys.hrefMissing.criteria, links);
  }
  haveText() {
    const withoutText = this.getWithoutText();
    return withoutText.issues.length === 0;
  }
  getWithoutText() {
    const links = this.links.filter((anchor) => _.isEmpty(anchor.textContent));
    return this.makeIssueObject(this.keys.textMissing.code, this.keys.textMissing.criteria, links);
  }
  showIssues() {
    return [this.getWithoutText(), this.getWithoutHrefAttribute()].filter((res) => res.issues.length > 0);
  }
  hasIssues() {
    const hasTags = this.getTags().length > 0;
    const haveHrefAttr = this.haveHrefAttribute();
    const haveText = this.haveText();
    return hasTags && (!haveHrefAttr || !haveText);
  }
};

// src/rules/Image.ts
import _2 from "lodash";
var Image = class extends BaseRules {
  constructor(doc) {
    super(doc);
    this.type = "Image";
    this.images = this.getTags();
  }
  getTags() {
    return [...this.document.getElementsByTagName("img")];
  }
  getWithoutAltAttribute() {
    const images = this.images.filter((img) => !img.hasAttribute("alt"));
    return this.makeIssueObject("missing_alt_attribute", "1.1.1", images);
  }
  hasImagesMissingAltAttribute() {
    const withoutAltAttribute = this.getWithoutAltAttribute();
    return withoutAltAttribute.issues.length > 0;
  }
  getWithEmptyAltAttribute() {
    const images = this.images.filter((img) => img.hasAttribute("alt") && _2.isEmpty(img.getAttribute("atl")));
    return this.makeIssueObject("missing_alt_attribute", "1.1.1", images);
  }
  hasImagesEmptyAltAttribute() {
    const withoutAltAttribute = this.getWithEmptyAltAttribute();
    return withoutAltAttribute.issues.length > 0;
  }
  getAltTextSameAsFilename() {
    const images = this.images.filter((img) => img.getAttribute("src") !== img.getAttribute("alt"));
    return this.makeIssueObject("alt_text_same_as_filename", "1.1.1", images);
  }
  hasImagesWithAtlTextSameAsFilename() {
    const images = this.getAltTextSameAsFilename();
    return images.issues.length > 0;
  }
  showIssues() {
    return [this.getWithoutAltAttribute(), this.getAltTextSameAsFilename(), this.getWithEmptyAltAttribute()].filter((res) => res.issues.length > 0);
  }
  hasIssues() {
    const hasTags = this.getTags().length > 0;
    const missingAltAttr = this.hasImagesMissingAltAttribute();
    const hasSameSrcAndAlt = this.hasImagesWithAtlTextSameAsFilename();
    return hasTags && (missingAltAttr || hasSameSrcAndAlt);
  }
};

// src/Scanner.ts
var Scanner = class _Scanner {
  constructor(doc) {
    this.document = null;
    this.rules = [Headings, Anchor, Image];
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
        issues.push(rule.showIssues());
      }
    });
    console.log(issues);
    return issues.flat();
  }
};
export {
  Anchor,
  Headings,
  Scanner
};
