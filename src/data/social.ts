import { FaGithub, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa6";
import type { IconType } from "react-icons";

export interface SocialLink {
  /** react-icons component, rendered at a size the bar controls. */
  icon: IconType;
  href: string;
  /** Accessible name — also used as the hover tooltip. */
  label: string;
  /** Phone uses a tel: link and must stay in the same tab. */
  external?: boolean;
}

/**
 * The social row in the top-right of the desktop.
 *
 * Add or remove entries freely — the bar renders whatever is in this array. Every href
 * below is a placeholder.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: FaPhone,
    label: "Phone",
    href: "tel:+910000000000", // TODO: replace with real phone number
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "#", // TODO: add LinkedIn URL
    external: true,
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "#", // TODO: add GitHub URL
    external: true,
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "#", // TODO: add Instagram URL
    external: true,
  },
];
