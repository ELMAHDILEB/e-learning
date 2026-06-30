export const CONTACTS = [
  { id: 1, name: "Sara Idrissi", role: "Instructor", avatar: "SI", online: true, unread: 2, lastMsg: "Can you review my course?", time: "09:12" },
  { id: 2, name: "Youssef Alami", role: "Student", avatar: "YA", online: true, unread: 0, lastMsg: "Thank you so much!", time: "08:45" },
  { id: 3, name: "Omar Tazi", role: "Instructor", avatar: "OT", online: false, unread: 1, lastMsg: "When will it be published?", time: "Yesterday" },
  { id: 4, name: "Fatima Zahra", role: "Student", avatar: "FZ", online: false, unread: 0, lastMsg: "I have a question about...", time: "Yesterday" },
  { id: 5, name: "Rim Kettani", role: "Instructor", avatar: "RK", online: true, unread: 0, lastMsg: "Course is ready for review", time: "Mon" },
  { id: 6, name: "Hassan Ouali", role: "Student", avatar: "HO", online: false, unread: 0, lastMsg: "Got it, thanks!", time: "Mon" },
  { id: 7, name: "Leila Bakkali", role: "Instructor", avatar: "LB", online: true, unread: 3, lastMsg: "Please check the update", time: "Sun" },
  { id: 8, name: "Bilal Mrani", role: "Student", avatar: "BM", online: false, unread: 0, lastMsg: "Okay I understand", time: "Sun" },
];

export const INITIAL_MESSAGES = {
  1: [
    { id: 1, from: "them", text: "Hello! I just submitted my new React course for review.", time: "09:00" },
    { id: 2, from: "me", text: "Hi Sara! I'll take a look at it today.", time: "09:05" },
    { id: 3, from: "them", text: "Can you review my course?", time: "09:12" },
  ],
  2: [
    { id: 1, from: "them", text: "I finished the Python course, it was amazing!", time: "08:30" },
    { id: 2, from: "me", text: "Glad to hear that Youssef!", time: "08:40" },
    { id: 3, from: "them", text: "Thank you so much!", time: "08:45" },
  ],
  3: [
    { id: 1, from: "them", text: "I updated my course content.", time: "Yesterday" },
    { id: 2, from: "them", text: "When will it be published?", time: "Yesterday" },
  ],
  4: [{ id: 1, from: "them", text: "I have a question about the course material...", time: "Yesterday" }],
  5: [{ id: 1, from: "them", text: "Course is ready for review", time: "Mon" }],
  6: [{ id: 1, from: "them", text: "Got it, thanks!", time: "Mon" }],
  7: [
    { id: 1, from: "them", text: "I added new lectures to the course.", time: "Sun" },
    { id: 2, from: "them", text: "Please check the update", time: "Sun" },
    { id: 3, from: "them", text: "Also updated the thumbnails", time: "Sun" },
  ],
  8: [{ id: 1, from: "them", text: "Okay I understand", time: "Sun" }],
};