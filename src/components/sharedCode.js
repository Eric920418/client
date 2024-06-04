export const sharedCode = {
    code: {
        html: '',
        css: '',
        js: ''
    },
    setCode(newCode) {
        this.code.html = newCode.html;
        this.code.css = newCode.css;
        this.code.js = newCode.js;
    }
};