import ChatRoomList from "../components/UI/ChatRoom/ChatRoomList/ChatRoomList";
import { ChatProvider } from "../components/UI/ChatRoom/ChatProvider";

export default function Root() {
  return (
    <>
      <div className="main">
        <ChatProvider>
          <ChatRoomList />
        </ChatProvider>
      </div>
    </>
  );
}
