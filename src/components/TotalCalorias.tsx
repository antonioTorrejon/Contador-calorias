import { useMemo } from "react"
import type { Actividad } from "../types"
import DisplayCalorias from "./DisplayCalorias"

type TotalCaloriasProps = {
    actividades: Actividad[]
}

export default function TotalCalorias({actividades}: TotalCaloriasProps) {

    //Contadores
    const caloriasConsumidas = useMemo(()=> actividades.reduce
    ((total, actividad)=>actividad.categoria === 1 ? total + actividad.calorias : total, 0),
    [actividades])

    const caloriasQuemadas = useMemo(()=> actividades.reduce
    ((total, actividad)=>actividad.categoria === 2 ? total + actividad.calorias : total, 0),
    [actividades])

    const caloriasTotales = useMemo(()=> caloriasConsumidas - caloriasQuemadas, [actividades])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>

                <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                    <DisplayCalorias
                        calorias={caloriasConsumidas}
                        texto="Consumidas"
                    />
                    <DisplayCalorias
                        calorias={caloriasQuemadas}
                        texto="Quemadas"
                    />
                    <DisplayCalorias
                        calorias={caloriasTotales}
                        texto="Diferencia"
                    />
                </div>
        </>
    )
}
