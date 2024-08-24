import { useState,useEffect } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const [data,setData] = useState(null)
  const [showModal,setShowModal] = useState(false)
  const [loading,setLoading] = useState(false)
  function handleToggleModal() {
    setShowModal(!showModal)
  }
  useEffect(()=>{
    async function fetchApiData() {
      const NASA_KEY =import.meta.env.VITE_NASA_API_KEY
      const URL ='https://api.nasa.gov/planetary/apod'+`?api_key=${NASA_KEY}`
      try {
        const res = await fetch(URL)
        const api_data = await res.json()
        setData(api_data)
        console.log('DATA\n',api_data)
      } catch (e) {
        console.log(e.message)
      }

    }
    fetchApiData()
  } ,[])
  return (
    <>
      {data ?(<Main data={data}/>):<div className="loadingState">
        <i className="fa-solid fa-gear"></i>
        </div>}
      {showModal &&(
        <SideBar data={data} handleToggleModal={handleToggleModal}/>
      )}
      {data &&(<Footer data={data} handleToggleModal={handleToggleModal} />)}   
    </>
  )
}

export default App
