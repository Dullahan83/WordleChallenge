import { ComponentPropsWithoutRef } from "react";

type IconProps = {
  width?: string;
  height?: string;
  color: string;
} & ComponentPropsWithoutRef<"button">;

const CloseIcon = ({
  color,
  width = "24px",
  height = "24px",
  ...props
}: IconProps) => {
  return (
    <button {...props}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <rect width="24" height="24" fill="none"></rect>{" "}
          <path
            d="M7 17L16.8995 7.10051"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
          <path
            strokeWidth={2}
            d="M7 7.00001L16.8995 16.8995"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    </button>
  );
};

export default CloseIcon;
