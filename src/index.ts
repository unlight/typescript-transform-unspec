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

// todo: delete only global
const testMethodList = [
    'jasmine',
    'jest',
    'before',
    'after',
    'beforeAll',
    'beforeEach',
    'afterAll',
    'afterEach',
    'describe',
    'fdescribe',
    'xdescribe',
    'it',
    'fit',
    'xit',
    'test',
    'xtest',
    'spyOn',
];

function isTestExpressionText(text: string | ts.__String) {
    return testMethodList.includes(String(text));
}

function isSpecExpressionStatement(node: ts.Node) {
    if (ts.isExpressionStatement(node) && ts.isCallExpression(node.expression)) {
        const callExpr = node.expression.expression;
        if (ts.isIdentifier(callExpr) && isTestExpressionText(callExpr.escapedText)) {
            console.log("callExpr", callExpr.flags);
            return true;
        }
        if (ts.isPropertyAccessExpression(callExpr)) {
            const propertyAccessExpr = callExpr.expression;
            if (ts.isIdentifier(propertyAccessExpr) && isTestExpressionText(propertyAccessExpr.escapedText)) {
                console.log("propertyAccessExpr", propertyAccessExpr.flags);
                return true;
            }
        }
        return false;
    }
}

module.exports = typescriptTransformUnspec;
module.exports.default = typescriptTransformUnspec;
