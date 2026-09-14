"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "error" | "success" | "info";

interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  showError: (title: string, message?: string) => void;
  showSuccess: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION = 4200;

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type: ToastType, title: string, message?: string) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev.slice(-3), { id, type, title, message }]);
      window.setTimeout(() => dismiss(id), TOAST_DURATION);
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      showError: (title, message) => push("error", title, message),
      showSuccess: (title, message) => push("success", title, message),
      showInfo: (title, message) => push("info", title, message),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast stack */}
      <div
        className="pointer-events-none fixed bottom-4 left-4 z-[120] flex w-full max-w-xs flex-col items-start gap-3 sm:max-w-sm sm:bottom-6 sm:left-6"
        aria-live="polite"
        aria-atomic="false"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: -16, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto relative w-full overflow-hidden rounded-2xl border bg-black/95 px-4 py-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:px-5"
              style={{
                borderColor:
                  toast.type === "success"
                    ? "rgb(236 72 153 / 0.85)"
                    : toast.type === "error"
                      ? "rgba(244,114,182,0.9)"
                      : "rgba(255,255,255,0.15)",
                boxShadow:
                  "0 16px 40px rgba(0,0,0,0.9), 0 0 28px rgba(236,72,153,0.18)",
              }}
              role={toast.type === "error" ? "alert" : "status"}
            >
              {/* top accent line */}
              <div
                className="absolute left-0 right-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(236,72,153,0.7), transparent)",
                }}
              />

              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background:
                      toast.type === "success"
                        ? "rgba(236,72,153,0.18)"
                        : toast.type === "error"
                          ? "rgba(244,114,182,0.16)"
                          : "rgba(255,255,255,0.08)",
                  }}
                >
                  {toast.type === "success" ? (
                    <svg className="h-4 w-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : toast.type === "error" ? (
                    <svg className="h-4 w-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-[var(--font-bebas-neue)] text-base uppercase leading-none tracking-widest text-white sm:text-lg">
                    {toast.title}
                  </p>
                  {toast.message && (
                    <p className="mt-1.5 text-xs leading-relaxed text-white/70 sm:text-sm">
                      {toast.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  aria-label="Dismiss notification"
                  className="cursor-pointer rounded-md p-1 text-white/40 transition hover:text-white/90"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}