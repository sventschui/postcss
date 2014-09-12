var tokenize = require('../lib/tokenize');

describe('tokenize', () => {

    it('tokenizes empty string', () => {
        tokenize('').should.eql([]);
    });

    it('tokenizes space', () => {
        tokenize('  ').should.eql([ ['space', '  '] ]);
    });

    it('tokenizes spaces', () => {
        tokenize('  \n  ').should.eql([ ['space', '  \n'], ['space', '  '] ]);
    });

    it('tokenizes word', () => {
        tokenize('ab').should.eql([ ['word', 'ab', { column: 1, line: 1 }] ]);
    });

    it('tokenizes CSS', () => {
        css = 'a {\n' +
              '  color: black;\n' +
              '  }\n' +
              '@media screen {}';
        tokenize(css).should.eql([
            ['word', 'a', { column: 1, line: 1 } ],
            ['space', ' '],
            ['{'],
            ['space', '\n'],
            ['space', '  '],
            ['word', 'color', { column: 3, line: 2 }],
            [':'],
            ['space', ' '],
            ['word', 'black', { column: 10, line: 2 }],
            [';'],
            ['space', '\n'],
            ['space', '  '],
            ['}', { column: 3, line: 3 }],
            ['space', '\n'],
            ['at-word', '@media', { column: 1, line: 4 }],
            ['space', ' '],
            ['word', 'screen', { column: 8, line: 4 }],
            ['space', ' '],
            ['{'],
            ['}', { column: 16, line: 4 }]
        ]);
    });

});