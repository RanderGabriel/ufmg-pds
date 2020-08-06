module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/global.scss";`
            },
        }
    }
}