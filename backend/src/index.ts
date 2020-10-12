
import {createConnection} from 'typeorm'

createConnection().then(connection => {
    const application = require('./App').default
    application.start()
})
.catch(error => {
    console.log(error)
})
