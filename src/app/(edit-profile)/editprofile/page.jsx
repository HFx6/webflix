"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import AvatarsJson from "./avatars.json";

import { HiArrowLeft } from "react-icons/hi";

import { db } from "../../../utils/db";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const profile = searchParams.get("p");

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserByUsername() {
      var u = await db.users.get({
        username: profile,
      });
      setUser(u);
    }
    getUserByUsername();
  }, [profile]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="bg-[#181818e6] pb-6 sticky top-0 z-50">
        <div className="w-full h-[100px] bg-[linear-gradient(180deg,_rgba(0,_0,_0,_1)_0%,_rgba(0,_0,_0,_0.6131244734221813)_35%,_rgba(0,_0,_0,_0)_100%)]"></div>
        <div className="m-auto w-[88%] flex justify-between ">
          <div className="flex items-center gap-[20px]">
            <div className="text-[2vw]">
              <HiArrowLeft size={40} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[2.5vw] font-semibold leading-none">
                Edit profile
              </p>
              <p className="text-[2vw] font-semibold leading-none">
                Choose a profile icon.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[20px]">
            <p className="text-[2vw]">{user.username}</p>

            <Image
              src={user.avatarUrl}
              className="rounded-md"
              width={100}
              height={100}
              alt="empty"
            />
          </div>
        </div>
      </div>
      <div className="m-auto w-[88%] flex flex-col gap-[45px] mb-9">
        {AvatarsJson.map((avatar) => (
          <div key={avatar.title}>
            {avatar.title_image ? (
              <div
                style={{
                  backgroundImage: `url(${avatar.title_image})`,
                  backgroundPositionX: "left",
                  backgroundPositionY: "bottom",
                }}
                className={`[width:inherit] bg-no-repeat bg-contain h-[4vw] max-h-[60px] max-w-[20vw]`}
              />
            ) : (
              <p className="text-4xl font-semibold">{avatar.title}</p>
            )}
            <Carousel
              opts={{
                align: "start",
                loop: "true",
                slidesToScroll: 8,
              }}
              className="w-full mt-[1vw]"
            >
              <CarouselContent className="-ml-3 -mr-[0.8rem]">
                {avatar.avatars.map((icon, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-[12.45%] relative pl-3"
                  >
                    <Image
                      src={icon.icon_image}
                      className="border-transparent rounded-md border-[2px] hover:border-[#fff] cursor-pointer"
                      width={150}
                      height={150}
                      alt="empty"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {avatar.avatars.length > 8 ? (
                <>
                  <CarouselPrevious className="opacity-100" />
                  <CarouselNext className="opacity-100" />
                </>
              ) : null}
            </Carousel>
          </div>
        ))}
      </div>
    </>
  );
}
