"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

export default function PatientCall({
  roomId,
  patientId,
}: {
  roomId: string;
  patientId: string;
}) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [joined, setJoined] = useState(false);

  const joinCall = async () => {
    const res = await axios.post(
      "https://server.eyelineoptica.com/api/v1/agora/create-token",
      {
        channelName: roomId,
        uid: patientId,
        role: "publisher",
      }
    );

    const { token, appId } = res.data.data;

    await client.join(appId, roomId, token, patientId);

    const localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    localTracks[1].play(localVideoRef.current as any);

    await client.publish(localTracks);

    client.on("user-published", async (user: any, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video") {
        user.videoTrack.play(remoteVideoRef.current as any);
      }
    });

    setJoined(true);
  };

  const leaveCall = async () => {
    await client.leave();
    setJoined(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-black text-white px-4 pb-10">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-wide">
        Doctor Video Consultation
      </h1>

      {/* Video Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Local Video */}
        <div
          ref={localVideoRef}
          className="w-[320px] h-[220px] rounded-xl overflow-hidden shadow-xl bg-black/30 backdrop-blur-md border border-white/10"
        />

        {/* Remote Video */}
        <div
          ref={remoteVideoRef}
          className="w-[320px] h-[220px] rounded-xl overflow-hidden shadow-xl bg-black/30 backdrop-blur-md border border-white/10"
        />
      </div>

      {/* Controls */}
      <div className="mt-8 flex gap-4">
        {!joined ? (
          <button
            onClick={joinCall}
            className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={leaveCall}
            className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            End Call
          </button>
        )}
      </div>

      {/* Call Status */}
      <p className="mt-4 text-sm opacity-80">
        {joined ? "You are now in the call" : "Click Start Call to begin"}
      </p>
    </div>
  );
}
