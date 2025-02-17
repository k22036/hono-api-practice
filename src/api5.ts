import { Hono } from 'hono'
import axios, { type AxiosResponse, AxiosError } from 'axios'

const api5 = new Hono()

interface User {
    id: number,
    name: string
}

type Response = {
    message: string
    status: string
}

api5.get('/parallel', async (c) => {
    const res = Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/users/1').then((response: AxiosResponse<User>) => {
            return response.data.name
        }),
        axios.get('https://dog.ceo/api/breeds/image/random').then((response: AxiosResponse<Response>) => {
            return response.data.message
        })
    ]).then(([name, url]) => {
        c.status(200)
        return c.json({ name: name, url: url })
    }).catch((error: AxiosError) => {
        c.status(500)
        return c.json({ error: error.message })
    })
    return res
})

export default api5
