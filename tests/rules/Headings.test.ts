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
        const document = parser.parseFromString('<h4>Domains</h4>\n' +
            '<p>Each partner we work with is assigned their own "domain." This is essentially a custom catalog where that partner\'s specific courses live. A single course can be shared across multiple domains. MindEdge also has its own domains, where courses for each of the four categories (above) can be found. The most common domains accessed on a daily basis by editors are MindEdge Online, MindEdge Development, and (sometimes) MindEdge Core Credit Catalog.</p>\n' +
            '<ul>\n' +
            '<li>MindEdge Online</li>\n' +
            '<ul>\n' +
            '<li>This is where active, live PD and CE courses can be found.</li>\n' +
            '</ul>\n' +
            '<li>MindEdge Development</li>\n' +
            '<ul>\n' +
            '<li>This is where new courses are built. Courses in this domain are in-progress and should not be distributed. Once a course is completed, reviewed, and ready to launch, it will be moved into the MindEdge Online domain and will be offered to other partners through our course distribution process.</li>\n' +
            '</ul>\n' +
            '<li>MindEdge Core Credit Catalog (CCC)</li>\n' +
            '<ul>\n' +
            '<li>This is where we keep our 4C "master copies." All of our 4C offerings are <strong>cloned</strong>, which means the course is not shared across multiple domains. Instead, each 4C partner gets their own cloned copy of the master course for their use.</li>\n' +
            '</ul>\n' +
            '</ul>',"text/html")

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
