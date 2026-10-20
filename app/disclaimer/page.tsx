import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
export const metadata: Metadata = { title: "Disclaimer" };
export default function Page() {
  return (<StaticPage title="Disclaimer"><p>Results are estimates for general information and are not tax, legal, accounting or financial advice. Check important figures with a qualified professional or your bank before acting on them.</p></StaticPage>);
}
