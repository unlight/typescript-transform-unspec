/* eslint-disable @typescript-eslint/tslint/config */
import * as lib from './index';
import * as ts from 'typescript';

let transformPlugin: typeof lib.typescriptTransformUnspec = lib as any;

function transform(sourceText: string) {
    const program = ts.createProgram({
        rootNames: [],
        options: {},
    });
    const transformer = transformPlugin(program, {});
    const sourceFile = ts.createSourceFile('filename.tsx', sourceText, ts.ScriptTarget.ES5, true, ts.ScriptKind.TSX);
    let result: string | undefined;
    const writeCallback = (fileName: string, data: string) => {
        result = String(data).trim();
    };
    program.emit(sourceFile, writeCallback, undefined, false, { before: [transformer] });
    return result;
}

it('smoke test', () => {
    expect(lib).toBeTruthy();
    expect(transform(';')).toEqual(';');
});

it('should be removed it call expression', () => {
    debugger;
    expect(transform('it()')).toEqual('');
});
