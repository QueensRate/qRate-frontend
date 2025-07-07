
import { useEffect, useState } from "react";

const words = ["Course!", "Experience!", "Professor!", "Elective!"];

const TypingHeadline = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting && text === currentWord) {
      setTimeout(() => setIsDeleting(true), 1000);
      return;
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);
      setText(updatedText);
      setSpeed(isDeleting ? 100 : 150);
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  return (
    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
      Find the Perfect{" "}
      <span className="text-yellow-400">{text}</span>
      <span className="animate-blink text-yellow-400">|</span>
    </h1>
  );
};

export default TypingHeadline;
