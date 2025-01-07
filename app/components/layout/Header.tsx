import Image from "next/image";
import Link from "next/link";
import React from "react";
function Header() {
  return (
    <div className="w-full py-12 text-center bg-black text-white text-2xl font-medium flex justify-around items-center align-middle">
      <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      <Link href="/">Home</Link>
      <button>sing in</button>
    </div>
  );
}
export default Header;
