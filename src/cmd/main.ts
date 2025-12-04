import express from 'express'
import type { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import setupRoute from './route'

dotenv.config()

const app: Express = express()
app.use(express.json())

const port: number = Number(process.env.PORT) ||  3000

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!'
  })
})
app.use('/api/v1', setupRoute())

app.listen(port, () => console.log(`Application is running on port ${port}`))