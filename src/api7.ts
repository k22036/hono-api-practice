import { Hono } from 'hono'
import axios, { type AxiosResponse, AxiosError } from 'axios'

const api6 = new Hono()

interface User {
    id: number,
    name: string
}

type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
}

type Comment = {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

api6.get('/comment', async (c) => {
    const { userId, error } = await axios.get('https://jsonplaceholder.typicode.com/users/1')
        .then((response: AxiosResponse<User>) => {
            return ({ userId: response.data.id, error: '' })
        })
        .catch((error: AxiosError) => {
            return ({ userId: null, error: error.message })
        })
    if (error) {
        c.status(500)
        return c.json({ error: error })
    }

    const { firstPostId, error2 } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response: AxiosResponse<Post[]>) => {
            return ({ firstPostId: response.data[0].id, error2: '' })
        })
        .catch((error: AxiosError) => {
            return ({ firstPostId: null, error2: error.message })
        })
    if (error2) {
        c.status(500)
        return c.json({ error: error2 })
    }

    const { comments, error3 } = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${firstPostId}`)
        .then((response: AxiosResponse<Comment[]>) => {
            return ({ comments: response.data, error3: '' })
        })
        .catch((error: AxiosError) => {
            return ({ comments: null, error3: error.message })
        })
    if (error3) {
        c.status(500)
        return c.json({ error: error3 })
    }

    c.status(200)
    return c.json({ comments: comments })
})

export default api6
