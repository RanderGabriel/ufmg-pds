
import {createConnection} from 'typeorm'
import "reflect-metadata";

createConnection().then(connection => {
    const App = require('./App').default;
    App.start()
})
.catch(error => {
    console.log(error)
})

