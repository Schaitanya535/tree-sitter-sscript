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
        "\n",
        optional(seq($.dialogue_paranthesis, "\n")),
        $.dialogue_line,
        "\n"
      ),
    character_name: ($) => /[A-Z \.]+/,
    dialogue_paranthesis: ($) => seq("(", $.identifier, ")"),
    dialogue_line: ($) => $.line,
    string: ($) => /"[^"]*"/,
    line: ($) => /[^\n]+/,
    identifier: ($) => /[a-z]+/,
  },
});

