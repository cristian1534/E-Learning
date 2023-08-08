import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import peer from "simple-peer";

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
        myVideo.current.srcObject = stream;
      })
      .catch((err) => {
        console.log("Error accessing media devices", err);
      });

    socket.on("me", (data) => {
      setMe(data);
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

  const asnwerCall = () => {
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

  return (
    <div>
      <h1>WEBINAR</h1>
      <div>
        {stream && (
          <video playsInline muted ref={myVideo} autoPlay className="w-25" />
        )}
      </div>
      <div>
        {callAccepted && !callEnded && (
          <video playsInline ref={userVideo} autoPlay className="w-25" />
        )}
      </div>
      {receivingCall && !callAccepted && (
        <div>
          <p>{name} is calling...</p>
          <button onClick={answerCall}>Accept</button>
        </div>
      )}
      {!callAccepted || callEnded ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border"
          />
          <button type="">Send</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default index;
