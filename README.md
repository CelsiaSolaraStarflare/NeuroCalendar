**Local Setup Guide for NeuroCal
This guide details the steps required to run the NeuroCal.jsx file, a React component using Tailwind CSS, on your local machine.
NeuroCalendar made by Gemini, Prompted by CelsiaStarflare

## 1. Prerequisites
Before starting, ensure you have the following installed:
Node.js: Required to run JavaScript outside the browser and manage packages.
npm (Node Package Manager) or Yarn: Used to install project dependencies.
## 2. Project Setup (Using Vite)
The simplest way to set up a modern React project is using Vite.

Create a new Vite React project:
```
npm create vite@latest neurocal-app -- --template react
```
(Select React and JavaScript when prompted, if necessary.)


Navigate into the new directory:
```
cd neurocal-app
```

Install dependencies:
```
npm install
```

## 3. Install and Configure Tailwind CSS
Since the component uses Tailwind CSS, you must install and configure it in the new project.
Install Tailwind dependencies:
```
npm install -D tailwindcss postcss autoprefixer
```

Initialize Tailwind configuration files:
```
npx tailwindcss init -p
```
**
