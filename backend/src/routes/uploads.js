import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const router = Router()

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads'
const absDir = path.isAbsolute(UPLOAD_DIR) ? UPLOAD_DIR : path.join(process.cwd(), UPLOAD_DIR)
fs.mkdirSync(absDir, { recursive: true })

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, absDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const base = path.basename(file.originalname, ext)
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, `${base}-${unique}${ext}`)
    },
})

const upload = multer({ storage })

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ ok: false, error: { code: 'no_file', message: 'No file uploaded' } })
    const file = req.file
    const uri = `/api/uploads/${encodeURIComponent(path.basename(file.filename))}`
    res.status(201).json({ ok: true, id: file.filename, filename: file.originalname, size: file.size, contentType: file.mimetype, uri, createdAt: new Date().toISOString() })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const fp = path.join(absDir, id)
    if (!fs.existsSync(fp)) return res.status(404).json({ ok: false, error: { code: 'not_found', message: 'File not found' } })
    // Return file stream
    res.sendFile(fp)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const fp = path.join(absDir, id)
    if (!fs.existsSync(fp)) return res.status(404).json({ ok: false, error: { code: 'not_found', message: 'File not found' } })
    fs.unlinkSync(fp)
    res.status(204).end()
})

export default router