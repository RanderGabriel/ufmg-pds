import {createConnection} from 'typeorm'


createConnection().then(connection => {
    const App = require('./App').App    
    const app = new App();
    app.start()
})
.catch(error => {
    console.log(error)
})
