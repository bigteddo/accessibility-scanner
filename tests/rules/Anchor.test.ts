import {Anchor} from "../../src/rules/Anchor"

describe('Anchor',()=>{
    it('should detect Anchor tags have href attribute ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<a href="http://localhost">link</a><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div></div>',"text/html")

        const anchors = new Anchor(document)
        const actual = anchors.haveHrefAttribute( )

        expect(actual).toBeTruthy()
    });
    it('should detect Anchor tags do not have href attribute ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<a>link</a><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div></div>',"text/html")
        const anchors = new Anchor(document)
        const actual =  anchors.haveHrefAttribute( )

        expect(actual).toBeFalsy()
    });

    it('should detect Anchor tags have issues', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<a>link</a><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div></div>',"text/html")
        const anchors = new Anchor(document)
        const actual =  anchors.hasIssues()

        expect(actual).toBeTruthy()
    });
    it('should detect Links have text ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<a href="http://localhost">link</a><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div></div>',"text/html")
        const anchors = new Anchor(document)
        const actual =  anchors.haveText()

        expect(actual).toBeTruthy()
    });
    it('should detect Links that do not have text ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<a href="http://localhost"></a><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div></div>',"text/html")
        const anchors = new Anchor(document)
        const actual = anchors.haveText()

        expect(actual).toBeFalsy()
    });

    it('should return links with empty test ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<a href="http://localhost"></a><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div></div>',"text/html")
        const anchors = new Anchor(document)
        const links = anchors.getWithoutText()
        const actual =  links.issues.length


        expect(actual).toEqual(1)
        expect(links.issues[0].getAttribute('href')).toEqual('http://localhost')
    });

    it('should detect anchor tag issues ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><h1>this is a header</h1><p>this is a paragraph</p>\n' +
            '<a href="http://localhost"></a><div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div></div>',"text/html")
        const actual = new Anchor(document)
        expect(actual).toBeTruthy()
    });
})
