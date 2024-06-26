"use client"
import { Button } from "@nextui-org/react";
// import "./test.css"
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

type PropsNavigateButton = {
    size: number,
    to: string
}
export default function NavigateButton(props: PropsNavigateButton) {
  return (
    // <div className="m-0 inline-block relative h-lvh w-lvw bg-black">
      <button className="button-trans relative h-16 w-52 overflow-hidden rounded-lg border border-white bg-white text-center before:-left-5 before:absolute before:h-full before:w-64 before:top-0 before:skew-x-[30deg] before:bg-black before:content-[''] before:transition-transform before:duration-500 before:hover:translate-x-full before:hover:skew-x-[0deg]"
      onClick={() => {window.location.href = props.to}}>
        <span className={`relative mix-blend-difference align-middle w-auto h-auto text-[20px] ${oswald.className} uppercase`}>Đi đến trang!</span>
      </button>
    // </div>
  );
}
