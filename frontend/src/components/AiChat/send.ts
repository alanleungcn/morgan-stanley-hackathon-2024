import { useEvents } from "@/api/event/use-events";
import { StreamSend, StreamingAdapterObserver } from "@nlux/react";
// A demo API by NLUX that connects to OpenAI
// and returns a stream of Server-Sent events
const demoProxyServerUrl = "https://gptalks.api.nlux.dev/openai/chat/stream";

const getEventDetailsString = () => {
  const { data, isSuccess } = useEvents();

  if (!isSuccess) {
    return "Failed to fetch event data.";
  }

  const eventDetails = data
    ?.map((event, index) => {
      return `
    ${index + 1}. Event information:
        Name: ${event.eventName}
        Description: ${event.eventDescription}
        Start Date: ${event.eventStartDate.toDateString()}
        End Date: ${event.eventEndDate.toDateString()}`;
    })
    .join("\n");

  return eventDetails;
};

// Function to send query to the server and receive a stream of chunks as response
export const send: StreamSend = async (
  prompt: string,
  observer: StreamingAdapterObserver,
) => {
  const template: string = `
  You are Ai Asisstant of Zubin Foundation in their Event Mangment website. You are responsible for answering to the FAQ and helping to users. Provide information 
  and give recommendation about the events if users askes about them. \n

  About the website: 
  In the website we have events page where user can register to the events by just creating the account. 
  Additionaly user can also be volunteers in the events, for it they need to select the volunteer option while registering to the event.
  Other pages are leader of the participants and vollunteers rates by their number of events they joined. 
  For the volunteers we provide training, because some of the events requires it.
  If user did not created account yet, suggest him to create. And also our website provide. 
  Events:\n
  " 
  ${getEventDetailsString}

  " \n
  ${prompt}
  `;
  // console.log(eventDetails);
  prompt = template;
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
