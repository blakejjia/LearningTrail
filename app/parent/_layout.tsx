import { Slot, usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function ParentLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const isFirstVisit = useRef(true);

  useEffect(() => {
    // 确保不会在 password-gate 页面再次跳转
    // TODO:加回来
    //   if (pathname !== "/parent/password-gate" && isFirstVisit.current) {
    //     isFirstVisit.current = false;
    //     router.replace({
    //       pathname: "/parent/password-gate",
    //       params: { redirectTo: pathname },
    //     });
    //   }
  }, [pathname]);

  return <Slot screenOptions={{ headerShown: false }} />;
}
