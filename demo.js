const lib = require('./index');

lib()
    .then(a => {
        console.log('... a', a);
    }).catch(err => {
        console.log('... err', err);
    });
