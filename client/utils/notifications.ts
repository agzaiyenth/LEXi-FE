// This notification util file was created to make the work easier when using Burnt toasts and alerts in the application.
// Documentation: https://github.com/nandorojo/burnt

import * as Burnt from "burnt";

type ToastPreset = "done" | "error" | "none" | "custom";
type AlertPreset = "done" | "error" | "heart" | "custom";
type Haptic = "none" | "success" | "warning" | "error";
type Position = "top" | "bottom";

interface Layout {
  iconSize: {
    height: number;
    width: number;
  };
}

interface Icon {
  ios: {
    name: string; // SF Symbol name
    color: string; // Required for Burnt
  };
  web?: JSX.Element; // Updated type to ensure compatibility with Burnt
}

interface ToastOptions {
  title: string; // Required
  message?: string;
  preset?: ToastPreset;
  haptic?: Haptic;
  duration?: number;
  shouldDismissByDrag?: boolean;
  from?: Position;
  layout?: Layout;
  icon?: Icon;
}

interface AlertOptions {
  title: string; // Required
  message?: string;
  preset?: AlertPreset;
  duration?: number;
  layout?: Layout;
  icon?: Icon;
}

// Toast notification function
export const showToast = async ({
  title,
  message = "",
  preset = "done",
  haptic = "none",
  duration = 2,
  shouldDismissByDrag = true,
  from = "top",
  layout,
  icon,
}: ToastOptions): Promise<void> => {
  await Burnt.toast({
    title,
    message,
    preset,
    haptic,
    duration,
    shouldDismissByDrag,
    from,
    layout,
    icon: icon as any, // Cast `icon` to `any` to ensure compatibility
  });
};

// Alert notification function
export const showAlert = async ({
  title,
  message = "",
  preset = "done",
  duration = 2,
  layout,
  icon,
}: AlertOptions): Promise<void> => {
  await Burnt.alert({
    title,
    message,
    preset,
    duration,
    layout,
    icon: icon as any, // Cast `icon` to `any` to ensure compatibility
  });
};

// Dismiss all alerts
export const dismissAll = (): void => {
  Burnt.dismissAllAlerts();
};
