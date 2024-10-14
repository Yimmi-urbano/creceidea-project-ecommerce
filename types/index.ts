import { SVGProps } from "react";
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface SocialLink {
  _id: string;
  title: string;
  icon: string;
  url: string;
  is_active: boolean;
}

export interface IconOption {
  key: string;
  value: string;
}
