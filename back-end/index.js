const app = require('fastify')({
    logger: true
})

app.get('/', function (request, reply){
    reply.send({
        Welcome: 'My First Server'
    })
})

app.listen({ port: 3000 }, (err, address) => {
    if(err){
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`The serve is listening on ${address}`)
})