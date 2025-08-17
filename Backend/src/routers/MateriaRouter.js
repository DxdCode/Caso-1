import {Router} from 'express'
import {verificarTokenJWT } from '../middlewares/JWT.js'
import { crearMateria, editarMateria, eliminarMateria, visualizarMateria } from '../controllers/MateriaControlller.js'

const router = Router()

router.post("/materia",verificarTokenJWT, crearMateria )
router.get("/materia",verificarTokenJWT, visualizarMateria )
router.put("/materia/:id",verificarTokenJWT, editarMateria )
router.delete("/materia/:id",verificarTokenJWT, eliminarMateria )

export default router