import React, { useState, useEffect, useRef } from "react";
import "../../../index.css";

export const Home = () => {
  const [text, setText] = useState("");
  const [archivedTweets, setArchivedTweets] = useState([]);
  const [textLimitReached, setTextLimitReached] = useState(false);
  const textArea = useRef(null);
  const [showArchived, setShowArchived] = useState(false);
  const [publishedText, setPublishedText] = useState("");

  const textOfTextarea = () => {
    const textareaValue = textArea.current.value;
    setText(textareaValue);
    if (textareaValue.length > 255) {
      setTextLimitReached(true);
    } else {
      setTextLimitReached(false);
    }
  };

  
  const publicTweets = () => {
    setPublishedText(text);
    setShowArchived(false);
  };

  const archived = () => {
    if (text !== "") {
      setArchivedTweets([...archivedTweets, text]);
      setText("");
      setPublishedText("");
    }
  };

  const cleanLocalStorage = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const archivedTweetsFromStorage = localStorage.getItem("archivedTweets");
    if (archivedTweetsFromStorage) {
      setArchivedTweets(JSON.parse(archivedTweetsFromStorage));
    }

    window.addEventListener("beforeunload", cleanLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", cleanLocalStorage);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("archivedTweets", JSON.stringify(archivedTweets));
  }, [archivedTweets]);

  const counter = 255 - text.length;

  return (
    <>
      <div className="content">
        <h2 className="title">Publique su tweet</h2>
        <textarea
          ref={textArea}
          placeholder="Comience a escribir"
          className="textAreaTweet"
          disabled={textLimitReached}
          maxLength={255}
          onInput={textOfTextarea}
          value={text}
        ></textarea>
        <button onClick={publicTweets} className="post">
          Publicar
        </button>
        <button onClick={archived} className="archived">
          Archivar
        </button>
        <button onClick={() => setShowArchived(true)} className="showArchive">
          Mostrar Archivos
        </button>
        <p className={`counter ${counter > 20 ? 'green' : 'red'}`}>{counter}</p>
        <span className="publishedtweets">Tweet: {publishedText}</span>
        <p className="Response">Aquí se verán sus tweets archivados:</p>
        {showArchived && (
          <div className="archivedTweets">
            {archivedTweets.map((tweet, index) => (
              <div key={index}>
                <button className="savedTweetSelectionButton" onClick={() => setPublishedText(tweet)}>
                  Tweet {index + 1}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
