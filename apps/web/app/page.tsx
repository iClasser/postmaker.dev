import { Suspense } from "react";
import "./page.module.css";
import TabContents from "./tabs";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TabContents />
    </Suspense>
  );
}
