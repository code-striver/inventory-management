import multer from 'multer'
const StorageConfiguration = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/images')
    },
    filename:(req, file, cb)=>{
        const  fileName = Date.now() + '-' + file.originalname
        cb(null, fileName)
    }
})

export const fileUploadMiddleware = multer({storage:StorageConfiguration})