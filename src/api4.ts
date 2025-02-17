import { Hono } from 'hono'
import axios, { type AxiosResponse, AxiosError } from 'axios'

const api4 = new Hono()

api4.get('/invalid', async (c) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/invalid-endpoint')
        .then((response: AxiosResponse<unknown>) => {
            c.status(200)
            return c.json({ response: response })
        })
        .catch((error: AxiosError) => {
            c.status(500)
            return c.json({ error: error.message })
        })
    return res
})

export default api4
