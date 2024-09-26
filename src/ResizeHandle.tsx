import { css } from "../styled-system/css";

export function ResizeHandle() {
  return (
    <div
      class={css({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      })}
    >
      <div
        class={css({
          backgroundColor: "gray.600",
          height: "7px",
          width: "140px",
          borderRadius: "lg",
        })}
      ></div>
    </div>
  );
}
