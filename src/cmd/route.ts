import express from 'express'
import { loginHtml } from './login'
import { RedirectReq, LoginReq } from '../dto/auth.dto'

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

    router.get('/login', (req, res) => {
        try {
            res.setHeader('Content-Type', 'text/html');
            res.send(loginHtml);
        } catch (error) {
            console.error('Error serving login page:', error);
            res.status(500).json({
                error: "Internal server error",
                details: error instanceof Error ? error.message : "Unknown error"
            });
        }
    })

    router.post('/login', (req, res) => {
        try {
            const validatedData = LoginReq.parse(req);
            console.log('Login request data:', validatedData);
            
            // For now, just return the validated data
            // In a real implementation, you would authenticate the user here
            res.json({
                message: 'Login data received',
                data: validatedData,
                redirectUrl: validatedData.callback + '?code=auth_code&state=' + validatedData.state
            });
        } catch (error) {
            console.error('Login validation error:', error);
            res.status(400).json({
                error: "Invalid request data",
                details: error instanceof Error ? error.message : "Unknown error"
            });
        }
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
