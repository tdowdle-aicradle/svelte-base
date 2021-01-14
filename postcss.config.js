

// This gives purge compatibility with Svelte class: directives
// This could break with future Tailwindcss updates - See https://github.com/tailwindlabs/tailwindcss/discussions/1731
const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");


const purgecss = require("@fullhuman/postcss-purgecss")({
    content: ["./src/**/*.html", "./src/**/*.svelte"],
    whitelistPatterns: [/svelte-/],
    defaultExtractor: (content) => [
        ...tailwindExtractor(content),
        // Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
        ...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
    ],
    keyframes: true,
})

const dev = process.env.ROLLUP_WATCH

module.exports = {
    plugins: [require("tailwindcss"), ...(!dev ? [purgecss] : [])],
}


