# Terminal Component

A fully-featured terminal emulator with macOS-style window controls, built with React and TypeScript.

## Features

- 🖥️ **macOS-style UI**: Authentic window controls (red/yellow/green buttons)
- 🖱️ **Drag & Drop**: Click and drag header to move terminal around
- 🔄 **Resize**: Drag edges and corners to resize (maintains proper edge behavior)
- 📺 **Fullscreen**: Expand to use full available space
- ⌨️ **Keyboard Shortcuts**: F11 (fullscreen), Escape (exit fullscreen)
- 📝 **Typewriter Effect**: Smooth text animation for command responses
- 🔍 **Command Autocomplete**: Tab completion and arrow key navigation
- 🎨 **Dark Mode**: Supports light/dark themes

## Components

### `Terminal.tsx`

Main terminal component that orchestrates all functionality.

### `TerminalHeader.tsx`

Header with macOS-style window controls and drag functionality.

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

The terminal uses several custom hooks for clean separation of concerns:

- `useTypewriter` - Handles text animation
- `useFullscreen` - Manages fullscreen state and keyboard shortcuts
- `useResize` - Handles window resizing with proper edge behavior
- `useDrag` - Manages drag and drop functionality
- `useCommandAutocomplete` - Command completion and suggestions

## Configuration

Modify `constants.ts` to adjust:

- Default dimensions
- Size constraints (min/max)
- Available commands
- Other configuration options
