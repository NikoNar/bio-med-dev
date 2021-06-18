const next = require('next')
const express = require('express')
const port = '3000'

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app
    .prepare()
    .then(() => {
        const server = express()

        server.get('/page/:title', (req, res) => {
            console.log(req);
            const actualPage = '/page'
            const queryParams = {title: req.params.title}
            app.render(req, res, actualPage, queryParams)
        })


        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, err => {
            if (err) {
                throw err
            } else {
                console.log(`Server started at port ${port}`)
            }
        })
    })
    .catch(err => {
        console.log(err)
    })