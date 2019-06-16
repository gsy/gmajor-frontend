export class XmlParser {
  constructor(xmlString) {
    let parser = new DOMParser();
    this.doc = parser.parseFromString(xmlString, "application/xml");
    console.log("doc:", this.doc)
  }
}
