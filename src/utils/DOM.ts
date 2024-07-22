export class DOM {

    public static parseFromString(html: string): Document {
        const parser = new DOMParser();
        return  parser.parseFromString(html, "text/html");
    }

    public static isHTML(text: string): boolean {
        const htmlTagPattern = /<\w*(\s.*?(\='.*?'|=\".*?\")*?)?(\s\/)?>/i
        return htmlTagPattern.test(text)
    }
}