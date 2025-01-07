import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full bg-black text-white ">
      <div className="flex flex-wrap justify-between px-8 py-12 md:px-16">
        <div className="mb-8 flex max-w-xs flex-col space-y-4 md:mb-0">
          <h2 className="text-2xl font-bold">Report a Stolen Bike</h2>
          <p className="leading-relaxed text-gray-600">
            Help us recover stolen bikes. Report a stolen bike and provide
            details to increase the chances of getting it back.
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <h3 className="mb-2 text-lg font-bold">Get Help</h3>
          <Link
            href="/about"
            className="text-gray-600 transition-colors hover:text-black"
          >
            How to Report a Stolen Bike
          </Link>
          <Link
            href="/features"
            className="text-gray-600 transition-colors hover:text-black"
          >
            Prevention Tips
          </Link>
          <Link
            href="/works"
            className="text-gray-600 transition-colors hover:text-black"
          >
            Success Stories
          </Link>
          <p className="cursor-pointer text-gray-600 transition-colors hover:text-black">
            Contact Us
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <h3 className="mb-2 text-lg font-bold">Resources</h3>
          <p className="cursor-pointer text-gray-600 transition-colors hover:text-black">
            Bike Registration Tips
          </p>
          <p className="cursor-pointer text-gray-600 transition-colors hover:text-black">
            Local Law Enforcement Resources
          </p>
          <p className="cursor-pointer text-gray-600 transition-colors hover:text-black">
            Bike Safety Information
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <h3 className="mb-2 text-lg font-bold">Stay Connected</h3>
          <p className="cursor-pointer text-gray-600 transition-colors hover:text-black">
            Follow Us on Social Media
          </p>
          <p className="cursor-pointer text-gray-600 transition-colors hover:text-black">
            Subscribe to Our Newsletter
          </p>
        </div>
      </div>
      <div className="border-t py-6 text-center">
        <p className="text-gray-600">© 2025, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
