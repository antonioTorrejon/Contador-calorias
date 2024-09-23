import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4} from 'uuid'
import {categorias} from "../data/categorias"
import type { Actividad } from "../types"
import { AccionesActividad, ActividadEstado } from "../reducers/actividadReducer"

type FormProps = {
    dispatch: Dispatch<AccionesActividad>
    state: ActividadEstado
}

const stateInicial : Actividad = {
    id: uuidv4(),
    categoria: 1,
    nombre: '',
    calorias: 0
}


export default function Form({dispatch, state} : FormProps) {

    const [actividad, setActividad] = useState<Actividad>(stateInicial)

    useEffect(()=>{
        if(state.idActividad){
            const actividadSeleccionada = state.actividades.filter 
            (actividadState => actividadState.id === state.idActividad) [0]
            setActividad(actividadSeleccionada)
        }
    }, [state.idActividad])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['categoria', 'calorias'].includes(e.target.id)

        setActividad({
            ...actividad,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })    
    }

    const isValidActivity = () =>{
        const {nombre, calorias} = actividad
        return nombre.trim() !== '' && calorias > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch ({type: "guardar-actividad", payload: {nuevaActividad: actividad}})

        setActividad({
            ...stateInicial,
            id: uuidv4()
        })
    }

  return (
    <form
        className="space-y-5 bg-white p-10 rounded-lg"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="categoria" className="font-bold">Categoría:</label>
            <select 
            className="border border-slate-300 p-2 rounded-lg w-full bg-white "
            id="categoria"
            value={actividad.categoria}
            onChange={handleChange}
            >
            {categorias.map (categoria => (
                <option
                key={categoria.id}
                value={categoria.id}
                >
                    {categoria.name}
                </option>
            ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="nombre" className="font-bold">Actividad:</label>
            <input
                id="nombre"
                type="text"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Zumo de naranja, Ensalada, Ejercicio, Pesas"
                value={actividad.nombre}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calorias" className="font-bold">Calorias:</label>
            <input
                id="calorias"
                type="number"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Calorias. Ej. 300 o 500"
                value={actividad.calorias}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase
             text-white cursor-pointer disabled:opacity-30"
            value={actividad.categoria === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
            disabled={!isValidActivity()}
        />

    </form>
  )
}
