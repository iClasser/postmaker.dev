"use client";
import { MainHomeLayout } from "@repo/web-ui/layout";
import React, { useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "./page.module.css";
import QuizMarkdownEditor from "../components/markdown-editor";
import ChatgptEditor from "../components/chatgpt-editor";
import XEditor from "../components/x-editor";
import NotebookEditor from "../components/notebook-editor";
import GradientEditor from "../components/gradient-editor";
import ProfileEditor from "../components/profile-editor";
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
  {
    key: "gradient",
    label: "Gradient Card",
  },
  {
    key: "x",
    label: "X Card",
  },
  {
    key: "notebook",
    label: "Notebook Card",
  },
  {
    key: "profile",
    label: "Profile Card",
  },
  
];

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentTab = searchParams.get("t") || "markdown";
  
  const setTab = useCallback((newTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("t", newTab);
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  return (
    <MainHomeLayout tab={currentTab} tabs={tabs} setTab={setTab}>
      <CardSizeProvider>
        {currentTab === "markdown" ? <QuizMarkdownEditor /> : null}
        {currentTab === "chatgpt" ? <ChatgptEditor /> : null}
        {currentTab === "gradient" ? <GradientEditor /> : null}
        {currentTab === "x" ? <XEditor /> : null}
        {currentTab === "notebook" ? <NotebookEditor /> : null}
        {currentTab === "profile" ? <ProfileEditor /> : null}
      </CardSizeProvider>
    </MainHomeLayout>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}