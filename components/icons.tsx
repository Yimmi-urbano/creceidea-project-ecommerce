import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (

<svg  height={size || height}
      
      width={size || width}
      {...props}  viewBox="0 0 390.98 76.79"><defs></defs><g id="Capa_1-2"><g><text className="cls-2" transform="translate(1.7 72.81)"><tspan x="0" y="0">solo necesitas una idea</tspan></text><path className="cls-1" d="M166.4,6.23c-1.28-.69-2.68-.7-3.98,0-.67,.36-1.19,.87-1.55,1.53-.36,.65-.54,1.33-.54,2.03s.18,1.39,.54,2.02c.36,.65,.88,1.16,1.52,1.52,.64,.36,1.32,.54,2.02,.54s1.38-.18,2.02-.54c.65-.36,1.16-.87,1.52-1.52,.36-.64,.54-1.32,.54-2.02s-.19-1.39-.56-2.04c-.38-.66-.9-1.17-1.55-1.52Z"/><path className="cls-3" d="M330.84,18.76c-3.46,0-6.92-.03-10.38,0-5.58,.06-10.08,4.29-10.7,10-.57,5.24,3.16,10.36,8.45,11.53,.89,.2,1.82,.27,2.74,.27,6.65,.02,13.29-.01,19.94,.02,7.3,.04,11.77,7.78,8.11,14.09-1.69,2.93-4.33,4.58-7.71,4.63-6.99,.1-13.99,.11-20.98,0-4.91-.07-8.81-3.98-9.01-8.91-.1-2.65-.7-5.08-2.37-7.16-2.21-2.74-5.09-4.11-8.62-4.19-3.82-.09-6.71-1.85-8.37-5.28-1.66-3.43-1.28-6.8,1.03-9.84,1.83-2.41,4.36-3.54,7.37-3.62,6.18-.16,10.73-4.58,10.89-10.79,.11-4.31,2.72-7.74,6.27-8.93,1-.33,2.09-.53,3.14-.53,6.75-.05,13.49-.04,20.24-.02,4.24,.01,7.81,2.68,9.01,6.66,1.2,3.99-.31,8.18-3.83,10.53-1.53,1.02-3.22,1.54-5.07,1.54-3.39,0-6.77,0-10.16,0h0Z"/><path className="cls-1" d="M390.98,9.71h0c-.15,4.27-3.12,7.82-7.09,8.83-.78,.2-1.58,.25-2.38,.25-.21,0-.41,0-.62,.02-4.64,.26-8.87,3.75-9.92,8.49-.2,.89-.27,1.83-.27,2.74-.02,6.65,.01,13.29-.02,19.94-.04,7.3-7.77,11.77-14.09,8.11-2.93-1.69-4.58-4.33-4.63-7.71-.1-6.99-.11-13.99,0-20.98,.07-4.91,3.98-8.81,8.91-9.01,2.65-.1,5.08-.7,7.16-2.37,2.54-2.04,3.9-4.67,4.15-7.85,.02-.25,.03-.51,.04-.77,.09-3.82,1.85-6.71,5.28-8.37,1.37-.67,2.73-1,4.07-1.02h.06c.69,0,1.37,.07,2.04,.24,.07,.02,.14,.03,.21,.05,.08,.02,.15,.04,.22,.06,1.11,.33,2.2,.9,3.25,1.7,.83,.63,1.5,1.34,2.04,2.13,.05,.07,.1,.14,.14,.22,.09,.14,.18,.29,.26,.44,.75,1.35,1.13,2.89,1.17,4.59,0,.09,0,.19,.01,.28Z"/><g><path className="cls-3" d="M51.7,16.4c-3.18,0-6.08,.98-8.64,2.91-.09-.74-.4-1.38-.94-1.91-1.34-1.33-3.44-1.31-4.75,0-.64,.64-.97,1.43-.97,2.36v26.49c0,.92,.33,1.72,.98,2.37,.66,.64,1.46,.96,2.38,.96s1.69-.32,2.36-.97c.64-.64,.97-1.43,.97-2.36v-13.23c0-2.74,.86-5.11,2.55-7.05,1.7-1.92,3.68-2.86,6.06-2.86,.93,0,1.73-.34,2.35-.99,.67-.64,1.01-1.44,1.01-2.37s-.34-1.73-.99-2.35c-.64-.67-1.44-1.01-2.37-1.01Z"/><path className="cls-3" d="M84.39,21.28h0c-3.26-3.24-7.23-4.88-11.79-4.88-2.26,0-4.45,.45-6.5,1.32-1.99,.84-3.78,2.04-5.32,3.56-3.24,3.24-4.88,7.2-4.88,11.76,0,2.22,.45,4.39,1.33,6.44,.84,1.95,2.03,3.71,3.56,5.24,3.26,3.22,7.23,4.85,11.81,4.85,5.67,0,10.2-1.88,13.48-5.58,.61-.68,.9-1.49,.86-2.4-.05-.92-.42-1.7-1.12-2.33-.69-.59-1.49-.87-2.41-.82-.93,.05-1.71,.42-2.3,1.11-2,2.25-4.78,3.34-8.51,3.34-2.3,0-4.38-.71-6.18-2.1-1.52-1.18-2.61-2.65-3.24-4.39h22.74c.92,0,1.73-.34,2.39-1,.64-.64,.97-1.44,.97-2.36,0-2.25-.44-4.43-1.32-6.47-.84-1.99-2.04-3.77-3.56-5.29Zm-2.39,8.41h-18.84c.63-1.77,1.71-3.28,3.22-4.47,1.81-1.41,3.9-2.13,6.21-2.13s4.37,.72,6.18,2.13c1.52,1.2,2.6,2.71,3.23,4.48Z"/><path className="cls-3" d="M107.87,23.11c3.28,0,5.83,1.32,7.78,4.03,.53,.77,1.26,1.23,2.15,1.36,.96,.21,1.78-.02,2.51-.57,.76-.55,1.22-1.28,1.35-2.13,.05-.22,.08-.43,.08-.64,0-.67-.22-1.32-.64-1.91-3.26-4.55-7.71-6.86-13.22-6.86-4.5,0-8.38,1.64-11.54,4.88-3.18,3.22-4.79,7.17-4.79,11.73s1.61,8.48,4.79,11.7c3.16,3.22,7.05,4.86,11.54,4.86,5.51,0,9.96-2.31,13.21-6.84,.43-.57,.65-1.21,.65-1.89,0-.2-.02-.42-.07-.58-.14-.93-.6-1.67-1.34-2.18-.75-.56-1.7-.76-2.47-.58-.93,.14-1.66,.59-2.19,1.33-1.96,2.74-4.51,4.07-7.79,4.07-2.68,0-4.91-.94-6.81-2.88-1.91-1.96-2.84-4.25-2.84-6.99s.93-5.06,2.83-7.02c1.91-1.94,4.14-2.88,6.82-2.88Z"/><path className="cls-3" d="M152.06,21.28h0c-3.26-3.24-7.23-4.88-11.79-4.88-2.26,0-4.45,.45-6.5,1.32-1.99,.84-3.78,2.04-5.32,3.56-3.24,3.24-4.88,7.2-4.88,11.76,0,2.23,.44,4.4,1.32,6.44,.84,1.95,2.03,3.71,3.56,5.24,3.26,3.22,7.23,4.85,11.82,4.85,5.67,0,10.2-1.88,13.48-5.58,.62-.69,.91-1.5,.86-2.39-.04-.93-.42-1.71-1.12-2.33-.68-.59-1.49-.86-2.41-.82-.93,.05-1.7,.42-2.29,1.11-1.97,2.21-4.83,3.34-8.51,3.34-2.31,0-4.39-.71-6.18-2.1-1.52-1.18-2.61-2.65-3.24-4.39h22.74c.93,0,1.73-.34,2.39-1,.64-.64,.97-1.44,.97-2.36,0-2.24-.45-4.42-1.32-6.47-.84-1.99-2.03-3.77-3.56-5.29Zm-2.39,8.41h-18.84c.63-1.77,1.71-3.28,3.22-4.47,1.82-1.41,3.91-2.13,6.21-2.13s4.37,.72,6.17,2.13c1.52,1.2,2.6,2.7,3.23,4.48Z"/><path className="cls-3" d="M162.07,17.39c-.67,.64-1.01,1.44-1.01,2.37v26.49c0,.93,.34,1.73,1,2.36,.64,.64,1.44,.97,2.36,.97s1.72-.33,2.35-.96c.66-.64,1-1.44,1-2.37V19.76c0-.93-.34-1.72-.98-2.35-1.29-1.33-3.47-1.31-4.72-.02Z"/><path className="cls-3" d="M199.13,6.64c-.64,.64-.97,1.44-.97,2.36v10.62c-2.82-2.14-6.06-3.23-9.65-3.23-4.49,0-8.38,1.64-11.54,4.88-3.18,3.22-4.79,7.17-4.79,11.73s1.61,8.48,4.79,11.7c3.16,3.22,7.05,4.86,11.54,4.86,3.59,0,6.83-1.08,9.65-3.21,.03,.87,.35,1.62,.97,2.24,.64,.64,1.44,.97,2.36,.97s1.72-.33,2.35-.96c.66-.64,1-1.44,1-2.37V9c0-.93-.34-1.72-.99-2.35-1.29-1.33-3.46-1.32-4.73,0Zm-10.62,36.25c-2.68,0-4.91-.94-6.81-2.88-1.91-1.96-2.84-4.25-2.84-6.99s.93-5.06,2.84-7.02c1.91-1.94,4.14-2.88,6.81-2.88s4.91,.94,6.82,2.88c1.91,1.95,2.84,4.23,2.84,6.99v.03c0,2.74-.93,5.03-2.84,6.99-1.91,1.94-4.14,2.88-6.82,2.88Z"/><path className="cls-3" d="M237,21.28h0c-3.26-3.24-7.23-4.88-11.79-4.88-2.26,0-4.45,.45-6.5,1.32-1.99,.84-3.78,2.04-5.32,3.56-3.24,3.24-4.88,7.2-4.88,11.76,0,2.23,.44,4.4,1.32,6.44,.84,1.95,2.03,3.71,3.56,5.24,3.26,3.22,7.23,4.85,11.82,4.85,5.67,0,10.2-1.88,13.48-5.58,.62-.69,.91-1.5,.86-2.39-.04-.93-.42-1.71-1.12-2.33-.68-.59-1.49-.86-2.41-.82-.93,.05-1.7,.42-2.29,1.11-1.97,2.21-4.83,3.34-8.51,3.34-2.31,0-4.39-.71-6.18-2.1-1.52-1.18-2.61-2.65-3.24-4.39h22.74c.93,0,1.73-.34,2.39-1,.64-.64,.97-1.44,.97-2.36,0-2.24-.45-4.42-1.32-6.47-.84-1.99-2.03-3.77-3.56-5.29Zm-2.39,8.41h-18.84c.63-1.77,1.71-3.28,3.22-4.47,1.82-1.41,3.91-2.13,6.21-2.13s4.37,.72,6.17,2.13c1.52,1.2,2.6,2.7,3.23,4.48Z"/><path className="cls-3" d="M276.94,17.4c-.64-.66-1.43-1-2.36-1s-1.73,.34-2.35,.99c-.63,.61-.97,1.35-1,2.22-2.81-2.13-6.04-3.2-9.63-3.2-4.49,0-8.38,1.64-11.54,4.88-3.18,3.22-4.79,7.17-4.79,11.73s1.61,8.48,4.79,11.7c3.16,3.22,7.05,4.86,11.54,4.86,3.59,0,6.82-1.08,9.63-3.2,.03,.87,.37,1.63,.99,2.23,.64,.64,1.44,.97,2.36,.97s1.72-.33,2.36-.97c.64-.64,.97-1.44,.97-2.36V19.76c0-.92-.32-1.71-.96-2.35Zm-15.34,25.49c-2.68,0-4.91-.94-6.81-2.88-1.91-1.96-2.84-4.25-2.84-6.99s.93-5.06,2.83-7.02c1.91-1.94,4.14-2.88,6.82-2.88s4.91,.94,6.81,2.88c1.89,1.96,2.81,4.26,2.81,7.02s-.92,5.03-2.81,6.99c-1.91,1.94-4.13,2.88-6.81,2.88Z"/><path className="cls-3" d="M16.32,23.13c3.28,0,5.82,1.32,7.77,4.02,.53,.76,1.26,1.22,2.15,1.36,.95,.21,1.78-.02,2.51-.57,.76-.54,1.21-1.28,1.35-2.14,.05-.22,.07-.43,.07-.63,0-.67-.22-1.32-.64-1.9-3.26-4.55-7.7-6.85-13.2-6.85-4.49,0-8.37,1.64-11.53,4.88C1.61,24.53,0,28.47,0,33.03s1.61,8.48,4.79,11.69c3.16,3.22,7.04,4.85,11.53,4.85,5.5,0,9.95-2.3,13.19-6.84,.43-.57,.65-1.21,.65-1.89,0-.19-.02-.4-.06-.59-.14-.93-.6-1.66-1.34-2.17-.74-.56-1.7-.76-2.48-.58-.92,.14-1.66,.59-2.18,1.33-1.96,2.73-4.5,4.06-7.78,4.06-2.68,0-4.91-.94-6.81-2.88-1.91-1.96-2.84-4.25-2.84-6.99s.93-5.05,2.84-7.01c1.91-1.94,4.13-2.88,6.81-2.88Z"/></g></g></g></svg>
);

export const DashboardIcon: React.FC<IconSvgProps> = ({ size = 24, ...props }) => (
  <svg height={size} width={size} viewBox="0 0 24 24" {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.25 12L11.2045 3.04545C11.6438 2.60611 12.3562 2.60611 12.7955 3.04545L21.75 12M4.5 9.74995V19.875C4.5 20.4963 5.00368 21 5.625 21H9.75V16.125C9.75 15.5036 10.2537 15 10.875 15H13.125C13.7463 15 14.25 15.5036 14.25 16.125V21H18.375C18.9963 21 19.5 20.4963 19.5 19.875V9.74995M8.25 21H16.5" stroke="#EEEEF0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  </svg>
);

export const CategoriesIcon: React.FC<IconSvgProps> = ({ size = 24, ...props }) => (
  <svg height={size} width={size} viewBox="0 0 24 24" {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 16.875H16.875M16.875 16.875H20.25M16.875 16.875V13.5M16.875 16.875V20.25M6 10.5H8.25C9.49264 10.5 10.5 9.49264 10.5 8.25V6C10.5 4.75736 9.49264 3.75 8.25 3.75H6C4.75736 3.75 3.75 4.75736 3.75 6V8.25C3.75 9.49264 4.75736 10.5 6 10.5ZM6 20.25H8.25C9.49264 20.25 10.5 19.2426 10.5 18V15.75C10.5 14.5074 9.49264 13.5 8.25 13.5H6C4.75736 13.5 3.75 14.5074 3.75 15.75V18C3.75 19.2426 4.75736 20.25 6 20.25ZM15.75 10.5H18C19.2426 10.5 20.25 9.49264 20.25 8.25V6C20.25 4.75736 19.2426 3.75 18 3.75H15.75C14.5074 3.75 13.5 4.75736 13.5 6V8.25C13.5 9.49264 14.5074 10.5 15.75 10.5Z" stroke="#EEEEF0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  </svg>
);

export const PagesIcon: React.FC<IconSvgProps> = ({ size = 24, ...props }) => (
  <svg height={size} width={size} viewBox="0 0 24 24" {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 8.25V6C16.5 4.75736 15.4926 3.75 14.25 3.75H6C4.75736 3.75 3.75 4.75736 3.75 6V14.25C3.75 15.4926 4.75736 16.5 6 16.5H8.25M16.5 8.25H18C19.2426 8.25 20.25 9.25736 20.25 10.5V18C20.25 19.2426 19.2426 20.25 18 20.25H10.5C9.25736 20.25 8.25 19.2426 8.25 18V16.5M16.5 8.25H10.5C9.25736 8.25 8.25 9.25736 8.25 10.5V16.5" stroke="#EEEEF0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  </svg>
);

export const ProductIcon: React.FC<IconSvgProps> = ({ size = 15, ...props }) => (
  <svg height={size} width={size} viewBox="0 0 24 24" {...props}>
    <path d="M12.3779 1.60217C12.1444 1.46594 11.8556 1.46594 11.6221 1.60217L3 6.63172L12 11.8817L21 6.63172L12.3779 1.60217Z" fill="#EEEEF0"/>
    <path d="M21.75 7.93078L12.75 13.1808V22.1808L21.3779 17.1478C21.6083 17.0134 21.75 16.7668 21.75 16.5V7.93078Z" fill="#EEEEF0"/>
    <path d="M11.25 22.1808V13.1808L2.25 7.93078V16.5C2.25 16.7668 2.39168 17.0134 2.6221 17.1478L11.25 22.1808Z" fill="#EEEEF0"/>
  </svg>
);

export const BlogIcon: React.FC<IconSvgProps> = ({ size = 24, ...props }) => (
  <svg height={size} width={size} viewBox="0 0 24 24" {...props}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.75C12.4142 3.75 12.75 4.08579 12.75 4.5V11.25H19.5C19.9142 11.25 20.25 11.5858 20.25 12C20.25 12.4142 19.9142 12.75 19.5 12.75H12.75V19.5C12.75 19.9142 12.4142 20.25 12 20.25C11.5858 20.25 11.25 19.9142 11.25 19.5V12.75H4.5C4.08579 12.75 3.75 12.4142 3.75 12C3.75 11.5858 4.08579 11.25 4.5 11.25H11.25V4.5C11.25 4.08579 11.5858 3.75 12 3.75Z" fill="#EEEEF0"/>
    <path d="M45.626 17.5L42.748 9.15332H42.6865C42.7002 9.34017 42.7161 9.59538 42.7344 9.91895C42.7526 10.2425 42.7686 10.5889 42.7822 10.958C42.7959 11.3271 42.8027 11.6803 42.8027 12.0176V17.5H41.3125V7.50586H43.6162L46.3848 15.4834H46.4258L49.29 7.50586H51.5869V17.5H50.0215V11.9355C50.0215 11.6302 50.026 11.2998 50.0352 10.9443C50.0488 10.5889 50.0625 10.2516 50.0762 9.93262C50.0944 9.61361 50.1081 9.3584 50.1172 9.16699H50.0625L47.0752 17.5H45.626ZM57.0215 9.78906C57.9785 9.78906 58.7008 10.001 59.1885 10.4248C59.6807 10.8486 59.9268 11.5094 59.9268 12.4072V17.5H58.7852L58.4775 16.4268H58.4229C58.2087 16.7002 57.9876 16.9258 57.7598 17.1035C57.5319 17.2812 57.2676 17.4134 56.9668 17.5C56.6706 17.5911 56.3083 17.6367 55.8799 17.6367C55.4287 17.6367 55.0254 17.5547 54.6699 17.3906C54.3145 17.222 54.0342 16.9668 53.8291 16.625C53.624 16.2832 53.5215 15.8503 53.5215 15.3262C53.5215 14.5469 53.8109 13.9613 54.3896 13.5693C54.973 13.1774 55.8525 12.9609 57.0283 12.9199L58.3408 12.8721V12.4756C58.3408 11.9515 58.2178 11.5778 57.9717 11.3545C57.7301 11.1312 57.3883 11.0195 56.9463 11.0195C56.568 11.0195 56.2012 11.0742 55.8457 11.1836C55.4902 11.293 55.1439 11.4274 54.8066 11.5869L54.2871 10.4521C54.6562 10.2562 55.0755 10.0967 55.5449 9.97363C56.0189 9.85059 56.5111 9.78906 57.0215 9.78906ZM58.334 13.8838L57.3564 13.918C56.5544 13.9453 55.9915 14.082 55.668 14.3281C55.3444 14.5742 55.1826 14.9115 55.1826 15.3398C55.1826 15.7135 55.2943 15.987 55.5176 16.1602C55.7409 16.3288 56.0348 16.4131 56.3994 16.4131C56.9554 16.4131 57.4157 16.2559 57.7803 15.9414C58.1494 15.6224 58.334 15.1553 58.334 14.54V13.8838ZM59.2979 6.77441V6.91113C59.1885 7.04329 59.0404 7.2028 58.8535 7.38965C58.6667 7.57194 58.4639 7.76562 58.2451 7.9707C58.0264 8.17122 57.8099 8.36491 57.5957 8.55176C57.3815 8.73405 57.1878 8.889 57.0146 9.0166H55.9414V8.83887C56.0918 8.66569 56.2581 8.45833 56.4404 8.2168C56.6273 7.97526 56.8096 7.72689 56.9873 7.47168C57.1696 7.21647 57.3223 6.98405 57.4453 6.77441H59.2979ZM67.2617 15.3398C67.2617 15.8366 67.141 16.2559 66.8994 16.5977C66.6579 16.9395 66.3047 17.1992 65.8398 17.377C65.3796 17.5501 64.8145 17.6367 64.1445 17.6367C63.6159 17.6367 63.1602 17.598 62.7773 17.5205C62.3991 17.4476 62.0413 17.3337 61.7041 17.1787V15.791C62.0641 15.9596 62.4674 16.1055 62.9141 16.2285C63.3652 16.3516 63.7913 16.4131 64.1924 16.4131C64.721 16.4131 65.1016 16.3311 65.334 16.167C65.5664 15.9984 65.6826 15.7751 65.6826 15.4971C65.6826 15.333 65.6348 15.1872 65.5391 15.0596C65.4479 14.9274 65.2747 14.793 65.0195 14.6562C64.7689 14.515 64.3997 14.3464 63.9121 14.1504C63.4336 13.959 63.0303 13.7676 62.7021 13.5762C62.374 13.3848 62.1257 13.1546 61.957 12.8857C61.7884 12.6123 61.7041 12.2637 61.7041 11.8398C61.7041 11.1699 61.9684 10.6618 62.4971 10.3154C63.0303 9.96452 63.7344 9.78906 64.6094 9.78906C65.0742 9.78906 65.5117 9.83691 65.9219 9.93262C66.3366 10.0238 66.7422 10.1582 67.1387 10.3359L66.6328 11.5459C66.291 11.3955 65.9469 11.2725 65.6006 11.1768C65.2588 11.0765 64.9102 11.0264 64.5547 11.0264C64.14 11.0264 63.8232 11.0902 63.6045 11.2178C63.3903 11.3454 63.2832 11.5277 63.2832 11.7646C63.2832 11.9424 63.3356 12.0928 63.4404 12.2158C63.5452 12.3389 63.7253 12.4619 63.9805 12.585C64.2402 12.708 64.6003 12.8607 65.0605 13.043C65.5117 13.2161 65.9014 13.3984 66.2295 13.5898C66.5622 13.7767 66.8174 14.0068 66.9951 14.2803C67.1729 14.5537 67.2617 14.9069 67.2617 15.3398Z" fill="white"/>
    </svg>
);


export const MiniEyeIcon: React.FC<IconSvgProps> = ({ size = 24, ...props }) => (
  <svg height={size} width={size} viewBox="0 0 20 20" {...props}>
  
    <g clip-path="url(#clip0_950_2834)">
    <path d="M10.2104 12.5C11.5912 12.5 12.7104 11.3807 12.7104 10C12.7104 8.61929 11.5912 7.5 10.2104 7.5C8.82974 7.5 7.71045 8.61929 7.71045 10C7.71045 11.3807 8.82974 12.5 10.2104 12.5Z" fill="#2F9461"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.874704 10.5904C0.727841 10.2087 0.727968 9.78563 0.875059 9.40408C2.31923 5.65788 5.95374 3 10.209 3C14.4664 3 18.1024 5.66051 19.5452 9.40962C19.692 9.79127 19.6919 10.2144 19.5448 10.5959C18.1006 14.3421 14.4661 17 10.2108 17C5.95343 17 2.31742 14.3395 0.874704 10.5904ZM14.2108 10C14.2108 12.2091 12.42 14 10.2108 14C8.00168 14 6.21082 12.2091 6.21082 10C6.21082 7.79086 8.00168 6 10.2108 6C12.42 6 14.2108 7.79086 14.2108 10Z" fill="#2F9461"/>
    </g>
    <defs>
    <clipPath id="clip0_950_2834">
    <rect width="20" height="20" fill="white" transform="translate(0.210449)"/>
    </clipPath>
    </defs>

  </svg>
);

export const MiniTrashIcon: React.FC<IconSvgProps> = ({ size = 24, ...props }) => (
  <svg height={size} width={size} viewBox="0 0 20 20" {...props}>

    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.96045 1C7.44167 1 6.21045 2.23122 6.21045 3.75V4.1927C5.41517 4.26972 4.62647 4.36947 3.84503 4.49129C3.43576 4.5551 3.1557 4.9386 3.21951 5.34787C3.28331 5.75714 3.66682 6.0372 4.07609 5.97339L4.224 5.95062L5.06549 16.4693C5.17983 17.8985 6.37299 19 7.80674 19H12.614C14.0477 19 15.2409 17.8985 15.3552 16.4693L16.1967 5.95055L16.345 5.97339C16.7543 6.0372 17.1378 5.75714 17.2016 5.34787C17.2654 4.9386 16.9854 4.5551 16.5761 4.49129C15.7946 4.36946 15.0058 4.2697 14.2104 4.19268V3.75C14.2104 2.23122 12.9792 1 11.4604 1H8.96045ZM10.2106 4C11.0499 4 11.8835 4.02523 12.7104 4.07499V3.75C12.7104 3.05964 12.1508 2.5 11.4604 2.5H8.96045C8.27009 2.5 7.71045 3.05964 7.71045 3.75V4.075C8.53752 4.02524 9.37113 4 10.2106 4ZM8.78993 7.72002C8.77337 7.30614 8.42443 6.98404 8.01055 7.0006C7.59667 7.01716 7.27457 7.36609 7.29113 7.77998L7.59114 15.28C7.6077 15.6939 7.95663 16.016 8.37052 15.9994C8.7844 15.9828 9.1065 15.6339 9.08994 15.22L8.78993 7.72002ZM13.1299 7.77998C13.1465 7.36609 12.8244 7.01715 12.4105 7.0006C11.9966 6.98404 11.6477 7.30614 11.6311 7.72002L11.3311 15.22C11.3146 15.6339 11.6367 15.9828 12.0506 15.9994C12.4644 16.016 12.8134 15.6939 12.8299 15.28L13.1299 7.77998Z" fill="#F34141"/>
    </svg>

);

export const EyeIcon: React.FC<IconSvgProps> = ({ size = 19, ...props }) => (
  <svg height={size} width={size} fill="none" viewBox="0 0 19 19" {...props}>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.243 10.0035C2.19118 9.84807 2.19114 9.67977 2.24286 9.52429C3.28413 6.39401 6.23693 4.13672 9.71694 4.13672C13.1953 4.13672 16.147 6.39191 17.1896 9.51992C17.2414 9.67537 17.2414 9.84367 17.1897 9.99915C16.1484 13.1294 13.1956 15.3867 9.71563 15.3867C6.23723 15.3867 3.28556 13.1315 2.243 10.0035Z" stroke="#0D0E10" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9663 9.76172C11.9663 11.0044 10.959 12.0117 9.71633 12.0117C8.47369 12.0117 7.46633 11.0044 7.46633 9.76172C7.46633 8.51908 8.47369 7.51172 9.71633 7.51172C10.959 7.51172 11.9663 8.51908 11.9663 9.76172Z" stroke="#0D0E10" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export const DiscordIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const NextUILogo: React.FC<IconSvgProps> = (props) => {
  const { width, height = 40 } = props;

  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 161 32"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-black dark:fill-white"
        d="M55.6827 5V26.6275H53.7794L41.1235 8.51665H40.9563V26.6275H39V5H40.89L53.5911 23.1323H53.7555V5H55.6827ZM67.4831 26.9663C66.1109 27.0019 64.7581 26.6329 63.5903 25.9044C62.4852 25.185 61.6054 24.1633 61.0537 22.9582C60.4354 21.5961 60.1298 20.1106 60.1598 18.6126C60.132 17.1113 60.4375 15.6228 61.0537 14.2563C61.5954 13.0511 62.4525 12.0179 63.5326 11.268C64.6166 10.5379 65.8958 10.16 67.1986 10.1852C68.0611 10.1837 68.9162 10.3468 69.7187 10.666C70.5398 10.9946 71.2829 11.4948 71.8992 12.1337C72.5764 12.8435 73.0985 13.6889 73.4318 14.6152C73.8311 15.7483 74.0226 16.9455 73.9968 18.1479V19.0773H63.2262V17.4194H72.0935C72.1083 16.4456 71.8952 15.4821 71.4714 14.6072C71.083 13.803 70.4874 13.1191 69.7472 12.6272C68.9887 12.1348 68.1022 11.8812 67.2006 11.8987C66.2411 11.8807 65.3005 12.1689 64.5128 12.7223C63.7332 13.2783 63.1083 14.0275 62.6984 14.8978C62.2582 15.8199 62.0314 16.831 62.0352 17.8546V18.8476C62.009 20.0078 62.2354 21.1595 62.6984 22.2217C63.1005 23.1349 63.7564 23.9108 64.5864 24.4554C65.4554 24.9973 66.4621 25.2717 67.4831 25.2448C68.1676 25.2588 68.848 25.1368 69.4859 24.8859C70.0301 24.6666 70.5242 24.3376 70.9382 23.919C71.3183 23.5345 71.6217 23.0799 71.8322 22.5799L73.5995 23.1604C73.3388 23.8697 72.9304 24.5143 72.4019 25.0506C71.8132 25.6529 71.1086 26.1269 70.3314 26.4434C69.4258 26.8068 68.4575 26.9846 67.4831 26.9663V26.9663ZM78.8233 10.4075L82.9655 17.325L87.1076 10.4075H89.2683L84.1008 18.5175L89.2683 26.6275H87.103L82.9608 19.9317L78.8193 26.6275H76.6647L81.7711 18.5169L76.6647 10.4062L78.8233 10.4075ZM99.5142 10.4075V12.0447H91.8413V10.4075H99.5142ZM94.2427 6.52397H96.1148V22.3931C96.086 22.9446 96.2051 23.4938 96.4597 23.9827C96.6652 24.344 96.9805 24.629 97.3589 24.7955C97.7328 24.9548 98.1349 25.0357 98.5407 25.0332C98.7508 25.0359 98.9607 25.02 99.168 24.9857C99.3422 24.954 99.4956 24.9205 99.6283 24.8853L100.026 26.5853C99.8062 26.6672 99.5805 26.7327 99.3511 26.7815C99.0274 26.847 98.6977 26.8771 98.3676 26.8712C97.6854 26.871 97.0119 26.7156 96.3973 26.4166C95.7683 26.1156 95.2317 25.6485 94.8442 25.0647C94.4214 24.4018 94.2097 23.6242 94.2374 22.8363L94.2427 6.52397ZM118.398 5H120.354V19.3204C120.376 20.7052 120.022 22.0697 119.328 23.2649C118.644 24.4235 117.658 25.3698 116.477 26.0001C115.168 26.6879 113.708 27.0311 112.232 26.9978C110.759 27.029 109.302 26.6835 107.996 25.9934C106.815 25.362 105.827 24.4161 105.141 23.2582C104.447 22.0651 104.092 20.7022 104.115 19.319V5H106.08V19.1831C106.061 20.2559 106.324 21.3147 106.843 22.2511C107.349 23.1459 108.094 23.8795 108.992 24.3683C109.993 24.9011 111.111 25.1664 112.242 25.139C113.373 25.1656 114.493 24.9003 115.495 24.3683C116.395 23.8815 117.14 23.1475 117.644 22.2511C118.16 21.3136 118.421 20.2553 118.402 19.1831L118.398 5ZM128 5V26.6275H126.041V5H128Z"
      />
      <path
        className="fill-black dark:fill-white"
        d="M23.5294 0H8.47059C3.79241 0 0 3.79241 0 8.47059V23.5294C0 28.2076 3.79241 32 8.47059 32H23.5294C28.2076 32 32 28.2076 32 23.5294V8.47059C32 3.79241 28.2076 0 23.5294 0Z"
      />
      <path
        className="fill-white dark:fill-black"
        d="M17.5667 9.21729H18.8111V18.2403C18.8255 19.1128 18.6 19.9726 18.159 20.7256C17.7241 21.4555 17.0968 22.0518 16.3458 22.4491C15.5717 22.8683 14.6722 23.0779 13.6473 23.0779C12.627 23.0779 11.7286 22.8672 10.9521 22.4457C10.2007 22.0478 9.5727 21.4518 9.13602 20.7223C8.6948 19.9705 8.4692 19.1118 8.48396 18.2403V9.21729H9.72854V18.1538C9.71656 18.8298 9.88417 19.4968 10.2143 20.0868C10.5362 20.6506 11.0099 21.1129 11.5814 21.421C12.1689 21.7448 12.8576 21.9067 13.6475 21.9067C14.4374 21.9067 15.1272 21.7448 15.7169 21.421C16.2895 21.1142 16.7635 20.6516 17.0844 20.0868C17.4124 19.4961 17.5788 18.8293 17.5667 18.1538V9.21729ZM23.6753 9.21729V22.845H22.4309V9.21729H23.6753Z"
      />
    </svg>
  );
};
