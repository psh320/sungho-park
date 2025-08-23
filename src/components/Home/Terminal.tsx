import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function Introduction() {
  const [typedText, setTypedText] = useState("");
  const [command, setCommand] = useState("");
  const { theme } = useTheme();
  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const introText = [
      "Hi, I'm Sungho Park",
      "Frontend Engineer with 2+ years of experience",
      "Passionate about creating exceptional user experiences",
      "",
      "type 'help' to get started or close the terminal if you don't like CLI",
    ];

    // Join all text with newlines to create one continuous string
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
  }, []);

  const handleCommand = (e: any) => {
    e.preventDefault();
    if (command.trim() === "about") {
      setTypedText("Frontend Developer skilled in React and TypeScript.");
    } else if (command.trim() === "skills") {
      setTypedText(
        "Skills: HTML, CSS, JavaScript, React, TypeScript, Git, and more."
      );
    } else if (command.trim() === "experience") {
      setTypedText(
        "Experience: 2 years in frontend development, specializing in user-friendly interfaces."
      );
    } else {
      setTypedText(
        "Command not recognized. Try 'about', 'skills', or 'experience'."
      );
    }
    setCommand("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-md p-2 w-[700px]">
        <span>hi</span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-green-500 p-6 rounded-lg shadow-lgmt-10 vt323-regular w-[700px] border border-gray-300 dark:border-gray-700">
        <div className="text-left whitespace-pre-line min-h-[500px] border-b border-gray-300 dark:border-green-500 mb-4 p-4">
          {typedText}
          {isTyping && (
            <span className="animate-pulse text-gray-800 dark:text-green-500 ml-1">
              |
            </span>
          )}
        </div>
        <form onSubmit={handleCommand} className="flex items-center">
          <span className="text-gray-800 dark:text-green-500 mr-2">$</span>
          <input
            type="text"
            ref={inputRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter your command here"
            className="bg-transparent text-gray-800 dark:text-green-500 outline-none w-full placeholder-gray-500 dark:placeholder-green-400"
          />
        </form>
      </div>
    </div>
  );
}
