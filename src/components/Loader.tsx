import { useEffect, useState } from "react";

interface OwnProps {
  isShort?: boolean;
  isBlack?: boolean;
}

const Loader: React.FC<OwnProps> = ({ isShort, isBlack }) => {
  const [count, setCount] = useState(1);
  const [showColdStartMessage, setShowColdStartMessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev % 3) + 1);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const dots = "∘ ".repeat(count).trim();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowColdStartMessage(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col grow justify-center items-center">
      <div
        className={`text-xl font-bold ${!isBlack && "dark:text-white"} grid grid-cols-1 gap-6 text-center`}
      >
        {!isShort && <div>Loading</div>}
        <div>{dots} ( °ヮ° )</div>
        {showColdStartMessage && (
          <div className="animate-fadeInUp">
            💤 Waking up the server from its nap... hang tight!
          </div>
        )}
      </div>
    </div>
  );
};
export default Loader;
