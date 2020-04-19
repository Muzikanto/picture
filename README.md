## Picture (material-ui)

[![npm version](https://badge.fury.io/js/%40muzikanto%2Fpicture.svg)](https://badge.fury.io/js/%40muzikanto%2Fpicture)
[![downloads](https://img.shields.io/npm/dm/@muzikanto/picture.svg)](https://www.npmjs.com/package/@muzikanto/picture)
[![dependencies Status](https://david-dm.org/muzikanto/picture/status.svg)](https://david-dm.org/muzikanto/picture)
[![size](https://img.shields.io/bundlephobia/minzip/@muzikanto/picture)](https://bundlephobia.com/result?p=@muzikanto/picture)

<!-- TOC -->

-  [Introduction](#introduction)
-  [Installation](#installation)
-  [Preview](#preview)
-  [Examples](#examples)
   -  [base](#base)
   -  [advanced](#advanced)
-  [API](#api)
-  [License](#license)

<!-- /TOC -->

![](https://github.com/Muzikanto/picture/blob/master/picture.gif?raw=true)

## Introduction

Peer dependencies: 
    `react`, `react-dom`,
    `material-ui/core`, `material-ui/styles`

## Installation

```sh
npm i @muzikanto/picture
# or
yarn add @muzikanto/picture
```

## Examples

[Example in storybook](https://muzikanto.github.io/picture)

### Base

```typescript jsx
function Component() {
  return (
     <Picture
        src={"your image url"}
        aspectRatio={16 / 9}
       />
  )
}
```

### Advanced

```typescript jsx

const StyledPicture = withStyles(() => ({
    error: {
        color: 'red',
        fontSize: 50,
    },
}))(Picture)

function Component() {
  return (
     <Picture
        src={"your image url"}
        aspectRatio={16 / 9}
        onClick={(e) => alert('onClick')}
        onLoad={(e) => alert('onLoad')}
        onError={(e) => alert('onError')}
          
        renderLoading={() => ...Custom Loading Component}
        renderError={() => ...Custom Error Component}
       />
  )
}

```

## License

[MIT](LICENSE)
