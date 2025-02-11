"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [gifUrl, setGifUrl] = useState("/spy-x-family-dance.gif");
  const [yesClicked, setYesClicked] = useState(false);

  // List of GIFs to cycle through when "No" is clicked
  const noGifs = [
    "/gif1.gif",
    "/gif2.gif",
    "/gif3.gif",
    "/gif4.gif",
    "/gif5.gif",
  ];

  const handleNoClick = () => {
    if (noClickCount < 5) {
      setGifUrl(noGifs[noClickCount] || noGifs[noGifs.length - 1]); // Change GIF
    }
    setNoClickCount(noClickCount + 1); // Keep shrinking "No" button
  };

  const handleYesClick = () => {
    setYesClicked(true);
    setGifUrl("/celebration.gif"); // Final happy GIF
  };

  useEffect(() => {
    if (yesClicked) {
      import("./fireworks").then(({ default: startFireworks }) => {
        startFireworks();
      });
    }
  }, [yesClicked]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Fireworks Effect When "Yes" is Clicked */}
      {yesClicked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-10">
          <canvas
            id="fireworksCanvas"
            className="absolute w-full h-full"
          ></canvas>
          <Image
            className="z-10 mt-4"
            src="/celebration.gif"
            alt="Celebration GIF"
            width={300}
            height={300}
            priority
          />
          <h1 className="mt-4 text-center text-4xl font-bold text-white z-10">
            YESSSSSSS! You said YESSSS!!!
          </h1>
        </div>
      )}

      <main className="flex flex-col gap-8 items-center z-20">
        {/* Dynamic GIF */}
        {!yesClicked && (
          <Image
            className="items-center justify-center"
            src={gifUrl}
            alt="Reaction GIF"
            width={200}
            height={200}
            priority
          />
        )}

        {/* Question */}
        {!yesClicked && (
          <h1 className="text-center font-[family-name:var(--font-geist-mono)]">
            Will you be my valentine?
          </h1>
        )}

        {/* Buttons */}
        {!yesClicked && (
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="bg-green-400 text-black font-bold rounded-3xl transition-all duration-500 px-8 py-2"
              onClick={handleYesClick}
            >
              Yes
            </button>

            <button
              type="button"
              className={`bg-red-600 text-black font-bold rounded-3xl transition-all duration-500 ${
                noClickCount >= 5
                  ? "px-2 py-1 text-xs"
                  : `px-${Math.max(2, 8 - noClickCount * 1.5)} py-${Math.max(1, 2 - noClickCount * 0.3)} text-sm`
              }`}
              onClick={handleNoClick}
            >
              No
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
