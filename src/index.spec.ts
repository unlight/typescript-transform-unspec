/* eslint-disable @typescript-eslint/tslint/config */
import * as lib from './index';
import * as ts from 'typescript';

type CreateFixtureArguments = {
    sourceText: string;
};

function createFixture(createFixtureArguments: CreateFixtureArguments) {
    const {
        sourceText
    } = createFixtureArguments;
    ts.createSourceFile('filename.tsx', sourceText, ts.ScriptTarget.Latest);
}

it('smoke test', () => {
    expect(lib).toBeTruthy();
});

