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
    source_file: ($) => repeat($._definition),
    _definition: ($) => choice(repeat($.scene)),
    // act: ($) => seq("Act", $.identifier, $.block),
    // chapter: ($) => seq("Chapter", $.identifier, $.block),
    // transition: ($) => seq("Transition", $.identifier, $.identifier),
    // dialogue: ($) => seq("Dialogue", $.identifier, $.string),
    // block: ($) => seq(repeat($.statement)),
    statement: ($) => choice($.dialogue, $.scene),
    scene: ($) => seq(repeat(choice($.action, $.dialogue))),
    action: ($) => seq($.identifier, $.string),
    dialogue: ($) =>
      seq(
        $.character_name,
        optional($.character_parenthesis),
        $.character_dialogue,
      ),
    character_name: ($) => /[A-Z][a-z]+/,
    character_parenthesis: ($) => seq("(", $.identifier, ")"),
    character_dialogue: ($) => $.string,
    string: ($) => /"[^"]*"/,
    identifier: ($) => /[a-z]+/,
  },
});
