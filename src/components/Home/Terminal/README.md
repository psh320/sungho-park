# Terminal Component

A fully-featured terminal emulator with macOS-style window controls, built with React and TypeScript. Now uses the generic Window component for consistent windowing behavior across the application.

## Features

- 🖥️ **macOS-style UI**: Authentic window controls (red/yellow/green buttons)
- 🖱️ **Drag & Drop**: Click and drag header to move terminal around
- 🔄 **Resize**: Drag edges and corners to resize (maintains proper edge behavior)
- 📺 **Fullscreen**: Expand to use full available space
- ⌨️ **Keyboard Shortcuts**: F11 (fullscreen), Escape (exit fullscreen)
- 📝 **Typewriter Effect**: Smooth text animation for command responses
- 🔍 **Command Autocomplete**: Tab completion and arrow key navigation
- 🎨 **Dark Mode**: Supports light/dark themes
- 🔧 **Extensible**: Uses generic Window component for consistent window behavior

## Components

### `Terminal.tsx`

Main terminal component that focuses on terminal-specific functionality. Uses the generic `Window` component from `@/components/Common` for windowing behavior.

### `TerminalInput.tsx`

Command input with autocomplete and suggestion handling.

### `ResizeHandles.tsx`

Invisible resize handles for edge and corner resizing.

### `terminalCommands.ts`

Command execution logic and response data.

### `constants.ts`

Configuration constants for dimensions, constraints, and commands.

## Usage

```tsx
import { Terminal } from "@/components/Home/Terminal";

function App() {
  const [isVisible, setIsVisible] = useState(true);

  return <Terminal isVisible={isVisible} onClose={() => setIsVisible(false)} />;
}
```

## Available Commands

- `about` - Personal information
- `skills` - Technical skills
- `experience` - Work experience
- `help` - Show available commands
- `clear` - Clear terminal output
- `fullscreen` - Toggle fullscreen mode

## Architecture

The terminal has been refactored to use the generic `Window` component from `@/components/Common`, providing consistent windowing behavior across the application. The terminal now focuses purely on terminal-specific functionality:

**Terminal-specific:**

- `useTypewriter` - Handles text animation
- `useCommandAutocomplete` - Command completion and suggestions

**Window behavior (handled by Window component):**

- `useFullscreen` - Manages fullscreen state and keyboard shortcuts
- `useResize` - Handles window resizing with proper edge behavior
- `useDrag` - Manages drag and drop functionality

This separation allows the window behavior to be reused by other components that need windowing functionality.

## Configuration

Modify `constants.ts` to adjust:

- Default dimensions
- Size constraints (min/max)
- Available commands
- Other configuration options
