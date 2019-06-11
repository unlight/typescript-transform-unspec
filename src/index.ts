import * as ts from 'typescript';

function typescriptTransformUnspec<T extends ts.Node>(program: ts.Program): ts.TransformerFactory<T> {
    return (context: ts.TransformationContext) => {
        const visit: ts.Visitor = (node) => {
            if (isSpecExpressionStatement(node)) {
                return undefined;
            }
            return ts.visitEachChild(node, (child) => visit(child), context);
        };
        return (node) => ts.visitNode(node, visit);
    };
}

function isSpecExpressionStatement(node: ts.Node) {
    return (ts.isExpressionStatement(node) && ts.isCallExpression(node.expression)
        && ts.isIdentifier(node.expression.expression)
        && node.expression.expression.escapedText === 'it');
}

if (typeof it !== 'function') {
    // @ts-ignore
    var it: any = () => { };
}
it('smoke', () => {
    expect(typescriptTransformUnspec).toBeTruthy();
});

module.exports = typescriptTransformUnspec;
module.exports.default = typescriptTransformUnspec;
