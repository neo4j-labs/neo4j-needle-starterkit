const express = require('express')

const app = express()
const version = "2.1"
app.use(express.static('./build/site'))
app.get('/', (req, res) => res.redirect('neo4j-needle-starterkit/' + version))
app.listen(8000, () => console.log('📘 http://localhost:8000'))