import type { Metadata } from "next";
import StaticPage from "@/app/components/StaticPage";
export const metadata: Metadata = { title: "Privacy policy" };
export default function Page() {
  return (<StaticPage title="Privacy policy"><p>ToolMitra does not require an account. Calculator inputs, images and QR text are processed in your browser and are not uploaded to our servers.</p><h2>Cookies and advertising</h2><p>We may use Google AdSense to show ads. Google and its partners may use cookies to serve ads based on your visits to this and other sites. You can manage ad personalisation at Google Ad Settings.</p><h2>Analytics</h2><p>We may use privacy-respecting analytics to understand which pages are useful.</p><h2>Contact</h2><p>Questions about this policy can be sent to the email on our Contact page. Review this text with a professional before launch.</p></StaticPage>);
}
