import type { Metadata } from "next";
import StaticPage from "@/app/components/StaticPage";

export const metadata: Metadata = {
  title: "About ToolMitra",
  description:
    "ToolMitra offers free, fast online tools for everyday and business use in India. No sign-up, runs in your browser, built for mobile.",
};

export default function Page() {
  return (
    <StaticPage title="About ToolMitra">
      <p>
        ToolMitra offers free, fast online tools for everyday and business use
        in India. Every tool runs in your browser, needs no sign-up, and is
        built to be clear and easy on a phone.
      </p>

      <h2>Why ToolMitra exists</h2>
      <p>
        "Mitra" means friend, and that is the idea. Many online calculators and
        converters are cluttered with pop-ups, forced log-ins, and confusing
        results. We wanted tools that give you the answer quickly, show how it
        was worked out, and respect your time.
      </p>

      <h2>What you can do here</h2>
      <p>
        Our tools cover common needs for individuals, students, freelancers, and
        small businesses, such as:
      </p>
      <ul>
        <li>Financial calculators (EMI, SIP, interest, and similar)</li>
        <li>Tax and GST-related calculations</li>
        <li>Unit, date, and number converters</li>
        <li>Text, image, and document utilities</li>
        <li>Everyday helpers for work, study, and home</li>
      </ul>

      <h2>Our approach</h2>
      <p>
        We build one tool at a time, test the maths, and explain how each result
        is calculated.
      </p>
      <ul>
        <li>
          <strong>Accuracy first:</strong> formulas are checked against
          standard methods and sample cases before a tool goes live.
        </li>
        <li>
          <strong>Transparent results:</strong> where it helps, we show the
          formula or steps behind the answer.
        </li>
        <li>
          <strong>Simple and fast:</strong> lightweight pages that load quickly,
          even on slower mobile connections.
        </li>
        <li>
          <strong>Made for India:</strong> rupee formatting, Indian number
          system (lakh and crore), and use cases that matter locally.
        </li>
      </ul>

      <h2>Privacy and your data</h2>
      <p>
        Tools run directly in your browser. What you type into a calculator or
        converter is processed on your device and is not stored on our servers.
        You never need to create an account to use ToolMitra. For full details,
        see our Privacy Policy.
      </p>

      <h2>Free to use</h2>
      <p>
        ToolMitra is free for everyone. We may show ads or offer optional
        features in future to cover running costs, but the core tools will stay
        accessible without sign-up.
      </p>

      <h2>A note on accuracy</h2>
      <p>
        Our tools are designed to give reliable estimates and calculations, but
        results are for general information only. For important financial, tax,
        or legal decisions, please confirm with a qualified professional or the
        relevant official source.
      </p>

      <h2>Feedback and suggestions</h2>
      <p>
        Found a mistake, or want a tool we have not built yet? We would love to
        hear from you. Visit our Contact page to send a suggestion or report an
        issue. Many of our tools started as requests from users like you.
      </p>
    </StaticPage>
  );
}