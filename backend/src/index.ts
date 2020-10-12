
import {createConnection} from 'typeorm'
import {App} from './App';

import "reflect-metadata";

createConnection().then(connection => {
    const app = new App();
    app.start()
})
.catch(error => {
    console.log(error)
})

