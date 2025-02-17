import { Hono } from 'hono'
import axios, { type AxiosResponse, AxiosError } from 'axios'

const api3 = new Hono()

type Response = {
    message: string
    status: string
}

api3.get('/image', async (c) => {
    const res = await axios.get('https://dog.ceo/api/breeds/image/random')
        .then((response: AxiosResponse<Response>) => {
            const url = response.data.message
            c.status(200)
            return c.json({ url: url })
        })
        .catch((error: AxiosError) => {
            c.status(500)
            return c.json({ error: error.message })
        })
    return res
})

export default api3
