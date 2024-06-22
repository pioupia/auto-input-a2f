[![](https://img.shields.io/npm/v/auto-input-a2f)](https://www.npmjs.com/package/auto-input-a2f)
[![](https://img.shields.io/npm/dm/auto-input-a2f)](https://www.npmjs.com/package/auto-input-a2f)

# Auto Input for 2FA fields
Allows you to automatically change input once it is filled in. Then validate the form when all inputs are filled in correctly.

<p align="center">
    <a href="https://github.com/pioupia/auto-input-a2f">
        <img src="https://raw.githubusercontent.com/pioupia/auto-input-a2f/main/assets/autoinputa2f.gif" height="140">
    </a>
</p>

## Table of content:
- [Installation](#installation)
    - [npm](#npm)
    - [sources](#from-sources)
- [Usage](#usage)
    - [import](#import)

## Installation

### npm:
With npm:
```sh
npm i auto-input-a2f
```

With pnpm:
```sh
npm i auto-input-a2f
```

With yarn:
```sh
yarn add auto-input-a2f
```

If you are using a web server such as [`expressjs`](http://expressjs.com/), you need to set the file as static files to serve them. For example, for `expressjs` you'll need:
```js
app.use(express.static('/node_modules/auto-input-a2f/dist/'));
```

In your html file :
```html
<script src="/autoinput.min.js" integrity="sha384-3xMAq3v420qJ9QycjUquk5fzV5AsgAc2mHbawmO7Ww47t8uYVG77RAbjSPXwoUdt" crossorigin="anonymous"></script>
```
For all other files, you can [get the shashum below](#minified-javascript)

### From sources:

#### Minified JavaScript:
```html
<script src="https://pioupia.github.io/auto-input-a2f/autoinput.min.js" integrity="sha384-3xMAq3v420qJ9QycjUquk5fzV5AsgAc2mHbawmO7Ww47t8uYVG77RAbjSPXwoUdt" crossorigin="anonymous"></script>
```

#### Unminified JavaScript:
```html
<script src="https://pioupia.github.io/auto-input-a2f/autoinput.js" integrity="sha384-CF8ZxUqjo775do4laX6zgbVaceTNKvlvgx98HrwB73Wmqkmj2kaGmxVaDE/bKsb3" crossorigin="anonymous"></script>
```


## Usage

### Import
For `module` type, you'll need to import correctly the `AutoInput` class:
```js
import AutoInput from "./autoinput.esm.js";
```

### Initiate the class:
First of all, you need to instantiate the `AutoInput` class:

```js
const autoinput = new AutoInput(options);
```

The class could take some `options` as an `object`. All options are optional.

name | type | default value | description
---- | ---- | ------------- | -----------
`autoEnd` | `boolean` | `true` | Fired an event when the text is completed.
`selectAuto` | `boolean` | `true` | Will automatically focus the first input field (just after initializing fields).
`canPast` | `boolean` | `true` | Enable / disable pasting in fields.
`createAuto` | `boolean` | `false` | Will automatically create input field for you.
`buttonCallback` | `boolean` | `false` | Trigger the `onClick` event of the `validate` button.
`beforeFire` | `number` | `400` | Will waits `beforeFire` milliseconds before firing the automatic event.
`onCreate` | `Function` | `null` | The callback when creates the input fields. This allows you to add some property on the `HTMLElement` or change it completly.
`parent` | `HTMLElement` | `#a2fParent` or `[data-parent-a2f]` | The parent element into which the input fields will be injected.
`validate` | `HTMLElement` | `[data-button-validate]` | The submit button to validate the 2fa code.

#### `autoEnd`:
This option will fired the `callback` function, and click on the `validate` button when the 2FA code is completely filled.

The [`callback` function](#callback-function) can be registered by calling the public `onValidate` method.

#### `createAuto`:
This option will automatically create the input fields for you. The elements will be `appendChild` to the `parent` HTMLElement. During the creation of the input fields, if the `onCreate` callback is defined, it'll be fired for each input field.

The number of created field is 6.

#### `buttonCallback`:
If enabled, when the `autoEnd` option is enabled, it will emit the `onClick` event on the `validate` HTMLButton.

#### `beforeFire`:
The time in miliseconds waited by the class before calling the [`callback` function](#callback-function), and fired the `onClick` event.
