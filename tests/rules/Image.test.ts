import {Image} from "../../src/rules/Image";


describe('Image',()=>{
    it('should detect img tags missing alt attribute ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><p>this is a teapot</p><img src="img.jpg"/></div>',"text/html")

        const images = new Image(document)
        const actual = images.hasImagesMissingAltAttribute()

        expect(actual).toBeTruthy()
    });
    it('should detect img tags not missing alt attribute ', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><p>this is a teapot</p><img src="img.jpg" alt="this is a nice image"/></div>',"text/html")

        const images = new Image(document)
        const actual = images.hasImagesMissingAltAttribute()

        expect(actual).toBeFalsy()
    });
    it('should detect img tags alt attribute empty', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><p>this is a teapot</p><img src="img.jpg" alt=""/></div>',"text/html")

        const images = new Image(document)
        const actual = images.hasImagesEmptyAltAttribute()

        expect(actual).toBeTruthy()
    });

    it('should detect img tags have issues', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<div><p>this is a teapot</p><img src="img.jpg" alt=""/><p>help me</p<img src="img.jpg" alt="img.jpp"/></div>',"text/html")

        const images = new Image(document)
        const actual = images.hasIssues()
        const issues = images.showIssues()

        expect(actual).toBeTruthy()
        expect(issues.length).toEqual(2)

    });
});
