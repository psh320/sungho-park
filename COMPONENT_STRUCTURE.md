# 🗂️ Component Structure Documentation

## New Organization (Domain-Based)

Following the **"Organizing Code by Feature/Domain"** principle from our frontend design guidelines:

```
src/components/
├── App/                    # App-wide components
│   ├── Layout.tsx         # App layout wrapper
│   ├── Header.tsx         # App header
│   ├── Footer.tsx         # App footer
│   └── index.ts           # Barrel exports
│
├── Desktop/               # Desktop environment domain
│   ├── Desktop.tsx        # Desktop container
│   ├── Monitor.tsx        # Monitor frame
│   ├── Dock.tsx          # Desktop dock
│   └── index.ts          # Barrel exports
│
├── Window/                # Window system domain
│   ├── Window.tsx         # Main window component
│   ├── WindowHeader.tsx   # Window header
│   ├── WindowControls.tsx # Window control buttons
│   ├── WindowConfig.tsx   # Window configuration
│   ├── ResizeHandles.tsx  # Window resize handles
│   └── index.ts          # Barrel exports
│
├── UI/                    # Reusable UI components
│   ├── LoadingIndicator.tsx
│   ├── DarkModeToggleButton.tsx
│   └── index.ts          # Barrel exports
│
├── Home/                  # Home page domain
│   ├── Skills.tsx         # Skills component
│   └── Terminal/          # Terminal application
│       ├── Terminal.tsx
│       ├── TerminalState.tsx
│       ├── TerminalInput.tsx
│       ├── terminalCommands.ts
│       ├── constants.ts
│       └── index.ts
│
└── Project/              # Project domain
    ├── ProjectItem.tsx
    ├── ProjectModal.tsx
    └── index.ts
```

## Updated Import Paths

### Before (Common-based)

```typescript
import Layout from "@/components/Common/Layout";
import Monitor from "@/components/Common/Monitor";
import Desktop from "@/components/Common/Desktop";
import Window from "../../Common/Window";
```

### After (Domain-based)

```typescript
import Layout from "@/components/App/Layout";
import Monitor from "@/components/Desktop/Monitor";
import Desktop from "@/components/Desktop/Desktop";
import Window from "../../Window/Window";
```

## Benefits of New Structure

### ✅ **Cohesion**

- Related components are grouped together
- Window system is unified in one place
- Desktop environment components are colocated

### ✅ **Predictability**

- Clear domain boundaries
- Easier to find components by their purpose
- Consistent barrel exports

### ✅ **Maintainability**

- Easier to add new domains (e.g., Editor/, Browser/)
- Clear separation of concerns
- Reduced coupling between domains

### ✅ **Extensibility**

- Window system can be reused for any windowed app
- UI components are truly reusable
- Easy to add new domains as the app grows

## Barrel Exports

Each domain has its own `index.ts` file for clean imports:

```typescript
// From App domain
import { Layout, Header, Footer } from "@/components/App";

// From Window domain
import { Window, WindowControls, WINDOW_CONSTANTS } from "@/components/Window";

// From Desktop domain
import { Desktop, Monitor, Dock } from "@/components/Desktop";
```
