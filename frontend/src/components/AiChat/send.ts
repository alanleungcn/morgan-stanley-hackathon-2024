import { StreamSend, StreamingAdapterObserver } from "@nlux/react";

// A demo API by NLUX that connects to OpenAI
// and returns a stream of Server-Sent events
const demoProxyServerUrl = "https://gptalks.api.nlux.dev/openai/chat/stream";

// Function to send query to the server and receive a stream of chunks as response
export const send: StreamSend = async (
  prompt: string,
  observer: StreamingAdapterObserver,
) => {
  const input: string = `
  You are AI assistant of the Zubin Foundation company in Hong Kong. You are responsible to giving the answer to the member on most frequent questions.
  You provide the services like giving recommendtion about the events and providing them with information about the certain event. \n\n

  Events: 
  1. Event: "
  Name: Healthy Lifstyle
  Details: How to choose the healthy in our modern life. 
  Date: today."
  2. Event: "
  Name: Billy's concert
  Details: Billy will sing his new songs. Have fun and Sing with us.
  Date: After 2 days."

   2. Event: "
  Name: Womans in Social Life
  Details: We will discuss the social problems in daily life.  
  Date: tomorrow."
    
  ${prompt}

  `;
  prompt = input;
  const test: string = "something";
  console.log(`The prompt I am sending ${input}`);
  const body = { prompt };
  const response = await fetch(demoProxyServerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.status !== 200) {
    observer.error(new Error("Failed to connect to the server"));
    return;
  }

  if (!response.body) {
    return;
  }

  // Read a stream of server-sent events
  // and feed them to the observer as they are being generated
  const reader = response.body.getReader();
  const textDecoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    const content = textDecoder.decode(value);
    if (content) {
      observer.next(content);
    }
  }

  observer.complete();
};
