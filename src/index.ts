import * as ts from 'typescript';

export default function typescriptTransformUnspec(program: ts.Program): ts.TransformerFactory<ts.SourceFile> { // tslint:disable-line:no-default-export
    return (context) => (file) => visitNodeAndChildren(file, program, context);
}

function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.SourceFile {
    const visitor = (childNode) => visitNodeAndChildren(childNode, program, context);
    return ts.visitEachChild<ts.SourceFile>(<ts.SourceFile>filterNode(node), visitor, context);
}

function filterNode<T extends ts.Node>(node: T): T | undefined {
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
            return true;
        }
        if (ts.isPropertyAccessExpression(callExpr)) {
            const propertyAccessExpr = callExpr.expression;
            if (ts.isIdentifier(propertyAccessExpr) && isTestExpressionText(propertyAccessExpr.escapedText)) {
                return true;
            }
        }
    }
    return false;
}

module.exports = typescriptTransformUnspec;
module.exports.default = typescriptTransformUnspec;
