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
    scene: ($) => seq("{---", "\n", repeat1(seq($.block, repeat("\n"))), "---}", "\n"),
    block: ($) => choice($.dialogue, $.action),
    action: ($) => seq($.line, "\n"),
    dialogue: ($) =>
      seq(
        $.character_name,
        optional($.dialogue_paranthesis),
        $.dialogue_line,
      ),
    character_name: ($) => seq(/[A-Z \.]+/, "\n"),
    dialogue_paranthesis: ($) => seq("(", $.identifier, ")", "\n"),
    dialogue_line: ($) => seq($.string, "\n"),
    string: ($) => /"[^"]*"/,
    line: ($) => /[^\n]+/,
    identifier: ($) => /[a-z]+/,
  },
});

