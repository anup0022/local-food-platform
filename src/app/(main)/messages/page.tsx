"use client";

import { useState } from "react";
import { mockChats, mockUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Search,
  Send,
  Image,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  ArrowLeft,
  Circle,
  MessageCircle,
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isOwn: boolean;
}

const mockMessages: Record<string, Message[]> = {
  "chat-1": [
    { id: "m1", senderId: "user-3", text: "Hey! I loved your post about turmeric milk 🙌", time: "10:30 AM", isOwn: false },
    { id: "m2", senderId: "me", text: "Thank you! Have you tried making it with A2 milk?", time: "10:32 AM", isOwn: true },
    { id: "m3", senderId: "user-3", text: "Not yet! Where do you get A2 milk?", time: "10:33 AM", isOwn: false },
    { id: "m4", senderId: "me", text: "There's a local dairy in Koramangala. I'll share the location!", time: "10:35 AM", isOwn: true },
    { id: "m5", senderId: "user-3", text: "That would be amazing, thanks!", time: "10:36 AM", isOwn: false },
    { id: "m6", senderId: "user-3", text: "Hey! Where can I find organic turmeric in Bangalore?", time: "11:02 AM", isOwn: false },
  ],
  "chat-2": [
    { id: "m1", senderId: "user-5", text: "Hey Vikram here! Tried your ragi recipe yesterday", time: "9:00 AM", isOwn: false },
    { id: "m2", senderId: "me", text: "Oh nice! How did it turn out?", time: "9:05 AM", isOwn: true },
    { id: "m3", senderId: "user-5", text: "Thanks for the ragi recipe! It turned out amazing 🙌", time: "9:10 AM", isOwn: false },
  ],
  "chat-3": [
    { id: "m1", senderId: "me", text: "Hi Dr. Rajesh, can you share the honey adulteration report?", time: "2:00 PM", isOwn: true },
    { id: "m2", senderId: "user-2", text: "Sure! Let me compile the data first", time: "2:15 PM", isOwn: false },
    { id: "m3", senderId: "user-2", text: "I'll send you the lab report PDF tomorrow", time: "2:30 PM", isOwn: false },
  ],
};

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("chat-1");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const currentChat = mockChats.find((c) => c.id === selectedChat);
  const messages = selectedChat ? mockMessages[selectedChat] || [] : [];

  const filteredChats = mockChats.filter((chat) =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex">
      {/* Conversation List */}
      <div
        className={cn(
          "w-full md:w-[340px] border-r flex flex-col bg-card",
          selectedChat && "hidden md:flex"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold mb-3">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted border-none"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left",
                  selectedChat === chat.id
                    ? "bg-primary/10"
                    : "hover:bg-muted"
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={chat.user.image} />
                    <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate">{chat.user.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "flex-1 flex flex-col",
          !selectedChat && "hidden md:flex"
        )}
      >
        {selectedChat && currentChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b bg-card">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSelectedChat(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentChat.user.image} />
                <AvatarFallback>{currentChat.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">{currentChat.user.name}</p>
                <p className="text-xs text-green-600">Online</p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-2xl mx-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.isOwn ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2.5",
                        msg.isOwn
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted rounded-bl-md"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={cn(
                          "text-[10px] mt-1",
                          msg.isOwn
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        )}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex items-center gap-2 max-w-2xl mx-auto">
                <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0">
                  <Image className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && message.trim()) {
                      setMessage("");
                    }
                  }}
                  className="flex-1 bg-muted border-none"
                />
                <Button
                  size="icon"
                  disabled={!message.trim()}
                  onClick={() => setMessage("")}
                  className="shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <MessageCircle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                Connect with other food enthusiasts, share recipes, and discuss local food sources.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
