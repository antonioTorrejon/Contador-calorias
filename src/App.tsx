import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/Form"
import { actividadReducer, estadoInicial } from "./reducers/actividadReducer"
import ListadoActividades from "./components/ListadoActividades"
import TotalCalorias from "./components/TotalCalorias"

function App() {

  const [state, dispatch] = useReducer (actividadReducer, estadoInicial)

  useEffect (()=>{
    localStorage.setItem('actividades', JSON.stringify(state.actividades))
  }, [state.actividades])

  const canRestartApp = () => useMemo(()=>state.actividades.length > 0 , [state.actividades])

  return (
    <>
      <header className="bg-lime-600 py-3">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
              <h1 className="text-center text-lg font-bold text-white uppercase">
                Contador de calorías
              </h1>

              <button
                className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white 
                cursor-pointer rounded-lg text-sm disabled:opacity-15"
                disabled={!canRestartApp()}
                onClick={()=>dispatch({type: 'reiniciar-app'})}
              >
                Reiniciar App
              </button>
          </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
          <div className="max-w-4xl mx-auto">
              <Form 
                dispatch={dispatch}
                state={state}
              />
          </div>
      </section>

      <section className="bg-gray-800 p-10 ">
        <div className="max-w-4xl mx-auto">
              <TotalCalorias
                actividades={state.actividades}
              />
        </div>

      </section>

      <section className="p-10 mx-auto max-w-4xl">
          <ListadoActividades 
              actividades={state.actividades}
              dispatch={dispatch}
          />
      </section>
    </>
  )
}

export default App
