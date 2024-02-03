import multer from "multer";
import { __dirname } from "../utils/utils.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let folder
      if(file.fieldname === "profileImage"){
        folder = "profileImages"
      } else if (file.fieldname === "productsImages"){
        folder = "productsImages"
      } else if (file.fieldname === "identification"){
        folder = "documents"
      } else if (file.fieldname === "proofOfAdress"){
        folder = "documents"
      } else if (file.fieldname === "proofOfAccountStatus"){
        folder = "documents"
      } 
      cb(null, `${__dirname}/public/uploads/${folder}`)
    },
    filename: function (req, file, cb) {
      const { id } = req.params
      cb(null, id + "-" + file.fieldname + "-" + Date.now() )
    }
  })
  
export const upload = multer({ storage: storage })

export const cpUpload = upload.fields([
  { name: "profileImage", maxCount: 1 }, 
  { name: "productsImages", maxCount: 20 }, 
  { name: "identification", maxCount: 1 },
  { name: "proofOfAdress", maxCount: 1 },
  { name: "proofOfAccountStatus", maxCount: 1 },
])
