var fileInput = null;

function init() {
    const input = document.createElement("input");
    input.type = "file";

    fileInput = input;
}

function accepts(typeSpecifier) {
    fileInput.accepts = typeSpecifier;
}

function multiple() {
    fileInput.multiple = true;
}

function single() {
    fileInput.multiple = false;
}

//

function __browse() {
    return new Promise((resolve, reject) => {
        fileInput.onchange = () => {
            resolve(fileInput.files);
        };
        fileInput.onerror = reject;
        fileInput.click();
    });
}

// returns multiple files or single file depending on "multiple" arg
async function open() {
    const { multiple } = fileInput;

    try {
        const files = await __browse();
        return (multiple ? files : files[0]);
    }
    catch (err) {
        throw err;
    }
}

function openSingle() {
    single();
    return open();
}

function openMultiple() {
    multiple();
    return open();
}

// data conversion

function json(blob) {
    return new Promise((resolve, reject) => {
        const fs = new FileReader();
        fs.onload = () => {
            resolve(JSON.parse(fs.result));
        };
        fs.onerror = reject;
        fs.readAsText(blob);
    });
}

function text(blob) {
    return new Promise((resolve, reject) => {
        const fs = new FileReader();
        fs.onload = () => {
            resolve(fs.result);
        };
        fs.onerror = reject;
        fs.readAsText(blob);
    });
}

function buffer(blob) {
    return new Promise((resolve, reject) => {
        const fs = new FileReader();
        fs.onload = () => {
            resolve(fs.result);
        };
        fs.onerror = reject;
        fs.readAsArrayBuffer(blob);
    });
}

function binaryString(blob) {
    return new Promise((resolve, reject) => {
        const fs = new FileReader();
        fs.onload = () => {
            resolve(fs.result);
        };
        fs.onerror = reject;
        fs.readAsBinaryString(blob);
    });
}

function dataURL(blob) {
    return new Promise((resolve, reject) => {
        const fs = new FileReader();
        fs.onload = () => {
            resolve(fs.result);
        };
        fs.onerror = reject;
        fs.readAsDataURL(blob);
    });
}

// 

async function openJSON() {
    const file = await openSingle();
    return json(file);
}

async function openText() {
    const file = await openSingle();
    return text(file);
}

async function openArrayBuffer() {
    const file = await openSingle();
    return buffer(file);
}

async function openBinaryString() {
    const file = await openSingle();
    return binaryString(file);
}

async function openDataURL() {
    const file = await openSingle();
    return dataURL(file);
}

export default {
    init,
    
    open,
    
    openSingle,
    openMultiple,
    
    accepts,
    single,
    multiple,
    
    json,
    text,
    buffer,
    binaryString,
    dataURL,
    
    openJSON,
    openText,
    openArrayBuffer,
    openBinaryString,
    openDataURL
};
