import { Hono } from 'hono'
import axios, { type AxiosResponse, AxiosError } from 'axios'

const api1 = new Hono()

type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
}

api1.get('/title', async (c) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response: AxiosResponse<Post[]>) => {
            c.status(200)
            return c.json({ title: response.data[0].title })
        })
        .catch((error: AxiosError) => {
            c.status(500)
            return c.json({ error: error.message })
        })
    return res
})

export default api1
