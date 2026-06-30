import { useState } from "react";
import useSearch from "../../hooks/useSearch";
import { CONTACTS, INITIAL_MESSAGES } from "../../data/chatData";
import ContactsList from "./ContactsList";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";


const ChatComponent = () => {
  // State: Contacts with online status, unread count, etc.
  const [contacts, setContacts] = useState(CONTACTS);

  // State: Messages indexed by contact ID
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  // State: Currently selected contact (null = no selection)
  const [selected, setSelected] = useState(null);

  // State: Current message being typed
  const [input, setInput] = useState("");

  // State: Attached files for current message
  const [attachedFiles, setAttachedFiles] = useState([]);

  // State: Show chat on mobile (vs contacts list)
  const [showChat, setShowChat] = useState(false);

  // Hook: Search and filter contacts by name
  const { search, setSearch, filtered: filteredContacts } = useSearch(contacts, ["name"]);

  /**
   * Handle selecting a contact
   * - Set as selected
   * - Show chat area on mobile
   * - Mark unread messages as read
   */
  const handleSelect = (contact) => {
    setSelected(contact);
    setShowChat(true);
    
    // Mark as read
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c))
    );
  };

  /**
   * Handle back button on mobile
   * - Hide chat area
   * - Show contacts list
   */
  const handleBack = () => {
    setShowChat(false);
    setSelected(null);
  };

  /**
   * Handle sending a message
   * - Add message to selected contact's thread
   * - Update contact's last message preview
   * - Update contact's timestamp
   * - Clear input and files
   * - Support for file attachments
   */
  const handleSend = () => {
    if (!input.trim()) return;

    // Create new message object
    const newMsg = {
      id: Date.now(),
      from: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      // Include attached files in message
      files: attachedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    };

    // Add message to thread
    setMessages((prev) => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), newMsg],
    }));

    // Update contact's last message preview and timestamp
    setContacts((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? {
              ...c,
              lastMsg: input.trim(),
              time: newMsg.time,
            }
          : c
      )
    );

    // Clear input and files
    setInput("");
    setAttachedFiles([]);
  };

  // Get messages for selected contact (or empty array)
  const currentMessages = messages[selected?.id] || [];

  return (
    <div className="flex h-[calc(100vh-130px)] bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
      {/* CONTACTS SIDEBAR */}
      {/* Shows list of all contacts with search */}
      {/* Responsive: hidden on mobile when chat is open */}
      <ContactsList
        contacts={filteredContacts}
        search={search}
        onSearchChange={setSearch}
        onSelectContact={handleSelect}
        selectedId={selected?.id}
        showChat={showChat}
      />

      {/* CHAT AREA */}
      {/* Shows header, messages, and input for selected contact */}
      {/* Responsive: full width on mobile, right side on desktop */}
      <div
        className={`
          flex-1 flex flex-col min-w-0 bg-[var(--card)]
          w-full md:flex
          ${showChat ? "flex" : "hidden md:flex"}
        `}
      >
        {selected ? (
          <>
            {/* Chat header with contact info and actions */}
            <ChatHeader contact={selected} onBack={handleBack} />

            {/* Messages display area */}
            <MessagesList messages={currentMessages} selectedContact={selected} />

            {/* Message input area */}
            <MessageInput
              input={input}
              onInputChange={setInput}
              onSend={handleSend}
              attachedFiles={attachedFiles}
              onFilesChange={setAttachedFiles}
            />
          </>
        ) : (
          /* Empty state when no contact selected */
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
