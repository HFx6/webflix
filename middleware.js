import { NextResponse } from "next/server";

const isMobile = true;

const getDeviceType = () => {
  return isMobile ? "mobile" : "desktop";
};

const getLocale = () => {
  const someLogic = true;

  return someLogic ? "en" : "id";
};

const PUBLIC_FILE_PATTERN = /\.(.*)$/;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/flight/_next/image") || // exclude all image requests
    pathname.startsWith("/api") || //  exclude all API routes - Perhaps not wanted?
    pathname.startsWith("/static") || // exclude static files - Perhaps not wanted?
    PUBLIC_FILE_PATTERN.test(pathname) // exclude all files in the public folder
  )
    return NextResponse.next();

  const locale = getLocale();
  const device = getDeviceType();
  const targetPathname = pathname.slice(1);

  const nextPageTarget = `/${locale}/${targetPathname}/${device}`;

  // mutate the target pathname
  req.nextUrl.pathname = nextPageTarget;

  const nextResponse = NextResponse.rewrite(req.nextUrl);

  return nextResponse;
}