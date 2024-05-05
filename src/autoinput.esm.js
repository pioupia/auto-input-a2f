/* Create By Pioupia https://github.com/pioupia/auto-input-a2f/ | MIT License */

class AutoInput {
    #autoEnd;
    #selectAuto;
    #canPast;
    #createAuto;
    #parent;
    #validate;
    #onCreate;
    #boxes;
    #validatingTime;
    #callback;

    /**
     * The AutoInput class
     * @param {object} options The options for the AutoInput.
     * @param {boolean} options.autoEnd If the input should fired an event when the text is completed.
     * @param {boolean} options.selectAuto If the input should auto select the first input field.
     * @param {boolean} options.canPast If the input should allow pasting.
     * @param {boolean} options.createAuto If the AutoInput should create the HTML inputs automatically.
     * @param {Function} options.onCreate The callback when the AutoInput creates the HTML inputs.
     * @param {HTMLElement} options.parent The parent were the child will automatically generate the HTML inputs.
     * @param {HTMLElement} options.validate The validate button to validate the entry.
     */
    constructor(options = {}) {
        this.#autoEnd = options.autoEnd || true;
        this.#selectAuto = options.selectAuto || true;
        this.#canPast = options.canPast || true;
        this.#createAuto = options.createAuto || false;
        this.#parent = options.parent
                        || document.getElementById("a2fParent")
                        || document.querySelector("[data-parent-a2f]");
        this.#validate = options.validate || document.querySelector("[data-button-validate]");
        this.#onCreate = options.onCreate;
        this.#boxes = null;

        this.#init();
    }

    /**
     * Create automatically input balises.
     */
    #initAuto() {
        for (let i = 0; i < 6; i++) {
            let el = document.createElement("input");
            el.setAttribute("data-a2f", "");
            el.setAttribute("type", "text");
            el.setAttribute("placeholder", "0");
            el.setAttribute("required", "");

            if (this.#onCreate instanceof Function)
                el = this.#onCreate(el, i) || el;

            if (i == 3) {
                let span = document.createElement("span");
                span.textContent = "-";

                span = this.#onCreate(span, i);
                if (span)
                    this.#parent.appendChild(span);
            }

            this.#parent.appendChild(el);
        }
    }

    /**
     * Initialize the AutoInput.
     */
    #init() {
        if (this.#createAuto && !this.#parent)
            throw new Error("The parent does not exist. Please fill the parent option, or create an element with the a2fParent id or the data-parent-a2f attribute.");
        if (this.#createAuto)
            this.#initAuto();

        this.#boxes = (this.#parent || document).querySelectorAll("[data-a2f]");
        if (this.#boxes.length < 2)
            return;

        if (this.#selectAuto)
            this.#boxes[0].focus();

        for (let i = 0; i < this.#boxes.length; i++) {
            const element = this.#boxes[i];

            element.onpaste = (e) => this.#handlePaste(e);
            element.onkeypress = (e) => e.preventDefault();
            element.onkeydown = event => this.#onKeyDown(event);
        }
    }

    #canValidate() {
        for (const element of this.#boxes.values()) {
            if (!element.value) {
                this.#validatingTime = 0;
                return false;
            }
        }

        this.#validatingTime = Date.now();

        setTimeout(() => {
            if (this.#validatingTime &&
                this.#validatingTime + 400 > Date.now())
                return;

            if (this.#autoEnd) {
                if (this.#callback instanceof Function)
                    return this.#callback(this.getCode());
                this.#validate?.click();
            }
        }, 400);
    }

    #onKeyDown(event) {
        const { key, target } = event;
        event.preventDefault();

        switch (key) {
            case "Backspace":
            case "Delete":
                target.value = "";
            case "ArrowLeft":
                let prevElement = target.previousElementSibling;
                if (prevElement?.tagName === "SPAN")
                    prevElement = prevElement.previousElementSibling;
                prevElement?.focus();
                break;
            case "ArrowRight":
                let nextElement = target.nextElementSibling;
                if (nextElement?.tagName === "SPAN")
                    nextElement = nextElement.nextElementSibling;
                nextElement?.focus();
                break;
            case "ArrowUp":
                this.#boxes.item(this.#boxes.length - 1).focus();
                break;
            case "ArrowDown":
                this.#boxes[0].focus();
                break;
            default:
                if (isNaN(key))
                    return;
                target.value = key;
                this.#onKeyDown({ key: "ArrowRight", target, preventDefault: () => null });
                this.#canValidate();
                break;
        } 
    }

    #handlePaste(event) {
        if (!this.#canPast)
            return;

        event.stopPropagation();
        event.preventDefault();

        const clipboardData = event.clipboardData || window.clipboardData;
        if (!clipboardData)
            return;

        const data = clipboardData.getData("Text");
        const textLength = data.length > this.#boxes.length ?
                            this.#boxes.length :
                            data.length;
        for (let i = 0; i < textLength; i++) {
            if (isNaN(data[i]))
                continue;

            this.#boxes[i].value = data[i];
        }

        this.#canValidate();
    }

    /**
     * Register the callback to call when the code is validated.
     * @param {Function} callback Callback to call when the code is validated.
     */
    onValidate(callback) {
        this.#callback = callback;
    }

    /**
     * Get the input code. Can be incomplet if the input is not complete.
     * @returns {string} The code in the input.
     */
    getCode() {
        let code = "";
        this.#boxes.forEach((element) => {
            code += element.value;
        });

        return code;
    }

    /**
     * Reset all the input fields.
     */
    removeEntries() {
        this.#boxes.forEach((element) => {
            element.value = "";
        });
    }
}

export { AutoInput };