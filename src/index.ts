import * as ts from 'typescript';
import { visitNodeAndChildren } from './visitor';

function typescriptTransformUnspec(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
    return (context) => (file) => visitNodeAndChildren(file, program, context);
}

module.exports = typescriptTransformUnspec;
module.exports.default = typescriptTransformUnspec;
