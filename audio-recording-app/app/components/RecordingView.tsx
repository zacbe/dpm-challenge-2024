'use client'

import { useState, useEffect, useRef } from 'react'
export default function RecordingView() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [recording, setRecording] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    if (isRecording) {
      startRecording()
    } else {
      stopRecording()
    }
  }, [isRecording])

  const toggleRecording = () => {
    setIsRecording(prevState => !prevState)
  }

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder

        const audioChunks: Blob[] = []

        mediaRecorder.ondataavailable = (e) => {
          audioChunks.push(e.data)
        }

        mediaRecorder.onstop = (_e) => {
          const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" })
          setRecording(audioBlob)
          setAudioURL(URL.createObjectURL(audioBlob))
        }

        mediaRecorder.start()
      })
      .catch(err => {
        console.error("Error accessing audio stream:", err)
      })
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }
  }

  const handleUpload = async () => { }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-full">

        {/* Recording Block */}
        {isRecording && (
          <div className="w-1/2 m md:w-1/4 m-auto rounded-md border p-4 bg-white">
            <div className="flex-1 flex w-full justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Recording
                </p>
              </div>
              <div className=" rounded-full w-4 h-4 bg-red-500 animate-pulse" />
            </div>
          </div>
        )}

        {/* Recording Button */}
        <div className="flex items-center w-full">
          {isRecording ? (
            <button
              onClick={toggleRecording}
              className="rounded-full h-20 w-20 mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500">
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56 56">
                <path fill="currentColor" d="M20.266 47.36c1.101 0 1.992-.844 1.992-1.946V10.61a1.97 1.97 0 0 0-1.992-1.968c-1.102 0-2.016.867-2.016 1.968v34.805c0 1.102.914 1.945 2.016 1.945m15.492 0c1.101 0 1.992-.844 1.992-1.946V10.61a1.97 1.97 0 0 0-1.992-1.968c-1.102 0-2.016.867-2.016 1.968v34.805c0 1.102.914 1.945 2.016 1.945" />
              </svg>
            </button>
          ) : (
            <button
              onClick={toggleRecording}
              className="rounded-full h-20 w-20 mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500">
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" >
                  <path d="M16 6.429C16 4.535 14.21 3 12 3S8 4.535 8 6.429v5.142C8 13.465 9.79 15 12 15s4-1.535 4-3.429V6.43Z" />
                  <path d="M5 11a7 7 0 1 0 14 0m-7 7v3m-4 0h8" />
                </g>
              </svg>
            </button>
          )}
        </div>

        {/* Email Input and Upload Button */}
        <div className="mt-4 w-1/2 md:w-1/4 m-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
            required
          />
          <button
            className="w-full mt-2 p-2 bg-green-400 hover:bg-green-500 rounded">
            Upload Recording
            <svg
              className="w-6 h-6 inline-block ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2a6.001 6.001 0 0 0-5.476 3.545a23.012 23.012 0 0 1-.207.452l-.02.001C6.233 6 6.146 6 6 6a4 4 0 1 0 0 8h.172l2-2H6a2 2 0 1 1 0-4h.064c.208 0 .45.001.65-.04a1.94 1.94 0 0 0 .7-.27c.241-.156.407-.35.533-.527a2.39 2.39 0 0 0 .201-.36c.053-.11.118-.255.196-.428l.004-.01a4.001 4.001 0 0 1 7.304 0l.005.01c.077.173.142.317.195.428c.046.097.114.238.201.36c.126.176.291.371.533.528c.242.156.487.227.7.27c.2.04.442.04.65.04L18 8a2 2 0 1 1 0 4h-2.172l2 2H18a4 4 0 0 0 0-8c-.146 0-.233 0-.297-.002h-.02A6.001 6.001 0 0 0 12 2m5.702 4.034" />
              <path fill="currentColor" d="m12 12l-.707-.707l.707-.707l.707.707zm1 9a1 1 0 1 1-2 0zm-5.707-5.707l4-4l1.414 1.414l-4 4zm5.414-4l4 4l-1.414 1.414l-4-4zM13 12v9h-2v-9z" />
            </svg>
          </button>
        </div>

        {/* Audio Playback */}
        
      </div>
    </div>
  )
}