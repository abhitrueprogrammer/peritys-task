import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="text-center bg-white/10 backdrop-blur-md p-12 rounded-xl shadow-lg border border-gray-600">
        <h1 className="text-6xl font-extrabold text-white mb-8 drop-shadow-lg">
          This is my task for Peritys
        </h1>
        <Link href="/users">
          <Button 
            size="lg" 
            className="  hover:bg-gray-50 transition-transform transform hover:scale-105 duration-300 ease-in-out shadow-2xl"
          >
            Go to Users Page
          </Button>
        </Link>
      </div>
    </main>
  );
}