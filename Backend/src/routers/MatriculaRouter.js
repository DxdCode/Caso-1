import {Router} from 'express'
import { crearMatricula, editarMatricula, visualizarMatricula } from '../controllers/MatriculaController.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()

router.post("/matricula",verificarTokenJWT,crearMatricula)
router.get("/matricula",verificarTokenJWT,visualizarMatricula)
router.put("/matricula/:id",verificarTokenJWT,editarMatricula)


export default router