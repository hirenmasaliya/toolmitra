import type { Metadata } from "next";
import StaticPage from "@/app/components/StaticPage";
export const metadata: Metadata = { title: "Terms of use" };
export default function Page() {
  return (<StaticPage title="Terms of use"><p>By using ToolMitra you agree to use the tools lawfully and at your own risk. Tools are provided as is, without warranties. We may change or remove tools at any time.</p></StaticPage>);
}
