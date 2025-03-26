"use client"; // ✅ Mark as a client component

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/app/store";

export default function PersistProvider({ children }: { children: React.ReactNode }) {
    return <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>;
}
