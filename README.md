# Tree sitter.

## What is it?

Tree sitter is a parser generator tool and an incremental parsing library. It can be used to parse source code in a custom language.

Thanks to it, you can create a parser for a custom language and use it to parse the source code of that language.

Thanks to this, we are able to get nice syntax highlighting, code folding, code navigation, and other features in our text editor.

---

## Where can you see it in action?

NeoVim ships treesiter playout in it by default.

We can use *INSPECTTREE* command to see the tree sitter tree of the current buffer.

WE can then go on to the node and then do "o" to write queries

Queries look like this

```scm
 (character_title (name) @name (#eq? @name "Vivienne")) @character_title
```

---

## How to use it?

This is a simple tree sitter implementation for the a custom language that I am planning to create.
