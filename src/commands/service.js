const glob = require("glob");

const services = {};

const initialise = () => {
    glob.sync("./src/services/*.js").forEach((file) => {
        const match = file.match(/\/([A-Za-z0-9\-_]+)\.js$/);
        services[match[1]] = require(`../services/${match[1]}.js`);
    });
};

const register = (app) => {
    app.command("/service", async ({ command, ack, say }) => {
        await ack();

        const status = await services[command.text].getStatus();

        await say(status);
    });
};

module.exports = {
    initialise,
    register,
};
