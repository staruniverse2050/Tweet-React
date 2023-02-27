import React, { useState, useEffect, useRef } from "react";
import '../../../index.css'

export const Home = () => {
  const [text, setText] = useState('');
  const [archivedTweets, setArchivedTweets] = useState([]);
  const [textLimitReached, setTextLimitReached] = useState();
  const TextArea = useRef(null);
  const [showArchived, setShowArchived] = useState(false);

  const handleText = () => {
    const currentValue = TextArea.current.value;
    setText(currentValue);
    if (currentValue.length > 255) {
      setTextLimitReached(true);
    } else {
      setTextLimitReached(false);
    }
  }

  const handleArchive = () => {
    if (text !== '') {
      setArchivedTweets([archivedTweets, text]);
      setText('');
    }
  }
  const handlePublish = () => {
    setPublishedText(text);
    setText('');
    setCounter(255);
  }

const counter = 255 - text.length;
  return (
    <>
      <div className="content">
        <h2 className="title">Publique su tweet</h2>
        <textarea
  ref={TextArea}
  placeholder="Comience a escribir"
  className="textAreaTweet"
  disabled={textLimitReached}
  maxLength={255} 
  onInput ={handleText}
></textarea>
        <p className="Response">{text}</p>
        <button onClick={handlePublish} className="public">Publicar</button>
        <button onClick={handleArchive} className="archived">Archivar</button>
        <button onClick={() => setShowArchived(true)} className="showArchive">Mostrar Archivos</button>
        <p className='counter'>{counter}</p>
        <span className="tweetsArchived">Aquí verá sus tweets archivados</span>
        {showArchived && (
          <div className="archivedTweets" placeholder="Aquí verá sus tweets archivados">
            {archivedTweets.map((tweet, index) => (
              <p key={index}>{tweet}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}