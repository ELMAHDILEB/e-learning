import { Search } from "lucide-react";
import ContactItem from "./ContactItem";

const ContactsList = ({ contacts, search, onSearchChange, onSelectContact, selectedId, showChat }) => {
  return (
    <div className={`
      flex flex-col border-r border-[var(--border)] bg-[var(--card)]
      w-full md:w-[280px] md:flex-shrink-0
      ${showChat ? "hidden md:flex" : "flex"}
    `}>
      {/* Search Header */}
      <div className="p-4 border-b border-[var(--border)]">
        <h2 className="text-sm font-medium mb-3">Messages</h2>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-40" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            isSelected={selectedId === contact.id}
            onSelect={onSelectContact}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactsList;