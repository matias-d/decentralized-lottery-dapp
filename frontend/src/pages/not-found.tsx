import { Dot, Frown } from "lucide-react";
import Button from "../components/ui/button";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="h-screen w-full flex-col gap-y-6 max-container padding-container flex items-center justify-center py-4">
      <Frown className="size-16 text-text" />
      <h1 className="font-bold text-4xl text-text flex items-center">
        404 <Dot className="size-12" />{" "}
        <span className="text-title">PAGE NOT FOUND</span>
      </h1>
      <div>
        <Button className="px-6" asChild>
          <Link to="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
