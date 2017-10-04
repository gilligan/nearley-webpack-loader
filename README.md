# nearley-webpack-loader

This loader lets you load nearley parser grammar files into your application code.

## Usage

```js
  module: {
    rules: [
      {
        test: /\.ne$/,
        loader: 'nearley-webpack-loader',
        options: {
          baseDir: './src/grammar/'
        }
      }
    ]
  }
```

After that you can import grammar files into your javascript (TypeScript in my case).

```ts
import {Parser, Grammar} from 'nearley'
import * as parser from '../grammar/cfgparser.ne'

class NearleyBasedReader {
  parser: any

  constructor (parser) {
    this.parser = new Parser(Grammar.fromCompiled(parser))
  }

  read (data: string): any[] {
    return this.parser.feed(data).results[0]
  }
}

console.dir(new NearleyBasedReader(parser).read('path/to/file'))
```

## License

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE

Version 69, October 2017

Copyright (C) 2017 Anton Shan <barsikswagoverlord@gmail.com>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. THE SOFTWARE IS PROVIDED "AS IS" WITHOUT ANY SHITS OR WARRANTIES OF ANY KIND
 1. You just DO WHAT THE FUCK YOU WANT TO.
