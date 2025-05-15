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

    source_file: ($) => repeat(choice($.scene, $.chapter, $.character, $.location, $.lore)),

    // chapters
    // chapter has a title and paragraphs and start with :: CHAPTER -1 <chapter_title> and end with ::: 

    chapter: ($) => seq($.chapter_title, repeat($.paragraph), $.end_section),
    chapter_title: ($) => seq(":: CHAPTER - ", $.int, ": ", $.name, "\n\n"),
    paragraph: ($) => seq($.line, "\n"),
    end_section: ($) => seq(":::", "\n"),
    int: () => /[0-9]+/,

    // Characters 
    // character has a name and description and start with :: CHARACTER <character_name> and end with :::

    character: ($) => seq($.character_title, repeat($.paragraph), $.end_section),
    character_title: ($) => seq(":: CHARACTER : ", $.name, "\n\n"),

    // Locations
    // location has a name and description and start with :: LOCATION <location_name> and end with :::
    location: ($) => seq($.location_title, repeat($.paragraph), $.end_section),
    location_title: ($) => seq(":: LOCATION : ", $.name, "\n\n"),

    // Lore

    // lore has a name and description and start with :: LORE <lore_name> and end with :::
    lore: ($) => seq($.lore_title, repeat($.paragraph), $.end_section),
    lore_title: ($) => seq(":: LORE : ", $.name, "\n\n"),


    // scene
    scene: ($) => seq($.slug, repeat("\n"), repeat1(seq($.block, repeat("\n"))), $.transition),
    block: ($) => choice($.dialogue, $.action),
    slug: ($) => seq(":: ", $.int_ext_indicator, " ", $.slug_location, optional(seq(" - ", $.additional_specifier)), " - ", $.time, "\n"),
    transition: ($) => seq(":: ", $.transition_name, ":", "\n"),
    action: ($) => seq($.line, "\n"),
    dialogue: ($) =>
      seq(
        // seq($.character_name, optional(seq(" ", "(", $.dialogue_type, ")")), "\n"),
        seq($.character_name, "\n"),
        repeat(
          $.dialogue_line
        ),
        "\n\n"
      ),

    character_name: ($) => $.name,
    name: $ => /[A-Z][A-Z \.'(]*[A-Z)]/,
    dialogue_type: () => choice("O.S.", "CONT'D", "MORE"),
    dialogue_paranthesis: ($) => seq("(", $.identifier, ")"),
    dialogue_line: () => /[^\n]*/,
    string: () => /"[^"]*"/,
    line: $ => /[^\n:][^\n]*[^\n:]/,
    identifier: () => /[a-z]+/,
    int_ext_indicator: () => choice("INT.", "EXT.", "INT./EXT."),
    slug_location: ($) => $.name,
    time: ($) => choice("DAY", "NIGHT", "MORNING", "AFTERNOON", "EVENING", "DUSK", "DAWN", "LATE NIGHT", "MIDNIGHT", "NOON"),
    additional_specifier: ($) => $.name,
    transition_name: ($) => $.name,

    //extras
    // extras: ($) => seq(/\s/, $.comment),
    // comment: () => /#.*/,
  },
});

