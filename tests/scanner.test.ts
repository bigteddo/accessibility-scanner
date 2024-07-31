import {Scanner} from "../src/Scanner";

describe('scanner', () => {
    it('should initiate form string', () => {
        const html = '<h2>this is a header</h2>\n' +
            '<div>Tenetur enim labore mollitia minus id error modi.&nbsp;</div>'
        const actual = Scanner.fromHtmlText(html)
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, "text/html");
        const expected = new Scanner(dom)

        expect(actual).toEqual(expected)
    });


    it('should detect accessibility issues', () => {

        const html = '<h3>Accessibility Scanner</h3>\n' +
            '<p>After you\'re done building your course, and before you hand it off to begin the editorial review process, run an accessibility scan to check for any potential accessibility issues. The scanner will automatically run through the code in your course to ensure that images, text, and interactive elements are compliant with accessibility standards.</p>\n' +
            '<p>To access the scanner, use this link: <a href="https://scanner.mindedgeuniversity.com" target="_blank" rel="noopener">https://scanner.mindedgeuniversity.com</a>. Use your Atutor credentials to log in.</p>\n' +
            '<p>To conduct a scan:</p>\n' +
            '<ul>\n' +
            '<li>Log into the <a href="https://scanner.mindedgeuniversity.com" target="_blank" rel="noopener">MindEdge Accessibility Scanner.</a></li>\n' +
            '<li>Select "Scan" on the left-hand side of the screen.</li>\n' +
            '<li>Choose "Courses." Select the domain and the course you want to scan.</li>\n' +
            '<li>Choose a time frame (all time, 7 days, or 30 days). Click "Scan."</li>\n' +
            '</ul>\n' +
            '\n' +
            '<a href="https://scanner.mindedgeuniversity.com" target="_blank" rel="noopener"></a>.\n' +
            '<a target="_blank" rel="noopener"></a>.\n' +
            '<a target="_blank" rel="noopener">abc</a>.\n' +
            '<h1>this is a h1</h1>'

        const scanner = Scanner.fromHtmlText(html)
        const actual = scanner.runScan()
        expect(actual.length > 0).toBeTruthy()
    })

    it('should not detect accessibility issues', () => {

        const html = '<h2>Accessibility Scanner</h2>\n' +
            '<p>After you\'re done building your course, and before you hand it off to begin the editorial review process, run an accessibility scan to check for any potential accessibility issues. The scanner will automatically run through the code in your course to ensure that images, text, and interactive elements are compliant with accessibility standards.</p>\n' +
            '<p>To access the scanner, use this link: <a href="https://scanner.mindedgeuniversity.com" target="_blank" rel="noopener">https://scanner.mindedgeuniversity.com</a>. Use your Atutor credentials to log in.</p>\n' +
            '<p>To conduct a scan:</p>\n' +
            '<ul>\n' +
            '<li>Log into the <a href="https://scanner.mindedgeuniversity.com" target="_blank" rel="noopener">MindEdge Accessibility Scanner.</a></li>\n' +
            '<li>Select "Scan" on the left-hand side of the screen.</li>\n' +
            '<li>Choose "Courses." Select the domain and the course you want to scan.</li>\n' +
            '<li>Choose a time frame (all time, 7 days, or 30 days). Click "Scan."</li>\n' +
            '</ul>\n' +
            '\n' +
            '<a href="https://scanner.mindedgeuniversity.com" target="_blank" rel="noopener">acb</a>.\n' +
            '<a href="#abc"  target="_blank" rel="noopener">abc</a>.\n' +
            '<h3>this is a h3</h3>'

        const scanner = Scanner.fromHtmlText(html)
        const actual = scanner.runScan()
        expect(actual.length ).toEqual(0)
    })

})
