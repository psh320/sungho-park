import { useState, useEffect, useRef, useMemo } from "react";
import { useTheme } from "next-themes";

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

// Move availableCommands outside component to prevent recreation
const AVAILABLE_COMMANDS = ["about", "skills", "experience", "help", "clear"];

export default function Terminal({ isVisible, onClose }: TerminalProps) {
  const [typedText, setTypedText] = useState("");
  const [command, setCommand] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const introText = [
      "Hi, I'm Sungho Park",
      "Frontend Engineer with 2+ years of experience",
      "Passionate about creating exceptional user experiences",
      "",
      "Type 'help' to see available commands or close the terminal if you don't like CLI",
    ];

    const fullText = introText.join("\n");
    let currentIndex = 0;

    const typeEffect = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        inputRef.current?.focus();
      }
    };

    const interval = setInterval(typeEffect, 20);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Command autocomplete logic
  useEffect(() => {
    if (command.trim()) {
      const filtered = AVAILABLE_COMMANDS.filter((cmd) =>
        cmd.toLowerCase().startsWith(command.toLowerCase())
      );
      setSuggestions(filtered);
      setSelectedSuggestion(0);
    } else {
      setSuggestions([]);
    }
  }, [command]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.trim().toLowerCase();

    let response = "";
    switch (cmd) {
      case "about":
        response =
          "Frontend Engineer with 2+ years of experience specializing in React, TypeScript, and modern web technologies. Passionate about creating exceptional user experiences and writing clean, maintainable code.";
        break;
      case "skills":
        response =
          "Technical Skills:\n• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS\n• Tools: Git, Webpack, Vite, npm/yarn\n• Other: RESTful APIs, Responsive Design, Performance Optimization";
        break;
      case "experience":
        response =
          "Professional Experience:\n• 2+ years as Frontend Engineer\n• Specialized in building user-friendly interfaces\n• Experience with modern development workflows\n• Focus on performance and accessibility";
        break;
      case "help":
        response =
          "Available commands:\n• about - Learn more about me\n• skills - View my technical skills\n• experience - See my work experience\n• clear - Clear the terminal\n• help - Show this help message";
        break;
      case "clear":
        setTypedText("");
        setCommand("");
        return;
      default:
        response = `Command '${command}' not found. Type 'help' to see available commands.`;
    }

    setTypedText((prev) => prev + `\n$ ${command}\n${response}\n`);
    setCommand("");
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length > 0) {
      if (e.key === "Tab") {
        e.preventDefault();
        setCommand(suggestions[selectedSuggestion]);
        setSuggestions([]);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-center min-h-screen pt-24">
      <div
        ref={terminalRef}
        className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-700 vt323-regular text-gray-800 dark:text-green-500 w-[700px] h-[500px] flex flex-col"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-4">
              Sungho Park Terminal
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-500 hover:text-white rounded"
              title="Close Terminal"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Terminal Content */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto ">
          <div className="flex-1 whitespace-pre-line mb-4">
            {typedText}
            {isTyping && <span className="animate-pulse ml-1">|</span>}
          </div>
        </div>

        {/* Command Input */}
        <div className="relative">
          {suggestions.length > 0 && (
            <div className="absolute bottom-full left-0 mb-1 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`px-3 py-1 cursor-pointer ${
                    index === selectedSuggestion
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setCommand(suggestion);
                    setSuggestions([]);
                    inputRef.current?.focus();
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleCommand} className="flex items-center p-1">
            <span className="mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command (try 'help')"
              className="bg-transparent outline-none flex-1 placeholder-gray-500 dark:placeholder-green-300"
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
}
