"use client";

import { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Facebook, icons } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Decorative localized clouds/blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-[100px]" />

      <div className="w-full max-w-[420px] bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-10 relative z-10 border border-white/50">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo Icon */}
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center p-3 border border-gray-100">
            <div className="relative w-full h-full">
              <Image
                src="/images/dookie-logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Sign in with email
            </h1>
            <p className="text-sm text-gray-500 max-w-[260px] mx-auto leading-relaxed">
              Make a new doc to bring your words, data, and teams together. For
              free
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 text-xs p-3 rounded-xl text-left">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onValueChange={setEmail}
                startContent={<Mail size={18} className="text-gray-400" />}
                classNames={{
                  inputWrapper:
                    "bg-gray-100/50 border-0 shadow-none hover:bg-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-primary/20 h-12 rounded-xl transition-all",
                  input: "text-gray-800 placeholder:text-gray-400",
                }}
              />

              <div className="space-y-1">
                <Input
                  type={isVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onValueChange={setPassword}
                  startContent={<Lock size={18} className="text-gray-400" />}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeOff className="text-gray-400" size={18} />
                      ) : (
                        <Eye className="text-gray-400" size={18} />
                      )}
                    </button>
                  }
                  classNames={{
                    inputWrapper:
                      "bg-gray-100/50 border-0 shadow-none hover:bg-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-primary/20 h-12 rounded-xl transition-all",
                    input: "text-gray-800 placeholder:text-gray-400",
                  }}
                />
                <div className="flex justify-end pt-1">
                  <Link
                    href="#"
                    className="text-xs text-gray-500 hover:text-brand-primary font-medium tracking-wide"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={loading}
              className="bg-[#1a1a1a] text-white font-medium rounded-xl h-12 shadow-lg hover:bg-black hover:scale-[1.02] transition-all active:scale-[0.98]"
            >
              Get Started
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
