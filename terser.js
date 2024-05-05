const { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, cpSync } = require('node:fs');
const { sep, resolve, relative } = require('node:path');
const Terser = require('terser');


const getSize = (file) => {
    const { size } = statSync(file);
    return (size);
}

function compressDirectory(dir) {
    const files = readdirSync(dir, { withFileTypes: true });
    files.forEach(async file => {
        const location = dir + sep + file.name;
        if (file.isDirectory())
            return compressDirectory(location);

        const size = getSize(location);
        const terserResult = await Terser.minify(readFileSync(location, 'utf8'));
        if (terserResult.error) {
            console.error(`Minifying ${file} error.`, terserResult.error)
        } else {
            const newPath = `.${sep}dist${sep}${relative('.', resolve(location, "../../"))}`;
            writeFileSync(
                newPath + file.name.slice(0, -2) + 'min.js',
                '/* Create By Pioupia https://github.com/pioupia/auto-input-a2f/ | MIT License */\n' +
                terserResult.code,
                'utf8',
                {
                    recursive: true
                });
            const newSize = getSize(newPath);
            console.log(`Minifying ${file.name} (${(newSize - size) / size}%) success.`);

            cpSync(location, newPath + file.name);
        }
    });
}

if (!existsSync('./dist'))
    mkdirSync('./dist');

compressDirectory('./src');