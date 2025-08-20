import {Router} from 'express'
import { crearMatricula, editarMatricula, eliminarMatricula, visualizarMatricula } from '../controllers/MatriculaController.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()

router.post("/matricula",verificarTokenJWT,crearMatricula)
router.get("/matricula",verificarTokenJWT,visualizarMatricula)
router.put("/matricula/:id",verificarTokenJWT,editarMatricula)
router.delete("/matricula/:id",verificarTokenJWT,eliminarMatricula)



export default router