import XCTest
import SwiftTreeSitter
import TreeSitterSscript

final class TreeSitterSscriptTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_sscript())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Sscript grammar")
    }
}
