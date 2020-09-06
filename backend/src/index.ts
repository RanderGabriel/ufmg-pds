import application from './App'
import {createConnection} from 'typeorm'

createConnection().then(connection => {
    application.start();
})
.catch(error => {
    console.log(error)
})

