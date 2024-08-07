import {Table} from "../../src/rules/Table";

describe('Table', () => {
    it('should detect table has valid summary attribute', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
            '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n' +
            '<head>\n' +
            '<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />\n' +
            '<title>ATRC Testfile - Check #111-2 - Negative</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '\n' +
            '<table border="1" summary="Schedule for Route 7 going downtown. Service begins \n' +
            'at 4:00 AM and ends at midnight. Intersections are listed in the top row. \n' +
            'Find the intersection closest to your starting point or destination, then read \n' +
            'down that column to find out what time the bus leaves that intersection.">\n' +
            '<tr>\n' +
            '<th scope="col">State & First</th>\n' +
            '<th scope="col">State & Sixth</th>\n' +
            '<th scope="col">State & Fifteenth</th>\n' +
            '<th scope="col">Fifteenth & Morrison</th>\n' +
            '</tr>\n' +
            '<td>4:00</td>\n' +
            '<td>4:05</td>\n' +
            '<td>4:11</td>\n' +
            '<td>4:19</td>\n' +
            '</tr>\n' +
            '</tr>\n' +
            '<td>5:00</td>\n' +
            '<td>5:05</td>\n' +
            '<td>5:11</td>\n' +
            '<td>5:19</td>\n' +
            '</tr>\n' +
            '</tr>\n' +
            '<td>6:00</td>\n' +
            '<td>6:05</td>\n' +
            '<td>6:11</td>\n' +
            '<td>6:19</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '\n' +
            '</body>\n' +
            '</html>', "text/html")

        const table = new Table(document)
        const actual = table.hasTablesWithEmptySummary()

        expect(actual).toBeFalsy()
    });

    it('should detect table has a empty summary attribute', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
            '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n' +
            '<head>\n' +
            '<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />\n' +
            '<title>ATRC Testfile - Check #111-2 - Negative</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '\n' +
            '<table border="1" summary="">\n' +
            '<tr>\n' +
            '<th scope="col">State & First</th>\n' +
            '<th scope="col">State & Sixth</th>\n' +
            '<th scope="col">State & Fifteenth</th>\n' +
            '<th scope="col">Fifteenth & Morrison</th>\n' +
            '</tr>\n' +
            '<td>4:00</td>\n' +
            '<td>4:05</td>\n' +
            '<td>4:11</td>\n' +
            '<td>4:19</td>\n' +
            '</tr>\n' +
            '</tr>\n' +
            '<td>5:00</td>\n' +
            '<td>5:05</td>\n' +
            '<td>5:11</td>\n' +
            '<td>5:19</td>\n' +
            '</tr>\n' +
            '</tr>\n' +
            '<td>6:00</td>\n' +
            '<td>6:05</td>\n' +
            '<td>6:11</td>\n' +
            '<td>6:19</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '\n' +
            '</body>\n' +
            '</html>', "text/html")

        const table = new Table(document)
        const actual = table.hasTablesWithEmptySummary()

        expect(actual).toBeTruthy()
    });

    it('it should detect table requires a summary', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n' +
            '<head>\n' +
            '<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />\n' +
            '<title>ATRC Testfile - Check #111.1 - Positive</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '\n' +
            '<table border="1">\n' +
            '<tr>\n' +
            '<th scope="col">State & First</th>\n' +
            '<th scope="col">State & Sixth</th>\n' +
            '<th scope="col">State & Fifteenth</th>\n' +
            '<th scope="col">Fifteenth & Morrison</th>\n' +
            '</tr>\n' +
            '<td>4:00</td>\n' +
            '<td>4:05</td>\n' +
            '<td>4:11</td>\n' +
            '<td>4:19</td>\n' +
            '</tr>\n' +
            '</tr>\n' +
            '<td>5:00</td>\n' +
            '<td>5:05</td>\n' +
            '<td>5:11</td>\n' +
            '<td>5:19</td>\n' +
            '</tr>\n' +
            '</tr>\n' +
            '<td>6:00</td>\n' +
            '<td>6:05</td>\n' +
            '<td>6:11</td>\n' +
            '<td>6:19</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '\n' +
            '</body>', "text/html")

        const table = new Table(document)
        const actual = table.requireSummary()
        expect(actual).toBeTruthy()
    })

    it('it should detect complex table with summary is correct', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
            '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n' +
            '<head>\n' +
            '<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />\n' +
            '<title>ATRC Testfile - Check #111-2 - Negative</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '\n' +
            '<table border="1" summary="Schedule for Route 7 going downtown. Service begins \n' +
            'at 4:00 AM and ends at midnight. Intersections are listed in the top row. \n' +
            'Find the intersection closest to your starting point or destination, then read \n' +
            'down that column to find out what time the bus leaves that intersection.">\n' +
            '<tr>\n' +
            '<th scope="col">State & First</th>\n' +
            '<th scope="col">State & Sixth</th>\n' +
            '<th scope="col">State & Fifteenth</th>\n' +
            '<th scope="col">Fifteenth & Morrison</th>\n' +
            '</tr>\n' +
            '<td>4:00</td>\n' +
            '<td>4:05</td>\n' +
            '<td>4:11</td>\n' +
            '<td>4:19</td>\n' +
            '</tr>\n' +
            '</tr>\n' +
            '<td>5:00</td>\n' +
            '<td>5:05</td>\n' +
            '<td>5:11</td>\n' +
            '<td>5:19</td>\n' +
            '</tr>\n' +
            '</tr>\n' +
            '<td>6:00</td>\n' +
            '<td>6:05</td>\n' +
            '<td>6:11</td>\n' +
            '<td>6:19</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '\n' +
            '</body>', "text/html")

        const table = new Table(document)
        const actual = table.requireSummary()
        expect(actual).toBeFalsy()
    })

    it('it should detect summary and caption are different', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
            '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n' +
            '<head>\n' +
            '<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />\n' +
            '<title>ATRC Testfile - Check #243.2 - Negative</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '<table border="1" summary="This table shows the number of cups of coffee consumed by each senator, ' +
            'the type of coffee (decaf or regular), and whether taken with sugar.">' +
            '<caption>Cups of coffee consumed by each senator</caption>\n' +
            '\n' +
            '<tr><th>name</th><th>number of cups</th><th>type</th><th>with sugar</th></tr>\n' +
            '<tr><td>Adams, Willie</td><td>2</td><td>regular</td><td>sugar</td></tr>\n' +
            '<tr><td>Bacon, Lise</td><td>4</td><td>regular</td><td>no sugar</td></tr>\n' +
            '<tr><td>Chaput, Maria</td><td>1</td><td>decaf</td><td>sugar</td></tr>\n' +
            '<tr><td>Di Nino, Consiglio</td><td>0</td><td>not applicable</td><td>not applicable</td></tr>\n' +
            '<tr><td>Eggleton, Art</td><td>6</td><td>regular</td><td>no sugar</td></tr>\n' +
            '</table>\n' +
            '\n' +
            '</body>\n' +
            '</html>', "text/html")

        const table = new Table(document)
        const actual = table.hasTablesWithSameSummaryAndCaption()
        expect(actual).toBeFalsy()
    })

    it('it should detect summary and caption are the same', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
            '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n' +
            '<head>\n' +
            '<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />\n' +
            '<title>ATRC Testfile - Check #243.2 - Negative</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '<table border="1" summary="Cups of coffee consumed by each senator">' +
            '<caption>Cups of coffee consumed by each senator</caption>\n' +
            '\n' +
            '<tr><th>name</th><th>number of cups</th><th>type</th><th>with sugar</th></tr>\n' +
            '<tr><td>Adams, Willie</td><td>2</td><td>regular</td><td>sugar</td></tr>\n' +
            '<tr><td>Bacon, Lise</td><td>4</td><td>regular</td><td>no sugar</td></tr>\n' +
            '<tr><td>Chaput, Maria</td><td>1</td><td>decaf</td><td>sugar</td></tr>\n' +
            '<tr><td>Di Nino, Consiglio</td><td>0</td><td>not applicable</td><td>not applicable</td></tr>\n' +
            '<tr><td>Eggleton, Art</td><td>6</td><td>regular</td><td>no sugar</td></tr>\n' +
            '</table>\n' +
            '\n' +
            '</body>\n' +
            '</html>', "text/html")

        const table = new Table(document)
        const actual = table.hasTablesWithSameSummaryAndCaption()
        expect(actual).toBeTruthy()
    })

    it('should check tables with more than one row/column of headers use the id and headers attributes to identify cells', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
            '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n' +
            '<head>\n' +
            '<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />\n' +
            '<title>ATRC Testfile - Check #245.2 - Negative</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '\n' +
            '<table border="1" >\n' +
            '<tr>\n' +
            '\t<th id="class">Class</th>\n' +
            '\t<th id="teacher">Teacher</th>\n' +
            '\t<th id="males">Males</th>\n' +
            '\t<th id="females">Females</th>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="firstyear"  headers="firstyear" rowspan="2">First Year</th>\n' +
            '\t<th id="Bolter" headers="firstyear teacher">D. Bolter</th>\n' +
            '\t<td headers="firstyear Bolter males">5</td>\n' +
            '\t<td headers="firstyear Bolter females">4</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="Cheetham" headers="firstyear teacher">A. Cheetham</th>\n' +
            '\t<td headers="firstyear Cheetham males">7</td>\n' +
            '\t<td headers="firstyear Cheetham females">9</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="secondyear" headers="secondyear" rowspan="3">Second Year</th>\n' +
            '\t<th id="Lam" headers="secondyear teacher">M. Lam</th>\n' +
            '\t<td headers="secondyear Lam males">3</td>\n' +
            '\t<td headers="secondyear Lam females">9</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="Crossy" headers="secondyear teacher">S. Crossy</th>\n' +
            '\t<td headers="secondyear Crossy males">4</td>\n' +
            '\t<td headers="secondyear Crossy females">3</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="Forsyth" headers="secondyear teacher">A. Forsyth</th>\n' +
            '\t<td headers="secondyear Forsyth males">6</td>\n' +
            '\t<td headers="secondyear Forsyth females">9</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '\n' +
            '</body>\n' +
            '</html>', "text/html")
        const text = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
            '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n' +
            '<head>\n' +
            '<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />\n' +
            '<title>ATRC Testfile - Check #245.2 - Negative</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '\n' +
            '<table border="1" >\n' +
            '<tr>\n' +
            '\t<th id="class">Class</th>\n' +
            '\t<th id="teacher">Teacher</th>\n' +
            '\t<th id="males">Males</th>\n' +
            '\t<th id="females">Females</th>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="firstyear"  headers="firstyear" rowspan="2">First Year</th>\n' +
            '\t<th id="Bolter" headers="firstyear teacher">D. Bolter</th>\n' +
            '\t<td headers="firstyear Bolter males">5</td>\n' +
            '\t<td headers="firstyear Bolter females">4</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="Cheetham" headers="firstyear teacher">A. Cheetham</th>\n' +
            '\t<td headers="firstyear Cheetham males">7</td>\n' +
            '\t<td headers="firstyear Cheetham females">9</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="secondyear" headers="secondyear" rowspan="3">Second Year</th>\n' +
            '\t<th id="Lam" headers="secondyear teacher">M. Lam</th>\n' +
            '\t<td headers="secondyear Lam males">3</td>\n' +
            '\t<td headers="secondyear Lam females">9</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="Crossy" headers="secondyear teacher">S. Crossy</th>\n' +
            '\t<td headers="secondyear Crossy males">4</td>\n' +
            '\t<td headers="secondyear Crossy females">3</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="Forsyth" headers="secondyear teacher">A. Forsyth</th>\n' +
            '\t<td headers="secondyear Forsyth males">6</td>\n' +
            '\t<td headers="secondyear Forsyth females">9</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '\n' +
            '</body>\n' +
            '</html>'
        const table = new Table(document)
        const actual = table.hasTHScopeIssues()
        expect(actual).toBeTruthy()
    })

    it('it should return tables has no TH scope issues', () => {
        const parser = new DOMParser();
        const document = parser.parseFromString('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
            '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n' +
            '<head>\n' +
            '<meta http-equiv="Content-Type" content="text/xhtml; charset=UTF-8" />\n' +
            '<title>ATRC Testfile - Check #245.2 - Negative</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '\n' +
            '<table border="1" >\n' +
            '<tr>\n' +
            '\t<th id="class">Class</th>\n' +
            '\t<th id="teacher">Teacher</th>\n' +
            '\t<th id="males">Males</th>\n' +
            '\t<th id="females">Females</th>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="firstyear"  rowspan="2">First Year</th>\n' +
            '\t<th id="Bolter" headers="firstyear teacher">D. Bolter</th>\n' +
            '\t<td headers="firstyear Bolter males">5</td>\n' +
            '\t<td headers="firstyear Bolter females">4</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="Cheetham" headers="firstyear teacher">A. Cheetham</th>\n' +
            '\t<td headers="firstyear Cheetham males">7</td>\n' +
            '\t<td headers="firstyear Cheetham females">9</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="secondyear" headers="lalala" rowspan="3">Second Year</th>\n' +
            '\t<th id="Lam" headers="secondyear teacher">M. Lam</th>\n' +
            '\t<td headers="secondyear Lam males">3</td>\n' +
            '\t<td headers="secondyear Lam females">9</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="Crossy" headers="secondyear teacher">S. Crossy</th>\n' +
            '\t<td headers="secondyear Crossy males">4</td>\n' +
            '\t<td headers="secondyear Crossy females">3</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '\t<th id="Forsyth" headers="secondyear teacher">A. Forsyth</th>\n' +
            '\t<td headers="secondyear Forsyth males">6</td>\n' +
            '\t<td headers="secondyear Forsyth females">9</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '\n' +
            '</body>\n' +
            '</html>', "text/html")

        const table = new Table(document)
        const actual = table.hasTHScopeIssues()
        expect(actual).toBeTruthy()
    })
})
