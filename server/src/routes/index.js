import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

router.get('/about', (req, res) => {
    res.send('This is about us section')
})

export default router