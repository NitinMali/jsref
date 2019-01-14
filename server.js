'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'src'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/admin',
        handler: (request, h) => {

            return h.file('./src/admin.html');
        }
    });

    await server.start({
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'assets')
            }
        }
    });
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();