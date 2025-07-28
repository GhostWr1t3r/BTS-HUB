import React from "react";
import { CONFIG } from "site.config";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const fromYear = +CONFIG.since;
  const yearDisplay = fromYear === currentYear || !fromYear 
    ? currentYear 
    : `${fromYear} - ${currentYear}`;

  const quote = "Built by GhostWr1t3r";

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-2xl mx-auto py-8 px-4 space-y-4">
        
        {/* Copyright */}
        <a
          href={`https://github.com/${CONFIG.profile.github}`}
          target="_blank"
          rel="noreferrer"
          className="block text-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          © {CONFIG.profile.name} {yearDisplay}
        </a>

      </div>
    </footer>
  );
};

export default Footer;
