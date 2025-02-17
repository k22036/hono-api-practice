import { Hono } from 'hono'
import axios, { type AxiosResponse, AxiosError } from 'axios'

const api2 = new Hono()

interface User {
    name: {
        title: string,
        first: string,
        last: string
    }
}

interface Response {
    results: User[]
}

api2.get('/name', async (c) => {
    const res = await axios.get('https://randomuser.me/api/')
        .then((response: AxiosResponse<Response>) => {
            const name = response.data.results[0].name.first + ' ' + response.data.results[0].name.last
            c.status(200)
            return c.json({ name: name })
        })
        .catch((error: AxiosError) => {
            c.status(500)
            return c.json({ error: error.message })
        })
    return res
})

export default api2
