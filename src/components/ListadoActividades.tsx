import { Actividad } from "../types"
import { categorias } from "../data/categorias"
import { useMemo, Dispatch } from "react"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { AccionesActividad } from "../reducers/actividadReducer"

type ListadoActividadesProps = {
    actividades: Actividad[], 
    dispatch: Dispatch<AccionesActividad>
}

export default function ListadoActividades({actividades, dispatch} : ListadoActividadesProps) {

    const nombreCategoria = useMemo(()=> 
        (categoria: Actividad['categoria'])=> 
            categorias.map(cat => cat.id === categoria ? cat.name : '') 
    , [actividades])

    const actividadesVacias = useMemo (()=>actividades.length === 0, [actividades] )

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

            { actividadesVacias? 
            <p className="text-center my-5">No hay actividades aún...</p> :

            actividades.map(actividad => (
                <div key={actividad.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                            ${actividad.categoria === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                            {nombreCategoria(+actividad.categoria)}
                        </p>
                        <p className="text-2xl font-bold pt-5">
                            {actividad.nombre}
                        </p>
                        <p className="font-black text-4xl text-lime-500">
                            {actividad.calorias} {''}
                            <span>Calorias</span>
                        </p>
                    </div>

                    <div className="flex gap-5 items-center">
                        <button
                            onClick={()=>dispatch({type: 'set-idActividad', payload: {id: actividad.id}})}
                        >
                            <PencilSquareIcon
                                className="h-8 w-8 text-gray-800"
                            />
                        </button>

                        <button
                            onClick={()=>dispatch({type: 'borrar-actividad', payload: {id: actividad.id}})}
                        >
                            <XCircleIcon
                                className="h-8 w-8 text-red-500"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
