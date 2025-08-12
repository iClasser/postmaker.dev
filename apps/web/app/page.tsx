"use client";
import { MainHomeLayout } from "@repo/web-ui/layout";
import React, { useState } from "react";
import "./page.module.css";
import QuizMarkdownEditor from "../components/markdown-editor";
import ChatgptEditor from "../components/chatgpt-editor";
import TwitterEditor from "../components/twitter-editor";
import GradientEditor from "../components/gradient-editor";
import { CardSizeProvider } from "@repo/ui/context/CardSizeContext";

const tabs = [
  {
    key: "markdown",
    label: "Markdown Card",
  },
  {
    key: "chatgpt",
    label: "ChatGPT Card",
  },
  // {
  //   key: "gradient",
  //   label: "Gradient Card",
  // },
  {
    key: "twitter",
    label: "Twitter Card",
  }
];

export default function Home() {
  const [tab, setTab] = useState("markdown");

  return (
    <MainHomeLayout tab={tab} tabs={tabs} setTab={setTab}>
      <CardSizeProvider>
        {tab === "markdown" ? <QuizMarkdownEditor /> : null}
        {tab === "chatgpt" ? <ChatgptEditor /> : null}
         {/* {tab === "gradient" ? <GradientEditor /> : null} */}
        {tab === "twitter" ? <TwitterEditor /> : null}
      </CardSizeProvider>
    </MainHomeLayout>
  );
}