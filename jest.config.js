module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    transformIgnorePatterns: [
        "node_modules/(?!(lit-html|lit-element)/)",
    ]
};