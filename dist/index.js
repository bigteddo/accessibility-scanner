"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

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
var import_lodash = __toESM(require("lodash"));
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
    const links = this.links.filter((anchor) => import_lodash.default.isEmpty(anchor.textContent));
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