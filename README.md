# typescript-transform-unspec
Typescript transform plugin removes spec definition from source file.  
Inspired by [unassert](https://github.com/unassert-js/unassert).

## Motivation
Imagine we have `function.ts` with single function. Usually we create `function.spec.ts` with tests.
But what if we can keep tests in same file, and remove spec defenition for production.

## Example

### Before
```ts
export function hello(greet = 'world') {
    return `hello ${greet}`;
}

it('hello world test', () => {
    expect(hello()).toBe('hello world');
});
```

### After
```js
function hello(greet) {
    if (greet === void 0) { greet = 'world'; }
    return "hello " + greet;
}
````

## Installation
```sh
npm install --save-dev typescript-transform-unspec
```

## Usage

#### webpack (with ts-loader or awesome-typescript-loader)
```js
// webpack.config.js
const unspecTransformer = require('typescript-transform-unspec');

rules: [
  {
    test: /\.tsx?$/,
    loader: 'ts-loader', // or 'awesome-typescript-loader'
    options: {
      getCustomTransformers: program => ({
          before: [
              unspecTransformer(program),
          ]
      })
    }
  },
]
```

#### TTypescript
```json
// tsconfig.json
{
    "compilerOptions": {
        "plugins": [
            { "transform": "typescript-transform-unspec" },
        ]
    },
}
```

#### Rollup (with rollup-plugin-typescript2)
```js
// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import unspecTransformer from 'typescript-transform-unspec';

plugins: [
  typescript({ 
    transformers: [
        service => ({ 
            before: [unspecTransformer(service.getProgram())],
            after: [],
        }),
    ],
  }),
]
```

## Resources
- https://dev.doctorevidence.com/how-to-write-a-typescript-transform-plugin-fc5308fdd943
- https://github.com/Saviio/ts-sfc-plugin
- https://github.com/LeDDGroup/typescript-transform-jsx
- https://github.com/Saviio/ts-react-pure-class-plugin
- https://github.com/uittorio/ts-auto-mock
- https://github.com/geocine/typescript-transform
- https://github.com/cevek/ttypescript
- https://github.com/rimeto/ts-optchain
- https://github.com/woutervh-/typescript-is
- https://github.com/kimamula/ts-transformer-keys
- https://github.com/kimamula/ts-transformer-enumerat
- https://github.com/firede/ts-transform-graphql-tag
- https://github.com/longlho/ts-transform-img
- https://github.com/longlho/ts-transform-css-modules
- https://github.com/longlho/ts-transform-react-intl
- https://github.com/dsherret/ts-nameof
- https://github.com/LeDDGroup/typescript-transform-jsx
- https://github.com/LeDDGroup/typescript-transform-paths
- https://github.com/LeDDGroup/typescript-transform-macros
- https://github.com/timocov/ts-transformer-minify-privates
- https://github.com/cevek/ttypescript/tree/master/packages/ttypescript-examples/src
