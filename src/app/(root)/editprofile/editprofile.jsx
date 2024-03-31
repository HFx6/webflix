"use client";

import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { db } from "../../../utils/db";

import AvatarChange from "./avatarchange";

import { PiPencil } from "react-icons/pi";

export default function Page() {
  const searchParams = useSearchParams();
  const editprofile = searchParams.get("user");
  const router = useRouter();
  const [profile, setProfile] = useState(false);
  const [changingAvatar, setChangingAvatar] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [username, setUsername] = useState(false);

  async function deleteUser() {
    await db.users.delete(profile.id);
    router.push("/");
  }

  useEffect(() => {
    async function getUserByUsername() {
      var u = await db.users.get({
        username: editprofile,
      });
      setProfile(u);
      setAvatar(u.avatarUrl);
    }
    getUserByUsername();
  }, [editprofile]);

  async function updateUser(e) {
    e.preventDefault();
    await db.users.update(profile.id, { name: username, avatarUrl: avatar });
	router.push("/");
  }

  if (!profile) return null;

  return (
    <>
      {changingAvatar ? (
        <AvatarChange
          profile={profile}
          setAvatar={setAvatar}
          setChangingAvatar={setChangingAvatar}
        />
      ) : null}
      <form onSubmit={updateUser}>
        <div className="flex items-center m-auto justify-center h-[100vh] flex-col gap-7">
          <div className="flex flex-col gap-5">
            <p className="font-normal text-5xl">Edit profile</p>
            <div className="flex gap-5 items-center">
              <div onClick={() => setChangingAvatar(true)}>
                <div className="bg-[#1818189c] absolute w-[100px] h-[100px] flex items-center justify-center">
                  <PiPencil className="text-2xl" />
                </div>
                <Image src={avatar} alt="avatar" width={100} height={100} />
              </div>

              <input
                className={`h-9 w-80 rounded-sm bg-[#676667] text-white placeholder-white p-3 `}
                placeholder="Name"
                value={profile.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <button
                className="bg-[#e50914] text-white px-6 py-1 text-base font-medium"
                type="submit"
              >
                Save
              </button>
              <button className="bg-[#181818] text-[#676667] px-6 py-1 border-[1px] border-[#676667] text-base font-medium">
                Cancel
              </button>
              <button
                className="bg-[#181818] text-[#676667] px-6 py-1 border-[1px] border-[#676667] text-base font-medium"
                onClick={() => deleteUser()}
              >
                Delete profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
