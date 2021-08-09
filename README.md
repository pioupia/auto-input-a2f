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

If you dont want to put all the html code yourself, a function is available in javascript that will create all the code for you in one line.

Init the package :
```js
initAutoInput(options, callback);
```

The callback is optional, it's if you dont want to assigned an atribute to your button of validation.

| Options  | Description | Default | Type |
| ------------- | ------------- | ------------- | ------------- |
| autoend  | Activates the automatic end. Notify you when the user has completely filled the captcha via the callback or by pressing your element to signal the end. | true | Boolean |
| selectAuto  | Automatically selects the first input to be filled in when the user arrives on the page  | true | Boolean |
| canPast | Allows user to paste a2f code | true | Boolean |
| createAuto | Automatically creates all the html code required for validation of the a2f. | false | Boolean |
| parent | Only if the createAuto option is activated. Defines the parent of the automatically generated html code. May not be enabled if and only if the parent contains the attribute : "data-parent-a2f" | get the attribute "data-parent-a2f" OR get the id #a2fParent | HTML element |


If you have verified the a2f code and he's not valid, you can reset all the values with this function :

```js
deleteNumbersCode();
```

If you want to get the actual a2f code of the user, you can call this function :
```js
getNumbersCode() // => 123456
```

#### HTML

(Only if the createAuto option is not activated)

```html
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
<input data-a2f type="number" min="0" max="9" placeholder="0" required>
```

If you want the plugin to automatically validate the a2f, put on your html element with the onlick eventlistener (only with autoend option activated) :

```html
<button onclick="myFunction()" data-button-validate>Send my A2F code</button>
```
OR use the callback function like that :

```js
initAutoInput(options, myFunction);
```

#### JS
```js
// Without callback
function myFunction(){
  const a2fcode = getNumbersCode(); 
  // -> 123456 (int)
  // Check your a2f code if you want here.
}


// With callback
function myFunction(code){
  // code => 123456 (int)
  // Check your a2f code if you want here.
}
```

#### Exemple 

```html
<div class="container">
  <div data-parent-a2f>
  </div>
  <button id="sendA2F" onclick="myFunctionTest">Send</button>
</div>
<script src="https://pioupia.github.io/auto-input-a2f/autoinput.min.js"></script>
```

```js
initAutoInput({ createAuto: true }, myFunctionTest);

function myFunctionTest(code){
    if(typeof code !== 'number') code = getNumbersCode();
    console.log(code) // 123456

    if(!check(code)) return deleteNumbersCode();
}
```