# Task Manager

A clean, simple task manager built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. Add tasks with priorities, mark them complete, edit inline, filter the list, and clear finished tasks — everything persists in the browser via `localStorage`.

## Features

- Add tasks with a priority (low / medium / high)
- Mark tasks complete / active with one click
- Inline editing (Enter to save, Esc to cancel)
- Delete tasks
- Filter by All / Active / Completed
- Clear all completed tasks at once
- Live task counters in the header
- Tasks persist across reloads with `localStorage`
- Clean dark UI, fully responsive

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS 3

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.tsx      # root layout + metadata
    page.tsx        # main page
    globals.css     # Tailwind directives
  components/
    TaskForm.tsx    # add-task form
    TaskItem.tsx    # task row (toggle, edit, delete)
    FilterBar.tsx   # filter buttons + clear completed
  hooks/
    useTasks.ts     # task state + localStorage persistence
  types.ts          # Task, Priority, Filter types
```
