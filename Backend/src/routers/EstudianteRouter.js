import {Router} from 'express'
import { verificarTokenJWT } from '../middlewares/JWT.js'
import { actualizarEtudiante, crearEtudiante, eliminarEtudiante, visualizarEtudiante } from '../controllers/EstudianteController.js'

const router = Router()

router.post("/estudiante",verificarTokenJWT,crearEtudiante)
router.get("/estudiante",verificarTokenJWT,visualizarEtudiante)
router.put("/estudiante/:id",verificarTokenJWT,actualizarEtudiante)
router.delete("/estudiante/:id",verificarTokenJWT,eliminarEtudiante)



export default router