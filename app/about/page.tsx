import type { Metadata } from "next";
import StaticPage from "@/app/components/StaticPage";
export const metadata: Metadata = { title: "About ToolMitra" };
export default function Page() {
  return (<StaticPage title="About ToolMitra"><p>ToolMitra offers free, fast online tools for everyday and business use in India. Every tool runs in your browser, needs no sign-up, and is built to be clear and easy on a phone.</p><h2>Our approach</h2><p>We build one tool at a time, test the maths, and explain how each result is calculated.</p></StaticPage>);
}
