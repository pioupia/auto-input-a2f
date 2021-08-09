[![](https://img.shields.io/npm/v/auto-input-a2f)](https://www.npmjs.com/package/auto-input-a2f)
[![](https://img.shields.io/npm/dm/auto-input-a2f)](https://www.npmjs.com/package/auto-input-a2f)

<h1 align="center">Auto Input A2F</h1>
<p align="center">Allows you to automatically change input once it is filled in. Then validate the form when all inputs are filled in correctly.</p>

<p align="center">
    <a href="https://github.com/pioupia/auto-input-a2f">
        <img src="https://raw.githubusercontent.com/pioupia/auto-input-a2f/main/assets/autoinputa2f.gif" height="140">
    </a>
</p>

## Installation

#### With npm :
```sh
npm i auto-input-a2f
```
If you use expressjs :
```js
app.use(express.static('.'));
```

In your html file :
```html
<!-- In node_modules -->
<script src="/path/to/autoinput.min.js"></script>
```

#### Without npm :
```html
<script src="https://pioupia.github.io/auto-input-a2f/autoinput.min.js"></script>
```
Or non minified :

```html
<script src="https://pioupia.github.io/auto-input-a2f/autoinput.js"></script>
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
<button onclick="myFunction()" data-button-validate>Send my A2F code</button>
```

#### JS
```js
function myFunction(){
  const a2fcode = getNumbersCode();
  // Check your a2f code if you want here.
}
```
