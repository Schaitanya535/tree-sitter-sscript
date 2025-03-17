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
    _definition: ($) => choice($.act),
    act: ($) => seq("Act", $.identifier, $.block),
    chapter: ($) => seq("Chapter", $.identifier, $.block),
    transition: ($) => seq("Transition", $.identifier, $.identifier),
    dialogue: ($) => seq("Dialogue", $.identifier, $.string),
    scene: ($) => seq("Scene", $.identifier, $.block),
    block: ($) => seq("{", repeat($._statement), "}"),
    _statement: ($) => choice($.chapter, $.dialogue, $.scene, $.transition),
  },
});
