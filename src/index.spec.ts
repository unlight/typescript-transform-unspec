/* eslint-disable @typescript-eslint/tslint/config */
import * as lib from './index';
import * as ts from 'typescript';
import { visitNodeAndChildren } from './visitor';

function transform(sourceText: string) {
    const sourceFile = ts.createSourceFile('filename.tsx', sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    visitNodeAndChildren(sourceFile, <any>undefined, <any>undefined);
    return sourceFile.getText();
}

it('smoke test', () => {
    expect(lib).toBeTruthy();
    expect(visitNodeAndChildren).toBeTruthy();
    expect(transform(';')).toEqual(';');
});

fit('should be removed it call expression', () => {
    debugger;
    expect(transform('it()')).toEqual('');
});

