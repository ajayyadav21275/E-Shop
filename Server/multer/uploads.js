let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Allimages')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

let fileFilter =(req,file,cb)=>{
    let types = /jpeg|jpg|png|webp|jfif/;
    let check = types.test(path.extname(file.originalname.toLowerCase()));
    if (check) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"));
    }
}

 let limits= {
    fileSize:1024*1024*15
}

let upload = multer({storage,fileFilter,limits});
module.exports={upload}
