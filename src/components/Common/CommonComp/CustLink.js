import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const active = {
  backgroundColor: "white",
};

const CustLink = ({ content, url, ...restProps }) => {
  const { logoutUser } = restProps;
  const router = useRouter();
  return (
    <div
      className="bg-slate-200 hover:bg-white text-lg font-bold py-2 px-3"
      style={router.pathname === url ? active : null}
    >
      <Link href={url}>
        <a onClick={logoutUser ? logoutUser : () => {}}>{content}</a>
      </Link>
    </div>
  );
};

export default CustLink;
