import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
export const metadata: Metadata = { title: "Contact us" };
export default function Page() {
  return (<StaticPage title="Contact us"><p>Found a mistake or want a new tool? Email us at <a className="text-brand underline" href="mailto:hello@toolmitra.in">hello@toolmitra.in</a>. Replace this address with your own before launch.</p></StaticPage>);
}
