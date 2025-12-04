import express from 'express'
import { RedirectReq } from '../dto/auth.dto'

const setupRoute = () => {
    const router = express.Router()

    router.get('/redirect', (req, res) => {
        try {
            const validatedData = RedirectReq.parse(req);
            res.json(validatedData);
        } catch (error) {
            res.status(400).json({ 
                error: "Invalid request parameters",
                details: error instanceof Error ? error.message : "Unknown error"
            });
        }
    })

    router.post('/login', (req, res) => {
        res.json({
            message: 'Hello Express + TypeScript!!'
        })
    })

    router.post('/logout', (req, res) => {
        res.json({
            message: 'Hello Express + TypeScript!!'
        })
    })

    router.post('/token', (req, res) => {
        res.json({
            message: 'Hello Express + TypeScript!!'
        })
    })

    return router
}

export default setupRoute
