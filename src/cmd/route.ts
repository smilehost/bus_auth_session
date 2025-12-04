import express from 'express'

const setupRoute = async () =>{
    const router = express.Router()

    router.get('/redirect', (req, res) => {})
    router.post('/login', (req, res) => {})
    router.post('/logout', (req, res) => {})
    router.post('token')

    return router
}