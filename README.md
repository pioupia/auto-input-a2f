<h1 align="center">Auto Input A2F</h1>
<p align="center">Allows you to automatically change input once it is filled in. Then validate the form when all inputs are filled in correctly.</p>

## Installation

```html
<script src="autoinput.min.js"></script>
```

## Usage

#### HTML
```html
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
```

If you want the plugin to automatically validate the a2f, put on your html element with the onlick eventlistener :
```html
<button onclick="myFunction" data-button-validate>Send my A2F code</button>
```

#### JS
```js
function myFunction(){
  const a2fcode = getNumbersCode();
  // Check your a2f code if you want here.
}
```
