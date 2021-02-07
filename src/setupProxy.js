const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/ip", {
            target: "https://api.myip.com",
            changeOrigin: true,
            pathRewrite: {
                "^/ip": "/",
            },
        })
    );
};
