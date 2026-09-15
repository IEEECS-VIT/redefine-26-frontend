"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence } from "framer-motion";
import NotificationItem, {
  DEFAULT_DURATIONS,
  type NotificationAction,
  type NotificationOptions,
  type NotificationRecord,
  type NotificationType,
} from "@/components/Notifications/NotificationItem";

type ConvenienceOptions = Pick<NotificationOptions, "duration" | "action">;

export interface NotificationContextValue {
  /** Full control: notify({ type, title, message, duration, action }). */
  notify: (options: NotificationOptions) => number;
  dismiss: (id: number) => void;
  success: (title?: string, message?: string, options?: ConvenienceOptions) => number;
  error: (title?: string, message?: string, options?: ConvenienceOptions) => number;
  warning: (title?: string, message?: string, options?: ConvenienceOptions) => number;
  info: (title?: string, message?: string, options?: ConvenienceOptions) => number;
}

const MAX_VISIBLE = 4;

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useToast(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const idRef = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const notify = useCallback(
    (options: NotificationOptions) => {
      const type: NotificationType = options.type ?? "default";
      const duration = options.duration ?? DEFAULT_DURATIONS[type];
      const id = ++idRef.current;

      const record: NotificationRecord = {
        id,
        type,
        title: options.title,
        message: options.message,
        duration,
        action: options.action,
      };

      setNotifications((prev) => [...prev.slice(-(MAX_VISIBLE - 1)), record]);

      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      }

      return id;
    },
    [dismiss],
  );

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((timer) => clearTimeout(timer));
      activeTimers.clear();
    };
  }, []);

  const value = useMemo<NotificationContextValue>(
    () => ({
      notify,
      dismiss,
      success: (title, message, options) =>
        notify({ ...options, type: "success", title, message }),
      error: (title, message, options) =>
        notify({ ...options, type: "error", title, message }),
      warning: (title, message, options) =>
        notify({ ...options, type: "warning", title, message }),
      info: (title, message, options) =>
        notify({ ...options, type: "info", title, message }),
    }),
    [notify, dismiss],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {/* Notification stack — top-left below the header on desktop, full-width on mobile. */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-3 top-[4.75rem] z-[120] flex flex-col-reverse gap-2.5 sm:inset-x-auto sm:left-6 sm:top-24 sm:w-[22rem] min-[900px]:top-[clamp(5.5rem,13vh,7.5rem)]"
      >
        <AnimatePresence initial={false}>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onDismiss={dismiss}
            />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export type { NotificationAction, NotificationOptions, NotificationType };
