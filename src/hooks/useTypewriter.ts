import { useState, useRef, useCallback } from "react";

interface UseTypewriterReturn {
  typedText: string;
  isTyping: boolean;
  startTyping: (newText: string, baseText?: string) => void;
  clearText: () => void;
}

const TYPING_SPEED_MS = 10;

export function useTypewriter(): UseTypewriterReturn {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTypingInterval = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }, []);

  const startTyping = useCallback(
    (newText: string, baseText: string = "") => {
      clearTypingInterval();

      setIsTyping(true);
      let index = 0;

      const typeEffect = () => {
        const hasMoreCharacters = index < newText.length;

        if (hasMoreCharacters) {
          setTypedText(baseText + newText.slice(0, index + 1));
          index++;
        } else {
          clearTypingInterval();
          setIsTyping(false);
        }
      };

      typingIntervalRef.current = setInterval(typeEffect, TYPING_SPEED_MS);
    },
    [clearTypingInterval]
  );

  const clearText = useCallback(() => {
    clearTypingInterval();
    setTypedText("");
    setIsTyping(false);
  }, [clearTypingInterval]);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    clearTypingInterval();
  }, [clearTypingInterval]);

  return {
    typedText,
    isTyping,
    startTyping,
    clearText,
  };
}
