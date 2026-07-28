import { useState } from "react";
import { ThemeColors } from "../../components/ThemeColors";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";

interface MessagePreview {
  id: number;
  name: string;
  role: string;
  time: string;
  preview: string;
  avatar: string;
}

interface ChatMessage {
  id: number;
  sender: "me" | "other";
  text: string;
  time: string;
}

export default function Messages() {
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [isMobileChatView, setIsMobileChatView] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  
  const [messageSearchQuery, setMessageSearchQuery] = useState<string>("");
  const [messageInput, setMessageInput] = useState<string>("");

  // Mock Data mimicking your design
  const chatList: MessagePreview[] = [
    {
      id: 1,
      name: "Grace Johnson",
      role: "Instructor",
      time: "10:00 AM",
      preview: "Please check the feedback...",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Daniel Peters",
      role: "Instructor",
      time: "Yesterday",
      preview: "Can we schedule a call.",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 3,
      name: "Support Team",
      role: "Talent Faculty Support",
      time: "2 May",
      preview: "Hi David. How can we help?",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Deborah Williams",
      role: "Instructor",
      time: "1 May",
      preview: "Great work on your assign...",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 5,
      name: "Michael Adeyemi",
      role: "Instructor",
      time: "29 Apr",
      preview: "Don't forget about the upc...",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
  ];

  const activeChatMessages: ChatMessage[] = [
    { id: 1, sender: "other", text: "Hi David. I received your assignments.", time: "10:00 AM" },
    { id: 2, sender: "me", text: "Thank you so much", time: "10:05 AM" },
    { id: 3, sender: "other", text: "You did a great job on this week's assessment!", time: "10:20 AM" },
    { id: 4, sender: "other", text: "Please check the feedback comments.", time: "10:30 AM" },
  ];

  const activeChatData = chatList.find((c) => c.id === activeChatId) || chatList[0];

  const handleSelectChat = (id: number) => {
    setActiveChatId(id);
    setIsMobileChatView(true);
  };

  const handleLogout = () => {
    console.log("Logging out");
  };

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] font-sans overflow-hidden">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onLogoutClick={handleLogout}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        <TopBar
          title="Messages"
          subtitle="Chat with instructors and support"
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden p-0 md:p-6 bg-[#F8F9FA]">
          <div className="flex w-full h-full bg-white md:rounded-2xl md:border md:border-gray-200 overflow-hidden md:shadow-sm">
            
            {/* Left Column: Chat List */}
            <div className={`w-full md:w-[350px] lg:w-[400px] flex-col border-r border-gray-100 ${isMobileChatView ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={messageSearchQuery}
                    onChange={(e) => setMessageSearchQuery(e.target.value)}
                    placeholder="Search messages"
                    style={{ color: ThemeColors.neutralCoalblack }}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#057834]"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {chatList.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${
                      activeChatId === chat.id
                        ? "bg-[#F2FBF5]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-400 shrink-0">{chat.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{chat.role}</p>
                      <p className="text-sm text-gray-600 truncate">{chat.preview}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Chat Window */}
            <div className={`flex-1 flex-col h-full bg-white ${!isMobileChatView ? 'hidden md:flex' : 'flex'}`}>
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
                {/* Mobile Back Button */}
                <button 
                  onClick={() => setIsMobileChatView(false)}
                  className="md:hidden text-gray-500 hover:text-gray-800"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <img src={activeChatData.avatar} alt={activeChatData.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h2 className="font-semibold text-gray-900">{activeChatData.name}</h2>
                  <p className="text-xs text-gray-500">{activeChatData.role}</p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeChatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-end gap-2 max-w-[80%]">
                      {msg.sender === "other" && (
                        <img src={activeChatData.avatar} alt="avatar" className="w-8 h-8 rounded-full mb-1" />
                      )}
                      <div
                        className={`px-5 py-3 rounded-2xl text-sm ${
                          msg.sender === "me"
                            ? "bg-[#FFF4ED] text-gray-800 rounded-br-sm" 
                            : "bg-[#F3F4F6] text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1 px-10">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 md:p-6 border-t border-gray-50">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    style={{ color: ThemeColors.neutralCoalblack }}
                    className="w-full pl-6 pr-12 py-4 bg-white border border-gray-200 rounded-full text-sm text-neutral-950 focus:outline-none focus:border-[#057834]"
                  />
                  <button 
                    style={{ color: ThemeColors.primaryGreen }}
                    className="absolute right-4 p-2 hover:bg-gray-50 rounded-full transition-colors"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="transform rotate-45">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}