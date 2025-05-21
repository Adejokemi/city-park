"use client";

import dynamic from "next/dynamic";

const BookNowForm = dynamic(() => import("./components/BookNow"), {
  ssr: false,
});

export default function BookPage() {
  return (
    <>
      <BookNowForm/>
    </>
  );
}
