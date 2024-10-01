import { ChatProvider } from "../components/UI/ChatRoom/ChatProvider";
import ChatRoom from "../components/UI/ChatRoom/ChatRoom";

export default function Chat() {
  return (
    <>
      <ChatProvider>
        <ChatRoom />
      </ChatProvider>
    </>
  );
}
