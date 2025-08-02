"use client";
import { MainHomeLayout } from "@repo/web-ui/layout";
import { useState } from "react";
import './page.module.css';
import QuizMarkdownEditor from "../components/markdown-editor";
const tabs = [
  {
    key: "markdown",
    label: "Markdown Card",
  },
];

export default function Home() {
  const [tab, setTab] = useState("markdown");

  return (
    <MainHomeLayout tab={tab} tabs={tabs} setTab={setTab}>
      {tab === "markdown" ? <QuizMarkdownEditor /> : null}
    </MainHomeLayout>
  );
}