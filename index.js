const loaderUtils = require('loader-utils')
const nearley = require('nearley')
const compile = require('nearley/lib/compile')
const generate = require('nearley/lib/generate')
const nearleyGrammar = require('nearley/lib/nearley-language-bootstrapped')

function compileGrammar(sourceCode, callback) {
  // Parse the grammar source into an AST
  const grammarParser = new nearley.Parser(nearleyGrammar)
  grammarParser.feed(sourceCode)
  const grammarAst = grammarParser.results[0]

  // Compile the AST into a set of rules
  const grammarInfoObject = compile(grammarAst, {})
  // Generate JavaScript code from the rules
  // Note that we hack this so that grammar is a function that we can pass something to.
  // This enables us to inject things into the grammar and reference them using the 'opts' value
  const output = generate(grammarInfoObject, 'grammar').replace('var grammar = {', 'var grammar = function(opts) { return {').replace('if (typeof module', '}; if (typeof module');
  callback(null, output)
}

function replacePaths(source, baseDir) {
  return source.replace(/@include[\s]+"([^"]+)"/gm, function (match, m1) {
    return '@include "' + baseDir + m1 + '"'
  })
}

module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  return compileGrammar(replacePaths(source, options.baseDir || ''), this.async())
}
