import React from "react";

import { useRouter } from "next/router";

export default function Modal({ children, isOpen }) {
  const router = useRouter();
  const closeModal = (e) => {
    if (e.target.classList.contains("Modal")) {
      router.push("/");
    }
  };
  return (
    <div
      className={`${
        isOpen ? "none" : "flex"
      } absolute top-0 bottom-0 left-0 right-0 items-center justify-center md:justify-start Modal`}
      style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      onClick={closeModal}
    >
      <div className="w-1/2 md:w-full">{children}</div>
    </div>
  );
}
