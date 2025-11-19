/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function PatientCall() {

  const roomId = "691d89c7d9463f471515d5fb"
  const patientId = "91d8a2ad9463f471515d65d"
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoRef = useRef<HTMLDivElement | null>(null);

  const [client, setClient] = useState<any>(null);
  const [AgoraRTC, setAgoraRTC] = useState<any>(null);
  const [joined, setJoined] = useState(false);
  const [localTracks, setLocalTracks] = useState<any[]>([]);

  // Load Agora client only on the client-side
  useEffect(() => {
    const loadAgora = async () => {
      const Agora = (await import("agora-rtc-sdk-ng")).default;
      const agoraClient = Agora.createClient({ mode: "rtc", codec: "vp8" });

      setAgoraRTC(Agora);
      setClient(agoraClient);
    };

    loadAgora();
  }, []);

  const joinCall = async () => {
    if (!client || !AgoraRTC) return;

    const res = await axios.post(
      "https://server.eyelineoptica.com/api/v1/agora/create-token",
      {
        channelName: roomId,
        uid: patientId,
        role: "subscriber",
      }
    );

    const { token, appId } = res.data.data;

    await client.join(appId, roomId, token, patientId);

    const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    setLocalTracks(tracks);

    tracks[1].play(localVideoRef.current);
    await client.publish(tracks);

    client.on("user-published", async (user: any, mediaType: any) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video") {
        user.videoTrack.play(remoteVideoRef.current);
      }
    });

    setJoined(true);
  };

  const leaveCall = async () => {
    if (localTracks.length > 0) {
      localTracks.forEach((track) => {
        track.stop();
        track.close();
      });
      setLocalTracks([]);
    }

    if (client) {
      await client.leave();
    }

    if (localVideoRef.current) localVideoRef.current.innerHTML = "";
    if (remoteVideoRef.current) remoteVideoRef.current.innerHTML = "";

    setJoined(false);
  };

  return (
    <div>
      <h2>Join Video Call</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <div
          ref={localVideoRef}
          style={{ width: 300, height: 200, background: "#111" }}
        />
        <div
          ref={remoteVideoRef}
          style={{ width: 300, height: 200, background: "#111" }}
        />
      </div>

      {!joined ? (
        <button onClick={joinCall}>Join Call</button>
      ) : (
        <button onClick={leaveCall}>Leave Call</button>
      )}
    </div>
  );
}
