// const path = require('path');
//
// module.exports = {
//     entry: "./index.js",
//     output: {
//         filename: 'main.js',
//         path: path.resolve(__dirname, 'dist'),
//     },
// };

const path = require('path');

module.exports = {
    devtool: "source-map",
    entry: './build-babel/index.browser.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
};
