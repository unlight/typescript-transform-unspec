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
    expect(transform(';')).toBe(';');
});

it('should be removed it call expression', () => {
    expect(transform('it()')).toBe('');
    expect(transform('xit()')).toBe('');
    expect(transform('fit()')).toBe('');
});

it('should be removed describe call expression', () => {
    expect(transform('describe()')).toBe('');
    expect(transform('xdescribe()')).toBe('');
    expect(transform('fdescribe()')).toBe('');
});

it('functions with modifiers', () => {
    expect(transform('describe.only()')).toBe('');
    expect(transform('describe.skip()')).toBe('');
    expect(transform('describe.any()')).toBe('');
    expect(transform('test.only()')).toBe('');
    expect(transform('test.skip()')).toBe('');
    expect(transform('test.any()')).toBe('');
    expect(transform('it.only()')).toBe('');
    expect(transform('it.skip()')).toBe('');
    expect(transform('it.any()')).toBe('');
});
