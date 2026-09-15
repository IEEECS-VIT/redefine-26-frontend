"use client";

import { motion, useReducedMotion } from "framer-motion";

export type NotificationType = "success" | "error" | "warning" | "info" | "default";

export interface NotificationAction {
  label: string;
  onClick: () => void;
}

export interface NotificationOptions {
  type?: NotificationType;
  title?: string;
  message?: string;
  /** Milliseconds before auto-dismiss. 0 keeps the notification until dismissed manually. */
  duration?: number;
  action?: NotificationAction;
}

export interface NotificationRecord extends NotificationOptions {
  id: number;
  type: NotificationType;
  duration: number;
}

export const DEFAULT_DURATIONS: Record<NotificationType, number> = {
  success: 3200,
  info: 4200,
  default: 4200,
  warning: 5200,
  error: 6500,
};

// Black + white + pink only. Status is communicated purely by the label.
const TYPE_STYLES: Record<NotificationType, { label: string; labelClass: string }> = {
  success: { label: "Success", labelClass: "text-pink-400" },
  error: { label: "Error", labelClass: "text-rose-400" },
  warning: { label: "Warning", labelClass: "text-pink-200" },
  info: { label: "Info", labelClass: "text-white/70" },
  default: { label: "Notice", labelClass: "text-white/55" },
};

export default function NotificationItem({
  notification,
  onDismiss,
}: {
  notification: NotificationRecord;
  onDismiss: (id: number) => void;
}) {
  const reduceMotion = useReducedMotion();
  const styles = TYPE_STYLES[notification.type];

  return (
    <motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      role={notification.type === "error" ? "alert" : "status"}
      className="pointer-events-auto relative w-full border border-pink-500 bg-black"
    >
      <div className="flex items-start gap-3 py-3.5 pl-4 pr-2.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <span
              className={`font-bebas text-[10px] uppercase leading-none tracking-[0.3em] ${styles.labelClass}`}
            >
              {styles.label}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
          </div>

          {notification.title && (
            <p className="mt-2 font-bebas text-[15px] uppercase leading-none tracking-[0.06em] text-white">
              {notification.title}
            </p>
          )}

          {notification.message && (
            <p className="mt-1.5 text-[13px] leading-snug text-white/65">
              {notification.message}
            </p>
          )}

          {notification.action && (
            <button
              type="button"
              onClick={notification.action.onClick}
              className="mt-3 font-bebas text-[12px] uppercase leading-none tracking-[0.24em] text-pink-400 underline-offset-4 transition-colors hover:text-pink-200 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-400"
            >
              {notification.action.label}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => onDismiss(notification.id)}
          aria-label="Dismiss notification"
          className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center text-white/35 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-400"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            className="h-3.5 w-3.5"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

    </motion.article>
  );
}
