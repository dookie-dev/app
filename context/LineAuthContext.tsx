"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface LineProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
}

interface LineAuthContextType {
  user: LineProfile | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const LineAuthContext = createContext<LineAuthContextType | undefined>(
  undefined,
);

export function LineAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LineProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking session on mount
    const storedUser = localStorage.getItem("dookie-line-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    // MOCK LOGIN IMPLEMENTATION
    // In production, this would initialize LIFF and call liff.login()
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const mockUser: LineProfile = {
        userId: "U1234567890abcdef1234567890abcdef",
        displayName: "Cookie Lover", // Mock Name
        pictureUrl: "https://profile.line-scdn.net/0h...",
      };

      setUser(mockUser);
      localStorage.setItem("dookie-line-user", JSON.stringify(mockUser));
      setIsLoading(false);
      // window.location.reload(); // Optional, refreshing not needed with React state
    }, 800);
  };

  const logout = () => {
    // In production: liff.logout()
    localStorage.removeItem("dookie-line-user");
    setUser(null);
  };

  return (
    <LineAuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </LineAuthContext.Provider>
  );
}

export function useLineAuth() {
  const context = useContext(LineAuthContext);
  if (context === undefined) {
    throw new Error("useLineAuth must be used within a LineAuthProvider");
  }
  return context;
}
