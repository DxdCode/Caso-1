import {Router} from 'express'
import { verificarTokenJWT } from '../middlewares/JWT.js'
import { actualizarEstudiante, crearEstudiante,  eliminarEstudiante, visualizarEstudiante } from '../controllers/EstudianteController.js'

const router = Router()

router.post("/estudiante",verificarTokenJWT,crearEstudiante)
router.get("/estudiante",verificarTokenJWT,visualizarEstudiante)
router.put("/estudiante/:id",verificarTokenJWT,actualizarEstudiante)
router.delete("/estudiante/:id",verificarTokenJWT,eliminarEstudiante)



export default router