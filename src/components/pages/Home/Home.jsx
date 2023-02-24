import React, { useState } from "react";  
import '../../../index.css'
export const Home = () => {
  const [text, setText] = useState()
  const TextArea = useRef('null')

  const handleText = () => {
    setText(TextArea.current.value)
  }
  useEffect(() => {
  if(text === 'Hola'){
    setText('Chao')
  }
},[text])
  return (
    <>
    {/* <h1>Generador de Tweests</h1> */}
    <div className="content">
    <h2 className="title">Publique su tweet</h2>
    <textarea ref={TextArea} placeholder="Comience a escribir" className="textAreaTweet"></textarea>
    <p className="Response">{text}</p>
    <button onClick={handleText} className="public">Publicar</button>
    <button className="archived">Archivar</button>
    <button className="showArchive">Mostrar Archivos</button>
    <p className='counter'>255</p>
    <span className="tweetsArchived">Aquí verá sus tweets archivados</span>
    </div>
    </>
  )
}


