import Link from "next/link";

import styles from "@/app/styles/Footer.module.css";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={`${styles.footer} ${className}`}>
      <p>© 2025 Weather Sense.</p>
      <div>
        <Link href="https://www.adambatstone.dev">
          <span className="sr-only">Visit the portfolio of developer, Adam Batstone. </span>Batstone Development
        </Link>
      </div>
    </footer>
  );
}
