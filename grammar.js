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
    scene: ($) => seq($.slug, repeat("\n"), repeat1(seq($.block, repeat("\n"))), $.transition),
    block: ($) => choice($.dialogue, $.action),
    slug: ($) => seq(":: ", $.int_ext_indicator, " ", $.location, optional(seq(" - ", $.additional_specifier)), " - ", $.time, "\n"),
    transition: ($) => seq(":: ", $.transition_name, ":", "\n"),
    action: ($) => seq($.line, "\n"),
    dialogue: ($) =>
      seq(
        $.character_name,
        "\n",
        optional(seq($.dialogue_paranthesis, "\n")),
        $.dialogue_line,
        "\n"
      ),
    character_name: ($) => $.name,
    name: $ => /[A-Z][A-Z \.']*[A-Z]/,
    dialogue_paranthesis: ($) => seq("(", $.identifier, ")"),
    dialogue_line: () => /[^(\n][^\n]*[^)\n]/,
    string: () => /"[^"]*"/,
    line: $ => /[^\n:][^\n]*[^\n:]/,
    identifier: () => /[a-z]+/,
    int_ext_indicator: () => choice("INT.", "EXT.", "INT./EXT."),
    location: ($) => $.name,
    time: ($) => choice("DAY", "NIGHT", "MORNING", "AFTERNOON", "EVENING", "DUSK", "DAWN", "LATE NIGHT", "MIDNIGHT", "NOON"),
    additional_specifier: ($) => $.name,
    transition_name: ($) => $.name,
    extras: ($) => seq(/\s/, $.comment),
    comment: () => /#.*/,
  },
});

