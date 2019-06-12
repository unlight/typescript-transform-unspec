export function hello(greet = 'world') {
    return `hello ${greet}`;
}

it('hello world test', () => {
    expect(hello()).toBe('hello world');
});

describe('hello world test', () => {
    jest.mock('fs');
});
