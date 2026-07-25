import { useLocation } from "@tanstack/react-router";

const useMatchesRoute = ({
  target,
}: {
  target: { to: string }[];
}) => {
  const { pathname } = useLocation();
  return target.map((t) => ({
    ...t,
    isMatch:
      pathname === t.to || pathname.startsWith(`${t.to}/`),
  }));
};

export { useMatchesRoute };
