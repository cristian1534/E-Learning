import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { CopyToClipboard } from "react-copy-to-clipboard";

const socket = io.connect("http://localhost:5000");

const index = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.log("Error accessing media devices:", error);
      });

    socket.on("me", (id) => {
      setMe(id);
      console.log("Received me:", id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    return () => {
      socket.off("me");
      socket.off("callUser");
    };
  }, []);

  const copyId = () => {
    navigator.clipboard
      .writeText(me)
      .then(() => {
        console.log("ID copied to clipboard:", me);
      })
      .catch((error) => {
        console.log("Error copying ID to clipboard:", error);
      });
  };

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  const toggleVideo = () => {
    setVideoEnabled((prev) => !prev);

    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !videoEnabled;
      });
    }
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !audioEnabled;
      });
    }
  };

  return (
    <div>
      <div>
        <h2>WEBINAR</h2>
        <p>Clase personalizada Cliente Premium</p>
        <div>
          <div>
            <div>
              <div>
                <div>
                  {stream && <video playsInline muted ref={myVideo} autoPlay />}
                </div>
              </div>
              <div>
                <div>
                  {callAccepted && !callEnded && (
                    <video playsInline ref={userVideo} autoPlay />
                  )}
                </div>
              </div>
            </div>
          </div>

          {receivingCall && !callAccepted && (
            <div>
              <h4>{name} esta llamando...</h4>
              <button
                onClick={answerCall}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                ACEPTAR LLAMADA
              </button>
            </div>
          )}
          {!callAccepted || callEnded ? (
            <>
              <p>ingresa tu nombre y copia el id</p>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border"
                />
                <div>
                  <CopyToClipboard text={me}>
                    <button
                      onClick={copyId}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {(!callAccepted || callEnded) && (
            <p>Ingresa el ID de llamada destino</p>
          )}
          <div>
            {(!callAccepted || callEnded) && (
              <input
                type="text"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                className="border"
              />
            )}
            <div>
              {!callAccepted || callEnded ? (
                <button
                  onClick={() => callUser(idToCall)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Call
                </button>
              ) : (
                <div>
                  <p>Terminar llamada</p>
                  <button
                    onClick={leaveCall}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    TERMINAR
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={toggleVideo}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {videoEnabled ? "OFF" : "ON"}
            </button>

            <button
              onClick={toggleAudio}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {audioEnabled ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
