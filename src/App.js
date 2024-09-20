import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import {
  addCircleOutline,
  callOutline,
  chatboxEllipses,
  heartOutline,
  homeOutline,
  searchOutline,
  filmOutline,
  personAddOutline,
  videocamOutline,
  informationCircleOutline,
  happyOutline,
  micOutline,
  imageOutline,
  heart,
  logoInstagram,
  menuOutline,
  terminalOutline,
} from "ionicons/icons";
import "./index.css";
const App = () => {
  const [gpt, setgpt] = useState(false);
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [chatbotVisible, setChatbotVisible] = useState(false); // New state to control chatbot visibility

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible); // Toggle chatbot visibility
  };

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        messages: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        "http://localhost:5000/completions",
        options
      );
      const data = await response.json();
      console.log(data); // Log the entire response for debugging
      if (data.choices && data.choices.length > 0) {
        setMessage(data.choices[0].message);
      } else {
        console.error("Unexpected API response structure:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message);

    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  console.log(previousChats);

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );
  const uniqueTitle = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  return (
    <div className="app">
      <div className="instaui">
        <div className="nav">
          <IonIcon className="icon1" icon={logoInstagram}></IonIcon>
          <br />
          <IonIcon className="icon1" icon={homeOutline}></IonIcon>
          <IonIcon className="icon1" icon={searchOutline}></IonIcon>
          <IonIcon className="icon1" icon={filmOutline}></IonIcon>
          <IonIcon className="icon1" icon={chatboxEllipses}></IonIcon>
          <IonIcon className="icon1" icon={heartOutline}></IonIcon>
          <IonIcon className="icon1" icon={addCircleOutline}></IonIcon>
          <div className="mainpfp"></div>
          <br />
          <IonIcon className="icon1" icon={menuOutline}></IonIcon>
        </div>
        <div className="messagebox">
          <div className="messagetop">
            <h2>Profile_Name</h2>
            <IonIcon className="newmsg" icon={personAddOutline}></IonIcon>
          </div>
          <div className="messagemiddle">
            <h3>Messages</h3>
            <h3 className="req">Requests</h3>
          </div>
          <div className="messagebotm">
            <div className="msgs1">
              <div className="pfp"></div>
              <div className="pdes">
                <h4>Friend 1</h4>
                Active Status
              </div>
            </div>
            {/* Repeat friend messages as needed */}
          </div>
        </div>
        <div className="chatbox">
          <div className="chattop">
            <div className="pfp"></div>
            <div className="pdes">
              <h4>Friend 1</h4>
              Active Status
            </div>
            <IonIcon className="icon2" icon={callOutline}></IonIcon>
            <IonIcon className="icon3" icon={videocamOutline}></IonIcon>
            <IonIcon
              className="icon4"
              icon={informationCircleOutline}
            ></IonIcon>
          </div>
          <div className="chatbotm">
            {chatbotVisible && ( // Conditionally rendering the chatbot based on chatbotVisible
              <div className="miniGPTcontainer">
                <section className="side-bar">
                  <button className="side-text" onClick={createNewChat}>
                    + New Chat
                  </button>
                  <ul className="history">
                    {uniqueTitle?.map((uniqueTitle, index) => (
                      <li key={index} onClick={() => handleClick(uniqueTitle)}>
                        {uniqueTitle}
                      </li>
                    ))}
                  </ul>
                  <nav>
                    <p>Made by Vikash</p>
                  </nav>
                </section>
                <section className="main">
                  {!currentTitle && <h1>MiniGPT</h1>}
                  <ul className="feed">
                    {currentChat?.map((chatMessage, index) => (
                      <li key={index}>
                        <p className="role">{chatMessage.role}</p>
                        <p>{chatMessage.content}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="bottom-section">
                    <div className="input-container">
                      <input onChange={(e) => setValue(e.target.value)} />
                      <button id="submit" onClick={getMessages}>
                        ➣
                      </button>
                    </div>
                    <p className="info">MiniGPT is made by Vikash</p>
                  </div>
                </section>
              </div>
            )}
            <div className="chatcontainer">
              <IonIcon className="icon5" icon={happyOutline}></IonIcon>
              <IonIcon
                className="icon9"
                icon={terminalOutline}
                onClick={toggleChatbot}
              ></IonIcon>{" "}
              <IonIcon className="icon6" icon={micOutline}></IonIcon>
              <IonIcon className="icon7" icon={imageOutline}></IonIcon>
              <IonIcon className="icon8" icon={heart}></IonIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
