import { useRouter } from "next/router";
import { useEffect } from "react";

const FourOhFour = () => {
  const router = useRouter();
  useEffect(() => {
    let timer = setTimeout(() => {
      router.push("/");
    }, 8000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="custom404">
      <h1>Sorry, this path does not exist</h1>
      <p>
        Now you must give Magnus a star on his{" "}
        <a
          href="https://github.com/Eckhoff42/Ulauncher-Bluetooth-quick-connect"
          target="_blank"
        >
          Github repo
        </a>
      </p>
      <p>We will redirect you back home in the meantime</p>
    </div>
  );
};

export default FourOhFour;
