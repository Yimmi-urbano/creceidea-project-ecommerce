"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();
  router.push("/login");
  
  return (
    
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
  
    </section>
  );
}
