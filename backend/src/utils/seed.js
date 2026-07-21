/**
 * Seed script: creates sample users, categories, a skill test, and one task
 * so you can immediately exercise the full flow (match -> escrow -> workspace
 * -> rating) without manually creating everything through Postman first.
 *
 * Run with: npm run seed
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const User = require('../models/User');
const Category = require('../models/Category');
const Task = require('../models/Task');
const { SkillTest } = require('../models/SkillTest');

async function seed() {
  await connectDB();
  console.log('Clearing existing demo data...');
  await Promise.all([
    User.deleteMany({ email: { $in: ['poster@demo.com', 'freelancer@demo.com', 'admin@demo.com'] } }),
    Category.deleteMany({ slug: 'web-development' }),
  ]);

  console.log('Creating users...');
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'password123',
    role: 'admin',
  });

  const poster = await User.create({
    name: 'Priya Sharma',
    email: 'poster@demo.com',
    password: 'password123',
    role: 'poster',
  });

  const freelancer = await User.create({
    name: 'Rahul Verma',
    email: 'freelancer@demo.com',
    password: 'password123',
    role: 'freelancer',
    skills: ['React', 'Node.js', 'MongoDB'],
    ratingAvg: 4.7,
    ratingCount: 12,
    completedTasks: 9,
    availability: 'available',
  });

  console.log('Creating category...');
  const category = await Category.create({
    name: 'Web Development',
    slug: 'web-development',
    description: 'Frontend, backend, and full-stack web development tasks',
  });

  console.log('Creating sample task...');
  await Task.create({
    title: 'Build a responsive landing page',
    description: 'Need a React + Tailwind landing page with a contact form and pricing section.',
    poster: poster._id,
    category: category._id,
    requiredSkills: ['React', 'Tailwind'],
    budget: 300,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    tags: ['react', 'landing-page'],
  });

  console.log('Creating a sample skill test...');
  await SkillTest.create({
    skill: 'React',
    title: 'React Fundamentals Certification',
    description: 'Tests core React concepts: hooks, state, component lifecycle.',
    durationMinutes: 20,
    passingScorePercent: 70,
    badgeLevel: 'intermediate',
    questions: [
      {
        questionText: 'Which hook is used to manage state in a functional component?',
        type: 'mcq',
        options: ['useEffect', 'useState', 'useRef', 'useMemo'],
        correctOptionIndex: 1,
        points: 1,
      },
      {
        questionText: 'What does useEffect run after by default?',
        type: 'mcq',
        options: ['Only on mount', 'Every render', 'Only on unmount', 'Never'],
        correctOptionIndex: 1,
        points: 1,
      },
    ],
  });

  console.log('\nSeed complete! Demo accounts (password: "password123"):');
  console.log(`  Admin:      admin@demo.com`);
  console.log(`  Poster:     poster@demo.com`);
  console.log(`  Freelancer: freelancer@demo.com`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
