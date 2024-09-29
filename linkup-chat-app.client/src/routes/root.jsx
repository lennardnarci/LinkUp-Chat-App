import { ChatProvider } from "../components/ChatProvider";
import ChatRoom from "../components/ChatRoom";


export default function Root() {
  return (
    <>
      <div className="main">
        <ChatProvider>
          <ChatRoom />
        </ChatProvider>
      </div>
    </>
  );
}
