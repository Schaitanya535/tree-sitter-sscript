package tree_sitter_sscript_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_sscript "github.com/schaitanya535/tree-sitter-sscript/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_sscript.Language())
	if language == nil {
		t.Errorf("Error loading Sscript grammar")
	}
}
