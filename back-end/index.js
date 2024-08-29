import Fastify from 'fastify'
import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
import studentRoutes from './routes/StudentRoutes.js'

const app = Fastify()

app.register(cors)
app.register(formbody)

studentRoutes.forEach(route => app.route(route))

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log('Server listening on port 3000')
});
