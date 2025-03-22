/**
 * @file A Parser for Story Script
 * @author Chaitanya S <seschaitanya535@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "sscript",


  rules: {
    source_file: ($) => repeat($.scene),
    scene: ($) => seq("{---", "\n", repeat1($.block), "\n", "---}", "\n"),
    block: ($) => choice($.dialogue, $.action),
    action: ($) => seq($.line, "\n"),
    dialogue: ($) =>
      seq(
        $.character_name,
        optional($.character_parenthesis),
        $.character_dialogue,
      ),
    character_name: ($) => seq(/[A-Z]+/, "\n"),
    character_parenthesis: ($) => seq("(", $.identifier, ")", "\n"),
    character_dialogue: ($) => seq($.string, "\n"),
    string: ($) => /"[^"]*"/,
    line: ($) => /[^\n]+/,
    identifier: ($) => /[a-z]+/,
  },
});

