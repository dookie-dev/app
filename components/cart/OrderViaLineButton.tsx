"use client";

import { CartItem } from "@/types";

export default function OrderViaLineButton({ cart }: { cart: CartItem[] }) {
  const handleOrder = async () => {
    if (!cart || cart.length === 0) {
      alert("กรุณาเลือกสินค้าก่อนสั่งซื้อ");
      return;
    }

    let msg = "🍪 สั่งซื้อคุกกี้จากเว็บไซต์\n\n📦 รายการสินค้า:\n";
    let total = 0;

    cart.forEach((item) => {
      const sum = item.price * item.quantity;
      total += sum;
      msg += `- ${item.name} x${item.quantity} = ${sum}฿\n`;
    });

    msg += `\n💰 ราคารวม: ${total}฿\n\nขอบคุณค่า 💕`;

    // Strict URL construction for Auto-Text
    // Using strict OA Message URL scheme
    const url =
      "https://line.me/R/oaMessage/@531abdxp/?" + encodeURIComponent(msg);

    console.log("Debug LINE URL:", url);

    // 🔥 CRITICAL FIX: Robust navigation handling
    try {
      if (window.top && window.top !== window) {
        window.top.location.href = url;
      } else {
        window.location.href = url;
      }
    } catch (e) {
      console.warn("Navigation blocked", e);
      window.location.href = url;
    }
  };

  return (
    <button
      type="button"
      onClick={handleOrder}
      className="w-full rounded-full bg-[#06C755] hover:bg-[#05b64d] px-4 py-3.5 text-white font-bold text-lg shadow-soft flex items-center justify-center gap-2 transition-transform active:scale-95"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-white"
      >
        <path d="M20.24,11.83C20.24,6.48,15.77,2.15,10.27,2.15C4.77,2.15,0.3,6.48,0.3,11.83C0.3,16.59,3.87,20.57,8.37,21.31C8.7,21.43,8.77,21.52,8.74,21.78C8.71,22.09,8.55,23.3,8.5,23.63C8.42,24,8.81,24.22,9.15,23.97C9.15,23.97,14,20.57,14,20.57C17.65,19.5,20.24,15.96,20.24,11.83Z" />
      </svg>
      Order via LINE
    </button>
  );
}
