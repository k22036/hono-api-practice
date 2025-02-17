import { Hono } from 'hono'
import axios, { type AxiosResponse, AxiosError } from 'axios'

const api6 = new Hono()

type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
}

api6.post('/post', async (c) => {
    const data = {
        title: 'Hello Axios',
        body: 'This is a axios request',
        userId: 1
    }
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', data)
        .then((response: AxiosResponse<Post>) => {
            c.status(200)
            return c.json({ response: response.data })
        })
        .catch((error: AxiosError) => {
            c.status(500)
            return c.json({ error: error.message })
        })
    return res
})

export default api6
