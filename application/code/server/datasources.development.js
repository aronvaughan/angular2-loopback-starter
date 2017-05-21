console.log('*******************loading datasources.development.js');

module.exports = {
    db: {
        name: 'db',
        connector: 'mongodb',
        host: process.env.DB_HOST || '0.0.0.0',
        port: process.env.DB_PORT || 27017,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.LOOPBACK_PROJECT_NAME + '_db'
    },

    /* EMAIL CONFIG SECTION!!!!!!!
       copy this to your ./datasources.local.js file and put in the proper values for user and pass......
    email: {
       connector: "mail",
       transports: [{
         type: "smtp",
         host: "smtp.live.com",
         secure: false,
         port: 25,
         tls: {
           rejectUnauthorized: false
         },
         auth: {
           user: "PUT_YOU_EMAIL_ADDRESS_HERE",
           pass: "PUT YOUR PASS HERE"
         }
    }]
    }
    */

};
