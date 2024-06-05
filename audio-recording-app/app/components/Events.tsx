"use client";

import { useEffect, useState } from 'react';

export default function Events() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8081/events');

    eventSource.onmessage = function (event) {
      const newMessage = JSON.parse(event.data);
      setMessages(prevMessages => prevMessages.concat(newMessage));
    };

    eventSource.onerror = function (err) {
      console.error('EventSource failed:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className='rounded-md border p-4 bg-white'>
      <h2>Event Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

