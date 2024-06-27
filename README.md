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

#### `onCreate`:
This function will be called when the input fields are created. The function will take the create `HTMLElement` as argument, and should also returned an `HTMLElement` which will be added to the DOM. If nothing is returned from the function, the element will not be added.
This can be usefull if you want to add custom classes or attributes to the input fields. Or if you want to change the type of the input fields, by adding a more complex structure to it.

However, you can also completely remove the field if you do not want it.


## Examples:
For example, you want to create automatically 6 input fields, and validate the form when all fields are filled in correctly after 800 miliseconds.

Because we have the `buttonCallback` enabled, if the user click on the validation button, the `onValidate` function will be automatically called.

But we can have a problem if the user is going to click on the `validate` button before the 800 miliseconds. To avoid this, we can disable the `buttonCallback` option by calling the `stopAutoEnd` method during the server verification.

For each created input fields, we want to add some classes to it. We can do this by using the `onCreate` callback.

If the input field is a SPAN, we don't want a `span` element (the dash `-` between the input fields) to be added to the DOM. So we can return `null` in this case.

Otherwise, we'll add some classes to our element. But if the inserted element is the fourth one, we'll add a margin to the left.


```js
const input = new AutoInput({
	createAuto: true,
	parent: document.getElementById("2fa_container"),
	validate: document.getElementById("validate_2fa_code"),
	buttonCallback: true,
	beforeFire: 800,
	onCreate: (element, i) => {
		if (element.tagName === "SPAN")
			return (null);
		element.classList.add("form-control");
		element.classList.add("otp_input");
		element.classList.add(i === 3 ? "ms-3" : "ms-1");
		element.classList.add("me-1");
		element.classList.add("text-center");

		return (element);
	}
});

function onValidate(code) {
	// do something with the code...
	input.stopAutoEnd();

	fetch("/api/code", {
		method: "POST",
		body: JSON.stringify({ code }),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(res => {
		if (res.ok) {
			// do something...
		} else {
			// do something...

			// enable the autoEnd
			input.startAutoEnd();
		}
	});
}

input.onValidate(onValidate);
```