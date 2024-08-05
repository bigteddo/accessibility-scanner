import {BaseRules} from "./BaseRules";
import _ from "lodash"

export  class Image extends BaseRules{
    public type = 'Image'
    images: any
    constructor(doc: Document) {
        super(doc);
        this.images = this.getTags()
    }

    public getTags(): HTMLElement[] {
        return [...this.document.getElementsByTagName('img')]
    }

    public getWithoutAltAttribute(): any{
        const images = this.images.filter((img: HTMLElement) => !img.hasAttribute('alt'))
        return this.makeIssueObject('missing_alt_attribute', '1.1.1', images)
    }

    public hasImagesMissingAltAttribute(): boolean {
        const withoutAltAttribute = this.getWithoutAltAttribute()
        return withoutAltAttribute.issues.length > 0
    }

    public getWithEmptyAltAttribute(): any{
        const images = this.images.filter((img: HTMLElement) => img.hasAttribute('alt') && _.isEmpty(img.getAttribute('atl')))
        return this.makeIssueObject('missing_alt_attribute', '1.1.1', images)
    }

    public hasImagesEmptyAltAttribute(): boolean {
        const withoutAltAttribute = this.getWithEmptyAltAttribute()
        return withoutAltAttribute.issues.length > 0
    }
    public getAltTextSameAsFilename(): any{
        const images = this.images.filter((img: HTMLElement) => img.getAttribute('src')!== img.getAttribute('alt'))
        return this.makeIssueObject('alt_text_same_as_filename', '1.1.1', images)
    }

    public hasImagesWithAtlTextSameAsFilename(): any{
        const images = this.getAltTextSameAsFilename()
        return images.issues.length > 0
    }
    showIssues(): any[] {
        return [this.getWithoutAltAttribute(), this.getAltTextSameAsFilename(), this.getWithEmptyAltAttribute()].filter(res => res.issues.length > 0);
    }

    hasIssues(): boolean {
        const hasTags = this.getTags().length > 0
        const missingAltAttr = this.hasImagesMissingAltAttribute()
        const hasSameSrcAndAlt = this.hasImagesWithAtlTextSameAsFilename()

        return hasTags && (missingAltAttr || hasSameSrcAndAlt);

    }

}
