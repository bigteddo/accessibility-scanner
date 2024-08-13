import {BaseRules} from "./BaseRules";
import _ from "lodash"
import RuleInterface from "./contracts/RuleInterface";

export  class Table extends BaseRules implements RuleInterface{
    public type = 'Table'
    tables: any
    constructor(doc: Document) {
        super(doc);
        this.tables = this.getTags()
    }

    public getTags(): HTMLElement[] {
        return [...this.document.getElementsByTagName('table')]
    }

    public getWithEmptySummary(){
        const tables = this.tables.filter((table: HTMLElement) => table.hasAttribute('summary') && _.isEmpty(table.getAttribute('summary')))
        return this.makeIssueObject('summary_does_not_contain_text', '1.3.1', tables)
    }


    public hasTablesWithEmptySummary(): boolean {
        const emptySummary = this.getWithEmptySummary()
        return emptySummary.issues.length > 0
    }

    public requireSummary(){
        const tables = this.getComplexTables()
        return tables.issues.length > 0
    }

    public getComplexTables(){
        const tables = this.evaluateTables()
        return this.makeIssueObject('table_requires_summary' ,'1.3.1', tables )
    }
    /**
     * Method to evaluate complexity of tables and their summary attribute
     *
     * @returns {object[]} Array of tables falling in criteria
     */
    private evaluateTables(): object[] {
        const complexTables: object[] = [];
        this.tables.forEach((table: HTMLTableElement) => {
            // Determine if table is complex:
            // check for multiple groups of columns (thead, tbody and tfoot denote groups) or
            // check for multiple row or column headers
            let rowHeaderCount = 0;
            let columnHeaderCount = 0;
            const groupCount = table.getElementsByTagName('thead').length + table.getElementsByTagName('tbody').length +
                table.getElementsByTagName('tfoot').length;

            // Get all rows of the table
            const rows = table.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];

                // Check if row contains a 'th' element (header)
               for (let c = 0; c < row.getElementsByTagName('th').length; c++ ) {
                    columnHeaderCount++;
                }

                // Check if row's first child is a 'th' element (header) indicating a row header
                if (row.firstElementChild?.nodeName === 'TH') {
                    rowHeaderCount++;
                }
            }
            // Check if the table has a summary attribute
            let hasSummaryAttr = table.hasAttribute('summary');
            // Condition for complex table:
            // Multiple groups of columns/rows or multiple sets of row/column headers
            if ((groupCount > 1 || rowHeaderCount >= 1 || columnHeaderCount > 1) && !hasSummaryAttr) {

                complexTables.push({table, hasSummaryAttr});
            }
        });

        return complexTables;
    }


    /**
     * Checks if the summary of each table is the same as its caption.
     *
     * @returns {object[]} Array of tables where the summary and caption do not match.
     */
    public getWithSameSummaryAndCaption() {

         const tables = this.tables.filter((table: HTMLElement) => {
            let captionText = ''
            let captionElements = Array.prototype
                .slice.call(table.getElementsByTagName('caption'))
            if (captionElements.length > 0) {
                captionText = captionElements[0].innerHTML
            }
            const summary = table.getAttribute('summary')
             return summary == captionText
        });

         return this.makeIssueObject('table_summary_and_caption_equal','1.3.1', tables)
    }

    public hasTablesWithSameSummaryAndCaption(){
        const results = this.getWithSameSummaryAndCaption()
        return results.issues.length > 0
    }


    public getWithTHScopeIssues(){
        const tablesWithIdAndHeaders: object[] = [];

        this.tables.forEach((table: HTMLTableElement) => {
            // Get all rows of the table
            const rows = table.getElementsByTagName('tr');
            let headerCounter = 0;
            for (let i = 0; i < rows.length; i++) {
                // Access each cell in this row
                for (let j = 0; j < rows[i].cells.length; j++) {
                    const cell = rows[i].cells[j];
                    // If this cell is a header and has an id and headers attribute, increase the counter
                    if (cell.nodeName === 'TH' && !cell.hasAttribute('id') && !cell.hasAttribute('headers')) {
                        headerCounter++;
                    }
                }
            }
            // If the table contained more than one cell that had an id and headers attribute, add it to the list
            if (headerCounter > 1) {
                tablesWithIdAndHeaders.push(table);
            }
        });

        return this.makeIssueObject('table_summary_and_caption_equal','1.3.1', tablesWithIdAndHeaders)
    }

    public hasTHScopeIssues(){
        const doc = this.getWithTHScopeIssues()
        return doc.issues.length > 0
    }

    public doesNotUseScopeAttributeToIdCells(){

            const tablesWithInvalidHeaderScope: object[] = [];

            this.tables.forEach((table: HTMLTableElement) => {
                // Get all rows of the table
                const rows = table.getElementsByTagName('tr');
                let invalidHeaderCounter = 0;
                for (let i = 0; i < rows.length; i++) {
                    // Access each cell in this row
                    for (let j = 0; j < rows[i].cells.length; j++) {
                        const cell = rows[i].cells[j];
                        // If this cell is a header and it does not contain a 'scope' attribute, it's invalid
                        if (cell.nodeName === 'TH' && !cell.hasAttribute('scope')) {
                            invalidHeaderCounter++;
                        }
                    }
                }
                // If the table had any invalid headers, add it to the list
                if (invalidHeaderCounter > 0) {
                    tablesWithInvalidHeaderScope.push(table);
                }
            });

            return this.makeIssueObject('table_does_not_use_scope_attribute_to_id_cells', '1.3.1', tablesWithInvalidHeaderScope)
        }

    public hasCellScopeIssues(){
        const doc = this.doesNotUseScopeAttributeToIdCells()
        return doc.issues.length > 0
    }

    public hasIssues(): boolean {
        const hasTags = this.getTags().length > 0
        const haveTablesWithoutSummaryAttribute = this.requireSummary()
        const haveTablesWithSameSummaryAndCaption = this.hasTablesWithSameSummaryAndCaption()
        const haveCellsWithTHScopeIssues = this.hasTHScopeIssues()
        const haveCellScopeAttrIssues = this.hasCellScopeIssues()
        const haveEmptySummaryIssues = this.hasTablesWithEmptySummary()
        const HasIssues = ( haveTablesWithoutSummaryAttribute || haveTablesWithSameSummaryAndCaption || haveCellsWithTHScopeIssues || haveCellScopeAttrIssues || haveEmptySummaryIssues )
        return hasTags && HasIssues

    }

    public showIssues(): any[] {
        return [this.getWithEmptySummary(),this.getWithTHScopeIssues(),this.doesNotUseScopeAttributeToIdCells(),this.getWithSameSummaryAndCaption(),this.getComplexTables()]
    }


}
