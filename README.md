# README

accessibility-scanner is a project that aims to add a11y issue detection capabilities to a project by scanning provided html.
This library is meant to be added on  PROJECT RUNNING ON A WEB BROWSER.

With [npm](https://npmjs.com/) installed, run  :

```
$ npm install accessibility-scanner
```

## Usage

Import the Scanner class 

```js
import { Scanner } from 'accessibility-scanner'
```

Use the Scanner to read HTML text and check for accessibility issues
```js
 const scanner = Scanner.fromHtmlText('<html><h1>I am a little tea pot</h1></html>')
 const report = scanner.runScan();
```
The report will be in the following format 
````json
[{"section":"headings","key":"heading_order_incorrect","success_criterion":"2.4.10","issues":[]}]
````
each items in the issues array is an [HtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) type object
## License

Accessibility scanner an is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
