const  connection  = require('./connector')
const app = require('./app')
const port = 8080

app.listen(port, () => console.log(`App listening on port ${port}!`))