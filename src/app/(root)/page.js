"use client";

import { ImPlus } from "react-icons/im";

import Link from "next/link";

import { useLiveQuery } from "dexie-react-hooks";

import { db, login } from "../../utils/db";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { PiPencil } from "react-icons/pi";

import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  )
}

function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const manage = searchParams.has("manage");

  const users = useLiveQuery(() => db.users.toArray());
  const loginWithUser = async (username) => {
    await login(username);
  };

  return (
    <div className="flex items-center m-auto justify-center h-[100vh] flex-col gap-7">
      <p className="font-normal text-5xl">Who&apos;s Watching?</p>
      <div className="flex gap-7 items-center">
        {users?.map((user) => (
          <div
            key={user.username}
            className="profileblock flex flex-col items-center gap-4"
          >
            <div>
              <Link
                href={manage ? `/editprofile?user=${user.username}` : "/browse"}
              >
                {manage ? (
                  <div className="bg-[#1818189c] absolute w-[150px] h-[150px] flex items-center justify-center">
                    <PiPencil className="text-2xl" />
                  </div>
                ) : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatarUrl}
                  width={150}
                  height={150}
                  alt="empty"
                  onClick={() => loginWithUser(user.username)}
                />
              </Link>
            </div>
            <p className="text-[#6D6D6D]">{user.username}</p>
          </div>
        ))}
        <Link href="/newprofile">
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl h-[150px] w-[150px] flex">
              <div className="bg-[#7f7f7f] rounded-full m-auto text-[#181818] w-[110px] aspect-square flex items-center justify-center text-6xl">
                <ImPlus />
              </div>
            </div>
            <p className="text-[#6D6D6D]">Add Profile</p>
          </div>
        </Link>
      </div>
      <div>
        {manage ? (
          <button
            className="bg-white text-[#181818] px-6 py-1 text-base font-medium"
            type="submit"
            onClick={() => {
              router.push("/");
            }}
          >
            Done
          </button>
        ) : (
          <button
            className="bg-[#181818] text-[#676667] px-6 py-1 border-[1px] border-[#676667] text-base font-medium"
            onClick={() => {
              router.push("/?manage=true");
            }}
          >
            MANAGE PROFILES
          </button>
        )}
      </div>
    </div>
  );
}
