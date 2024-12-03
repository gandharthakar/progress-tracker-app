const removeEmptyExports = () => {
    return {
        visitor: {
            ExportNamedDeclaration(path) {
                if (path.node.specifiers.length === 0) {
                    path.remove();
                }
            }
        }
    };
};

module.exports = {
    "presets": [
        ["@babel/preset-typescript"],
    ],
    "plugins": [removeEmptyExports]
}