import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import api1 from './api1.ts'
import api2 from './api2.ts'
import api3 from './api3.ts'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api1', api1)
app.route('/api2', api2)
app.route('/api3', api3)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
