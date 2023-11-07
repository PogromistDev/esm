const fileInput = document.createElement("input");
const a = document.createElement("a");
fileInput.type = "file";
a.download = "default";

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

async function __browse() {

    if ("showOpenFilePicker" in window) {
        try {
            const fileSystemFileHandles = await window.showOpenFilePicker({ multiple: fileInput.multiple });
            const files = await Promise.all( fileSystemFileHandles.map(fsHandle => fsHandle.getFile()) );

            return files;
        }
        catch(err) {
            throw err;
        }
    } else {
        return new Promise((resolve, reject) => {
            fileInput.onchange = () => {
                resolve(fileInput.files);
            };
            fileInput.onblur = reject;
            fileInput.onerror = reject;
            fileInput.click();

        });
    }
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
            try {
                const json = JSON.parse(fs.result)
                resolve(json);
            }
            catch (err) {
                reject(err);
            }
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
    try {
        const file = await openSingle();
        return json(file);
    } catch (err) {
        throw err;
    }
}

async function openText() {
    try {
        const file = await openSingle();
        return text(file);
    } catch (err) {
        throw err;
    }
}

async function openArrayBuffer() {
    try {
        const file = await openSingle();
        return buffer(file);
    } catch (err) {
        throw err;
    }
}

async function openBinaryString() {
    try {
        const file = await openSingle();
        return binaryString(file);
    } catch (err) {
        throw err;
    }
}

async function openDataURL() {
    try {
        const file = await openSingle();
        return dataURL(file);
    } catch (err) {
        throw err;
    }
}

function download(blobSrc, fileName) {
	a.href = blobSrc;
	a.download = fileName ?? a.download;
	a.click();
}

function downloadBlob(blob, fileName) {
	const blobUrl = URL.createObjectURL(blob);
	download(blobUrl, fileName);
}

export {
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
    openDataURL,

	download,
	downloadBlob
};