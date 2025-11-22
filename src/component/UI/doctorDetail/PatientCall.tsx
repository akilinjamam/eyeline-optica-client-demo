/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default function PatientCall({roomId, patientId, doctorName}: {roomId:string, patientId:string, doctorName:string}) {

  const navigate = useRouter();
  // --- Refs ---
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const localTracksRef = useRef<any[]>([]);
  const clientRef = useRef<any>(null); // Store Agora Client Persistence
  const pendingRemoteUser = useRef<any>(null);

  // --- States ---
  const [isReady, setIsReady] = useState(false);
  const [AgoraRTC, setAgoraRTC] = useState<any>(null);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  // --- 1. Initialize Audio Object Once ---
  useEffect(() => {
    // Create audio once on mount
    audioRef.current = new Audio("/rington/marimba_soft.mp3"); // Use your public path
    audioRef.current.loop = true;
  }, []);

  // --- 2. Ringtone Logic ---
  useEffect(() => {
    if (isIncomingCall) {
      // Attempt to play
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented. User must interact first.", error);
        });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isIncomingCall]);

  // --- 3. Timer Logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callAccepted) {
      interval = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callAccepted]);

  // --- 4. USER ACTION: Enable Audio & Join ---
  const handleJoinWaitingRoom = () => {
    // Triggers browser permission for Audio
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        audioRef.current?.pause();
        audioRef.current!.currentTime = 0;
      }).catch(e => console.log("Audio init check", e));
    }
    setIsReady(true); // Show the main UI
  };

  // --- 5. Initialize Agora (Only when Ready) ---
  useEffect(() => {
    if (!isReady) return; // Don't connect until user clicks "Start"

    let isMounted = true;

    const initAgora = async () => {
      try {
        const Agora = (await import("agora-rtc-sdk-ng")).default;
        setAgoraRTC(Agora);

        const agoraClient = Agora.createClient({ mode: "rtc", codec: "vp8" });
        clientRef.current = agoraClient; // Save to Ref

        // --- Listeners ---
        // FIX 1: Prevent race condition and save the remote user object
        agoraClient.on("user-published", async (user: any, mediaType: any) => {
            // Only set the incoming call state ONCE for a new user.
            if (!isIncomingCall && !callAccepted) {
                console.log("Incoming call detected (First Track Published)");
                pendingRemoteUser.current = { user }; // Only need the 'user' object
                setIsIncomingCall(true); 
                setStatusMessage("Doctor is calling...");
            } else if (isIncomingCall) {
                console.log(`Remote user also published ${mediaType} track.`);
            }
        });
        
        agoraClient.on("user-left", () => {
          setStatusMessage("Doctor ended the call.");
          handleEndCall();
        });

        // --- Get Token & Join ---
        const res = await axios.post(
          "https://server.eyelineoptica.com/api/v1/agora/create-token",
          { channelName: roomId, uid: patientId, role: "subscriber" }
        );
        const { token, appId } = res.data.data;

        if (isMounted) {
          await agoraClient.join(appId, roomId, token, patientId);
          setStatusMessage("Waiting for doctor to join...");
        }

      } catch (error) {
        console.error("Agora connection error:", error);
        if (isMounted) setStatusMessage("Connection Failed. Please refresh.");
      }
    };

    initAgora();

    // Cleanup on Unmount
    return () => {
      isMounted = false;
      if (clientRef.current) {
        clientRef.current.leave();
        clientRef.current.removeAllListeners();
        clientRef.current = null;
      }
      // Also cleanup tracks
      if (localTracksRef.current) {
        localTracksRef.current.forEach((t:any) => t.close());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, roomId, patientId]); // Added dependencies for linting

  // --- 6. Call Handlers ---

  const handleAcceptCall = async () => {
    if (!clientRef.current || !AgoraRTC) return;
    
    setIsIncomingCall(false);
    setCallAccepted(true);
    if(audioRef.current) audioRef.current.loop = false
    
    try {
      // Cleanup previous tracks if any
      if (localTracksRef.current.length > 0) {
         localTracksRef.current.forEach(t => t.close());
         localTracksRef.current = [];
      }

      // 1. Subscribe to Remote (FIX 2: Explicitly subscribe to both audio and video)
      if (pendingRemoteUser.current) {
        const { user } = pendingRemoteUser.current;
        
        // 🔑 FIX A: Explicitly subscribe to both audio and video tracks
        await clientRef.current.subscribe(user, "audio");
        await clientRef.current.subscribe(user, "video");
        
        // Play Tracks
        
        // Video Track Playback
        if (user.videoTrack && remoteVideoRef.current) {
            user.videoTrack.play(remoteVideoRef.current);
        }
        
        // 🔑 FIX B: Audio Track Playback
        if (user.audioTrack) {
            console.log("SUCCESS! Playing remote audio track.");
            user.audioTrack.play();
        }
      }

      // 2. Publish Local
      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      localTracksRef.current = tracks;
      if (localVideoRef.current) tracks[1].play(localVideoRef.current);
      await clientRef.current.publish(tracks);

    } catch (error) {
      console.error("Accept Call Error:", error);
      handleEndCall();
    }
  };

  const handleEndCall = async () => {
    setIsIncomingCall(false);
    setCallAccepted(false);
    setCallDuration(0);
    setStatusMessage("Call ended. Waiting for doctor...");

    // Cleanup Tracks
    if (localTracksRef.current.length > 0) {
      localTracksRef.current.forEach((track:any) => {
        track.stop();
        track.close();
      });
      localTracksRef.current = [];
    }

    // Unpublish but stay in channel
    if (clientRef.current) {
      await clientRef.current.unpublish();
    }
    
    // Clear DOM
    if (localVideoRef.current) localVideoRef.current.innerHTML = "";
    if (remoteVideoRef.current) remoteVideoRef.current.innerHTML = "";
    if(audioRef.current) audioRef.current.loop = false
  };

  const handleRejectCall = () => {
    setIsIncomingCall(false);
    setStatusMessage("You rejected the call.");
  };

  // --- 7. Render ---

  // SCENE 1: GATEWAY (Forces Interaction)
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center max-w-md px-6">
          <h2 className="text-3xl font-bold mb-4">Welcome to Telemedicine</h2>
          <p className="text-gray-400 mb-8">
            Click below to enter the secure waiting room and enable audio notifications.
          </p>
          <button
            onClick={handleJoinWaitingRoom}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-xl font-bold shadow-lg transition-all transform hover:scale-105"
          >
            Enter Waiting Room
          </button>
        </div>
      </div>
    );
  }

  // SCENE 2: MAIN INTERFACE
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-10 px-4 text-white relative overflow-hidden">
      
      {/* INCOMING CALL POPUP */}
      {isIncomingCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-pulse border border-gray-700">
            <div className="w-24 h-24 bg-gray-700 rounded-full mb-4 flex items-center justify-center text-4xl">
               👨‍⚕️
            </div>
            <h3 className="text-2xl font-bold mb-2">Incoming Call...</h3>
            <p className="text-gray-400 mb-8">{doctorName} is calling</p>
            <div className="flex gap-8">
              <button onClick={handleRejectCall} className="flex flex-col items-center gap-2">
                 <div className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg">
                   <span className="text-2xl">✖</span>
                 </div>
                 <span className="text-sm">Reject</span>
              </button>
              <button onClick={handleAcceptCall} className="flex flex-col items-center gap-2">
                 <div className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg animate-bounce">
                   <span className="text-2xl">📞</span>
                 </div>
                 <span className="text-sm">Accept</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6">Patient Portal</h2>

      <div className="w-full max-w-4xl relative bg-black rounded-xl shadow-2xl overflow-hidden border border-gray-800 h-[60vh] flex items-center justify-center">
        {/* Status Message */}
        {!callAccepted && (
          <div className="text-center">
             <div className="animate-ping w-4 h-4 bg-green-500 rounded-full mx-auto mb-4"></div>
             <p className="text-gray-400 text-lg">{statusMessage}</p>
          </div>
        )}

        {/* Timer */}
        {callAccepted && (
          <div className="absolute top-4 left-4 z-10 bg-red-600/90 px-4 py-1 rounded-full flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="font-mono font-bold">{formatTime(callDuration)}</span>
          </div>
        )}

        {/* Videos */}
        <div ref={remoteVideoRef} className={`w-full h-full ${!callAccepted ? "hidden" : "block"}`} />
        {callAccepted && (
          <div ref={localVideoRef} className="w-40 h-28 bg-gray-800 absolute bottom-4 right-4 border-2 border-gray-600 rounded-lg shadow-xl overflow-hidden" />
        )}
        </div>
        <br />
        { statusMessage
          ?
          <button
            onClick={() => navigate.push("/patientProfile")}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-xl font-bold shadow-lg transition-all transform hover:scale-105"
          >
            Back
        </button>
        :
        <Loader2 className="animate-spin text-blue-500 w-8 h-8 "/>
        }

      {callAccepted && (
        <div className="mt-8">
          <button
            onClick={handleEndCall}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full shadow-lg text-lg font-bold"
          >
            End Call
          </button>
        </div>
      )}
    </div>
  );
}