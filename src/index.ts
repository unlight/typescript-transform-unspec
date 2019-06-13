import * as ts from 'typescript';

export function typescriptTransformUnspec(program: ts.Program, options?): ts.TransformerFactory<ts.SourceFile> {
    return (context) => (file) => visitNodeAndChildren(file, program, context);
}

function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.SourceFile {
    return ts.visitEachChild(visitor(node), (childNode) => visitNodeAndChildren(childNode, program, context), context) as ts.SourceFile;
}

function visitor(node: ts.Node): ts.Node | undefined {
    if (isSpecExpressionStatement(node)) {
        return undefined;
    }
    return node;
}

function isSpecExpressionStatement(node: ts.Node) {
    return (ts.isExpressionStatement(node) && ts.isCallExpression(node.expression)
        && ts.isIdentifier(node.expression.expression)
        && node.expression.expression.escapedText === 'it');
}

module.exports = typescriptTransformUnspec;
module.exports.default = typescriptTransformUnspec;
