module.exports = {
    apps : [
        {
            name   : 'API',
            script : './back/index.js'
        },
        {
            name   : 'Client',
            script : 'npm',
            args   : 'run build:dev',
            cwd    : './front'
        },
        {
            name   : 'Coverage Client',
            script : 'npm',
            args   : 'run serve:coverage',
            cwd    : './front'
        },
        {
            name   : 'Coverage Back',
            script : 'npm',
            args   : 'run serve:coverage',
            cwd    : './back'
        }
    ]
};
