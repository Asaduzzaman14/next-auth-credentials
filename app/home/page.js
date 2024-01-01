"use client";

import Link from "next/link";

export default function UserInfo() {
  return (
    <div className='grid place-items-center h-screen'>
      <div className=' '>
        <h2 className='text-2xl '>THIS IS HOME PAGE</h2>

        <Link className='text-sm mt-3 text-right' href={"/"}>
          <span className='underline'>Login</span>
        </Link>
      </div>
    </div>
  );
}
