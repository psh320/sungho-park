// Command response data
const COMMAND_RESPONSES = {
  about:
    "Frontend Engineer with 2+ years of experience specializing in React, TypeScript, and modern web technologies. Passionate about creating exceptional user experiences and writing clean, maintainable code.",
  skills:
    "Technical Skills:\n• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS\n• Tools: Git, Webpack, Vite, npm/yarn\n• Other: RESTful APIs, Responsive Design, Performance Optimization",
  experience:
    "Professional Experience:\n• 2+ years as Frontend Engineer\n• Specialized in building user-friendly interfaces\n• Experience with modern development workflows\n• Focus on performance and accessibility",
  help: "Available commands:\n• about - Learn more about me\n• skills - View my technical skills\n• experience - See my work experience\n• clear - Clear the terminal\n• fullscreen - Expand/collapse terminal (F11)\n• help - Show this help message",
} as const;

export type CommandType = keyof typeof COMMAND_RESPONSES | "clear";

export function executeCommand(command: string): {
  response: string;
  shouldClear: boolean;
} {
  const normalizedCommand = command.trim().toLowerCase() as CommandType;

  const isValidCommand =
    normalizedCommand in COMMAND_RESPONSES || normalizedCommand === "clear";

  if (normalizedCommand === "clear") {
    return { response: "", shouldClear: true };
  }

  if (isValidCommand && normalizedCommand in COMMAND_RESPONSES) {
    return {
      response: COMMAND_RESPONSES[normalizedCommand],
      shouldClear: false,
    };
  }

  return {
    response: `Command '${command}' not found. Type 'help' to see available commands.`,
    shouldClear: false,
  };
}

export function getIntroText(): string {
  const introLines = [
    "Hi, I'm Sungho Park",
    "Frontend Engineer with 2+ years of experience",
    "Passionate about creating exceptional user experiences",
    "",
    "Type 'help' to see available commands",
  ];

  return introLines.join("\n");
}
