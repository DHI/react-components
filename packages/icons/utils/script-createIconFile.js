/**
 * This script turns all SVG files in the SRC directory into
 * an icon component file - and then deletes the SVG file.
 * 
 * Note:
 * - Make sure the SVG viewbox is set to 0 0 40 40.
 * - Make sure there are no fills or strokes in the SVG.
 */

const fs = require("fs")

const dir = fs.readdirSync("../src")
const icons = dir.filter((file) => file.endsWith(".svg"))

icons.forEach(icon => {

    const name = icon.split(".")[0]

    let file = fs.readFileSync(`../src/${icon}`, "utf8");
    file = file.replace(/<\/?(?=\w)(?!strong|br|em|p|u|strike).*?>/g, "")
    file = file.replace(/(?<=<path\b[^<>]*)\s*\bfill=([\"\']).*?\1/gm, "")
    file = file.trim()
    file = file.split("\n").map((line) => {
        return `        ${line.trim()}\n`
    }).join("").trim()


    const content = `
import React from 'react';
import createSvgIcon from "../utils/createSvgIcon";

export default createSvgIcon(
    <>
        ${file}
    </>,
    '${name}'
);`

    fs.writeFileSync(`../src/${name}.tsx`, content)
    fs.unlinkSync(`../src/${icon}`)

    console.log(`>> Successfully converted ${icon} to ${name}.tsx`)
})

const files = fs.readdirSync("../src").map(file => {
    const name = file.split(".")[0]

    if (name === "index") {
        return ""
    }

    return `export { default as ${name} } from './${name}'\n`
}).join("").trim()

fs.writeFileSync("../src/index.ts", files)
