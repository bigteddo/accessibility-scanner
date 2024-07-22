import {Headings} from "../../src/rules/Headings";

describe('Headings',()=>{
    it('should detect all header tags ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<h2>this is an h2</h2><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div></div>',"text/html")
        const headings = new Headings(document)
        const actual = headings.getTags().length


        expect(actual).toEqual(2)
    });
    it('should detect header tags are in order ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<h2>this is an h2</h2><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div></div>',"text/html")

        const actual = Headings.areInOrder(document)


        expect(actual).toBeTruthy()
    });

    it('should detect header tags are in order when no h1 tag ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h2>this is a header</h2><p>this is a paragraph</p>\n' +
            '<h3>this is an h2</h3><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div></div>',"text/html")

        const actual = Headings.areInOrder(document)


        expect(actual).toBeTruthy()
    });

    it('should detect header tags are not in order ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<h3>this is an h3</h3><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div>' +
            '<h2>this is an h2</h2><p>this is another paragraph</p>' +
            '</div>',"text/html")

        const actual = Headings.areInOrder(document)


        expect(actual).toBeFalsy()
    });

    it('should detect header issues', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<h3>this is an h3</h3><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div>' +
            '<h2>this is an h2</h2><p>this is another paragraph</p>' +
            '</div>',"text/html")

        const headers = new Headings(document)
        const actual = headers.hasIssues()


        expect(actual).toBeTruthy()
    });

    it('should detect header issues', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<h3>this is an h3</h3><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div>' +
            '<h2>this is an h2</h2><p>this is another paragraph</p>' +
            '</div>',"text/html")

        const headers = new Headings(document)
        const actual = headers.hasIssues()


        expect(actual).toBeTruthy()
    });

    it('should return all issues', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><h4>this is an h4</h4><p>this is a paragraph</p>\n' +
            '<h3>this is an h3</h3><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div>' +
            '<h2>this is an h2</h2><p>this is another paragraph</p>' +
            '</div>',"text/html")

        const headers = new Headings(document)
        const actual = headers.showIssues()[0]

        console.log(actual.issues)
        actual.issues.forEach((issue: any)=>{
            console.log(issue.outerHTML)
        })

        expect(actual.issues.length).toEqual(2)
    });

})