// coursesData.js - Dummy data for courses and lessons

export const COURSES_DATA = [
  {
    id: 1,
    title: "React.js Masterclass",
    description: "Learn React from basics to advanced",
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    instructor: "Sara Idrissi",
    image: "https://via.placeholder.com/400x200?text=React.js",
    lessons: [
      {
        id: 1,
        title: "Introduction to React",
        description: "Learn the basics of React and why it's popular",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "15:30",
        completed: true,
      },
      {
        id: 2,
        title: "Components & JSX",
        description: "Understanding React components and JSX syntax",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "22:45",
        completed: true,
      },
      {
        id: 3,
        title: "State & Props",
        description: "Managing component state and passing props",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "28:15",
        completed: true,
      },
      {
        id: 4,
        title: "Hooks Deep Dive",
        description: "Master React Hooks (useState, useEffect, useContext)",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "35:20",
        completed: false,
      },
      {
        id: 5,
        title: "Routing with React Router",
        description: "Client-side routing and navigation",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "25:10",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "Node.js API Development",
    description: "Build scalable APIs with Node.js and Express",
    progress: 48,
    totalLessons: 25,
    completedLessons: 12,
    instructor: "Omar Tazi",
    image: "https://via.placeholder.com/400x200?text=Node.js",
    lessons: [
      {
        id: 1,
        title: "Node.js Basics",
        description: "Introduction to Node.js runtime and npm",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "18:20",
        completed: true,
      },
      {
        id: 2,
        title: "Express.js Setup",
        description: "Creating a basic Express server",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "20:15",
        completed: true,
      },
      {
        id: 3,
        title: "Routing & Middleware",
        description: "Understanding Express routing and middleware",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "32:40",
        completed: false,
      },
      {
        id: 4,
        title: "Database Integration",
        description: "Connecting to databases with Node.js",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "28:50",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "MongoDB Basics",
    description: "Master NoSQL database with MongoDB",
    progress: 22,
    totalLessons: 18,
    completedLessons: 4,
    instructor: "Rim Kettani",
    image: "https://via.placeholder.com/400x200?text=MongoDB",
    lessons: [
      {
        id: 1,
        title: "Introduction to MongoDB",
        description: "NoSQL databases and MongoDB concepts",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "16:30",
        completed: true,
      },
      {
        id: 2,
        title: "CRUD Operations",
        description: "Create, Read, Update, Delete operations",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "24:15",
        completed: true,
      },
      {
        id: 3,
        title: "Aggregation Pipeline",
        description: "Advanced MongoDB queries",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "31:20",
        completed: false,
      },
    ],
  },
];

export const getCourseById = (courseId) => {
  return COURSES_DATA.find((course) => course.id === parseInt(courseId));
};

export const getLessonById = (courseId, lessonId) => {
  const course = getCourseById(courseId);
  if (!course) return null;
  return course.lessons.find((lesson) => lesson.id === parseInt(lessonId));
};
