import { User,BookOpen,FileCheck } from 'lucide-react'
import useEstudiantes from '../hooks/useEstudiante'
import useMateria from '../hooks/useMateria'
import useMatricula from '../hooks/useMatricula'

function InformationCards() {
    const {estudiantes} = useEstudiantes()
    const {materia} = useMateria()
    const {matricula} = useMatricula()

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-card/90 transition-colors duration-200">
                <User className="text-primary w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-sec">Estudiantes</h3>
                <p className="text-2xl font-bold text-primary mt-2">{estudiantes.length}</p>
            </div>

            {/* Card: Materías */}
            <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-card/90 transition-colors duration-200">
                <BookOpen className="text-secondary w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-sec">Materías</h3>
                <p className="text-2xl font-bold text-secondary mt-2">{materia.length}</p>
            </div>

            {/* Card: Matrículas */}
            <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col items-center hover:bg-card/90 transition-colors duration-200">
                <FileCheck className="text-primary w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-sec">Matrículas</h3>
                <p className="text-2xl font-bold text-primary mt-2">{matricula.length}</p>
            </div>
        </div>
    )
}

export default InformationCards
