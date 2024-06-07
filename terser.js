const { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, cpSync } = require('node:fs');
const { sep, resolve, relative } = require('node:path');
const { execSync } = require("node:child_process");
const Terser = require('terser');


const getSize = (file) => {
    const { size } = statSync(file);
    return (size);
}

const structData = [];

async function compressDirectory(dir) {
    const files = readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const location = dir + sep + file.name;
        if (file.isDirectory())
            return compressDirectory(location);

        const size = getSize(location);
        const terserResult = await Terser.minify(readFileSync(location, 'utf8'));
        if (terserResult.error)
            return console.error(`Minifying ${file} error.`, terserResult.error);

        const minName = file.name.slice(0, -2) + 'min.js';
        const newPath = `.${sep}dist${sep}${relative('.', resolve(location, "../../"))}`;
        const minifyFile = newPath + minName;
        const unminifyFile = newPath + file.name;

        writeFileSync(
            minifyFile,
            '/* Create By Pioupia https://github.com/pioupia/auto-input-a2f/ | MIT License */\n' +
            terserResult.code,
            'utf8',
            {
                recursive: true
            });

        const newSize = getSize(minifyFile);

        cpSync(location, unminifyFile);

        structData.push({
            name: file.name,
            compress: "0%",
            sha: execSync(`shasum -b -a 384 '${unminifyFile.replaceAll("'", "\\'")}' | awk '{ print $1 }' | xxd -r -p | base64`)
                    .toString().trim()
        });

        structData.push({
            name: minName,
            compress: ((size - newSize) * 100 / size).toString() + "0%",
            sha: execSync(`shasum -b -a 384 '${minifyFile.replaceAll("'", "\\'")}' | awk '{ print $1 }' | xxd -r -p | base64`)
                    .toString().trim()
        });
    };
}

if (!existsSync('./dist'))
    mkdirSync('./dist');

(async () => {
    await compressDirectory('./src');
    console.table(structData, ['name', 'compress', 'sha']);
})();