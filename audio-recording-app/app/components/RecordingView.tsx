'use client'

import { useState, useEffect } from 'react'
export default function RecordingView() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")

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
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  const handleUpload = async () => {}

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
            </button>
          ) : (
            <button
              onClick={toggleRecording}
              className="rounded-full h-20 w-20 mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500">
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
          </button>
        </div>
      </div>
    </div>
  )
}