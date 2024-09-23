import { Actividad } from "../types"

export type AccionesActividad = 
    { type: 'guardar-actividad', payload: {nuevaActividad: Actividad} } |
    { type: 'set-idActividad', payload: {id: Actividad['id']} } |
    { type: 'borrar-actividad', payload: {id: Actividad['id']} } |
    { type: 'reiniciar-app' } 

export type ActividadEstado = {
    actividades: Actividad[], 
    idActividad: Actividad['id']
}

const actividadesLocalStorage = () : Actividad[] => {
    const actividades = localStorage.getItem('actividades')
    return actividades ? JSON.parse(actividades) : []
}

export const estadoInicial : ActividadEstado = {
    actividades: actividadesLocalStorage(),
    idActividad: ''
}

export const actividadReducer = (
    state : ActividadEstado = estadoInicial,
    action : AccionesActividad
) => {
    
    if(action.type === 'guardar-actividad') {

        let actividadesActualizadas : Actividad[] = []

        if(state.idActividad ){
            actividadesActualizadas = state.actividades.map
            ( actividad => actividad.id === state.idActividad ? action.payload.nuevaActividad : actividad)
        } else {
            actividadesActualizadas = [...state.actividades, action.payload.nuevaActividad ]
        }

        return {
            ...state,
            actividades: actividadesActualizadas, 
            idActividad: ''
        }
    }

    if(action.type === 'set-idActividad') {
        return {
            ...state,
            idActividad: action.payload.id
        }
    }

    if(action.type === 'borrar-actividad') {
        return{
            ...state,
            actividades: state.actividades.filter( actividad => actividad.id !== action.payload.id)
        }
    }

    if(action.type === 'reiniciar-app'){
        return{
            actividades: [],
            idActividad: ''
        }
    }

    return state
}