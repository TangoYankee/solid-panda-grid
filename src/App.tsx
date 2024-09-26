import { createSignal, onCleanup, type Component } from "solid-js";
import {
  createMediaQuery,
  makeMediaQueryListener,
} from "@solid-primitives/media";
import { css } from "../styled-system/css";
import { Atlas } from "./Atlas";
import { ResizeHandle } from "./ResizeHandle";

export type Display = "closed" | "half" | "full";
const App: Component = () => {
  const [isLandscape, setIsLandscape] = createSignal<boolean>(
    createMediaQuery("(orientation: landscape)")(),
  );

  const clearLandscapeListener = makeMediaQueryListener(
    "(orientation: landscape)",
    (e) => {
      setIsLandscape(e.matches);
    },
  );

  onCleanup(clearLandscapeListener);

  const [oneDisplay, setOneDisplay] = createSignal<Display>("closed");
  const [fourDisplay, setFourDisplay] = createSignal<Display>("full");
  const [twoDisplay, setTwoDisplay] = createSignal<Display>("half");

  const cycleOneDisplay = () => {
    if (oneDisplay() === "closed" || oneDisplay() === "half") {
      setOneDisplay("full");
      return;
    }
    if (oneDisplay() === "full") {
      setOneDisplay("closed");
      return;
    }
  };

  const cycleFourDisplay = () => {
    if (fourDisplay() === "closed" || fourDisplay() === "half") {
      setFourDisplay("full");
      return;
    }
    if (fourDisplay() === "full") {
      setFourDisplay("closed");
      return;
    }
  };

  const cycleTwoDisplay = (e: PointerEvent) => {
    e.stopPropagation();
    const { pointerType, target, clientY: initialClientY } = e;
    if (pointerType === "mouse") {
      switch (twoDisplay()) {
        case "closed":
          setTwoDisplay("half");
          break;
        case "half":
          isLandscape() ? setTwoDisplay("closed") : setTwoDisplay("full");
          break;
        case "full":
          setTwoDisplay("closed");
          break;
        default:
          throw new Error(`Invalid two display state: ${twoDisplay()}`);
      }
    } else if (pointerType === "touch" && target !== null) {
      const detectPointerDirection = (e: Event) => {
        if ("clientY" in e === false) throw new Error();
        const { clientY: finalClientY } = e;
        if (typeof finalClientY !== "number") throw new Error();
        switch (twoDisplay()) {
          case "closed":
            if (isLandscape() && initialClientY < finalClientY) {
              setTwoDisplay("half");
            } else if (!isLandscape() && initialClientY > finalClientY) {
              setTwoDisplay("half");
            }
            break;
          case "half":
            if (isLandscape() && initialClientY > finalClientY) {
              setTwoDisplay("closed");
            } else if (!isLandscape()) {
              initialClientY > finalClientY
                ? setTwoDisplay("full")
                : setTwoDisplay("closed");
            }
            break;
          case "full":
            if (isLandscape() && initialClientY > finalClientY) {
              setTwoDisplay("closed");
            } else if (!isLandscape() && initialClientY < finalClientY) {
              setTwoDisplay("half");
            }
            break;
          default:
            throw new Error(`Invalid two display state: ${twoDisplay()}`);
        }
      };
      target.addEventListener("pointermove", detectPointerDirection, {
        once: true,
      });
      setTimeout(() => {
        target.removeEventListener("pointermove", detectPointerDirection);
      }, 300);
    }
  };

  return (
    <div
      class={css({
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: {
          _portrait: {
            base: "90dvh 10dvh",
          },
          _landscape: {
            base: "3dvh 94dvh 3dvh",
          },
        },
        gridTemplateColumns: {
          _portrait: "100dvw",
          _landscape: "3dvw 27dvw 40dvw 27dvw 3dvw",
        },
      })}
    >
      <Atlas
        class={css({
          position: "static",
          gridRow: {
            _portrait: "1 / -2",
            _landscape: "1 / -1",
          },
          gridColumn: "1 / -1",
          zIndex: "0",
        })}
      />
      <div
        class={css({
          gridRow: {
            _portrait: "1 / 2",
            _landscape: "2 / 3",
          },
          gridColumn: {
            _portrait: "1 / 2",
            _landscape: "2 / 3",
          },
          backgroundColor: "gray.400",
          borderRadius: "sm",
          zIndex: "1",
          height: "fit-content",
          maxWidth: { _landscape: "300px" },
        })}
      >
        <div
          data-display={oneDisplay()}
          onClick={cycleOneDisplay}
          class={css({
            display: "flex",
            flexDirection: "column",
            "&[data-display=closed]": {
              height: "5dvh",
            },
            "&[data-display=full]": {
              height: "30dvh",
            },
            backgroundColor: "blue.400",
            transition: "height 300ms ease",
            padding: "2",
            overflow: "clip",
          })}
        >
          <ResizeHandle />
          <h1 class={css({ fontSize: "2xl", fontWeight: "light" })}>One</h1>
          <h2 class={css({ color: "white" })}>State: {oneDisplay()}</h2>
          <p class={css({ overflow: "auto" })}>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Ex penatibus
            efficitur quis feugiat accumsan ultrices. Id pulvinar venenatis
            posuere aliquam maecenas velit. Cras felis viverra eu class
            fermentum vitae torquent. Porttitor donec consequat dolor odio
            pretium facilisi nisi. Enim ac justo erat; auctor lacus et. Tortor
            tellus nostra convallis blandit felis vulputate. Hendrerit ridiculus
            convallis metus vehicula ut tincidunt. Donec turpis et sociosqu,
            torquent mattis interdum volutpat. Libero sociosqu cras convallis
            tincidunt nulla dictum leo. Pellentesque sociosqu elementum felis
            integer lacinia finibus. Tellus donec primis in dictum; lobortis
            aliquam imperdiet arcu a. Et facilisi eleifend etiam nisl sociosqu.
            Litora sem quam turpis nec ultricies himenaeos scelerisque. Nisi
            urna ullamcorper himenaeos viverra libero. Nostra conubia dui lectus
            accumsan nisl est mi posuere. Ullamcorper facilisis ridiculus
            vivamus urna; metus lacus neque.
          </p>
        </div>
        <div
          data-display={fourDisplay()}
          onClick={cycleFourDisplay}
          class={css({
            display: "flex",
            flexDirection: "column",
            "&[data-display=closed]": {
              height: "5dvh",
            },
            "&[data-display=full]": {
              _portrait: {
                height: "60dvh",
              },
              _landscape: {
                height: "64dvh",
              },
            },
            transition: "height 300ms ease",
            backgroundColor: "green.400",
            padding: "2",
            overflow: "clip",
          })}
        >
          <ResizeHandle />
          <h1 class={css({ fontSize: "2xl", fontWeight: "light" })}>Four</h1>
          <h2 class={css({ color: "white" })}>State: {fourDisplay()}</h2>
          <p class={css({ overflow: "auto" })}>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Ex penatibus
            efficitur quis feugiat accumsan ultrices. Id pulvinar venenatis
            posuere aliquam maecenas velit. Cras felis viverra eu class
            fermentum vitae torquent. Porttitor donec consequat dolor odio
            pretium facilisi nisi. Enim ac justo erat; auctor lacus et. Tortor
            tellus nostra convallis blandit felis vulputate. Hendrerit ridiculus
            convallis metus vehicula ut tincidunt. Donec turpis et sociosqu,
            torquent mattis interdum volutpat. Libero sociosqu cras convallis
            tincidunt nulla dictum leo. Pellentesque sociosqu elementum felis
            integer lacinia finibus. Tellus donec primis in dictum; lobortis
            aliquam imperdiet arcu a. Et facilisi eleifend etiam nisl sociosqu.
            Litora sem quam turpis nec ultricies himenaeos scelerisque. Nisi
            urna ullamcorper himenaeos viverra libero. Nostra conubia dui lectus
            accumsan nisl est mi posuere. Ullamcorper facilisis ridiculus
            vivamus urna; metus lacus neque.
          </p>
        </div>
      </div>
      <div
        data-display={twoDisplay()}
        class={css({
          // display: "none",
          gridRow: {
            _portrait: "1 / 3",
            _landscape: "2 / 3",
          },
          "&[data-display=closed]": {
            height: "10dvh",
          },
          "&[data-display=half]": {
            _portrait: {
              height: "35dvh",
            },
            _landscape: {
              height: "60dvh",
            },
          },
          "&[data-display=full]": {
            _portrait: {
              height: "100dvh",
            },
            _landscape: {
              height: "60dvh",
            },
          },
          gridColumn: {
            _portrait: "1 / 2",
            _landscape: "4 / 5",
          },
          transition: "height 300ms ease",
          backgroundColor: "red.400",
          padding: "2",
          borderRadius: "sm",
          overflow: "clip",
          alignSelf: {
            _portrait: "end",
          },
          zIndex: "2",
        })}
      >
        <div
          class={css({
            display: "flex",
            flexDirection: "column",
            height: "100%",
          })}
        >
          <div onPointerDown={cycleTwoDisplay}>
            <ResizeHandle />
            <h1 class={css({ fontSize: "2xl", fontWeight: "light" })}>Two</h1>
            <h2 class={css({ color: "white" })}>State: {twoDisplay()}</h2>
          </div>
          <p class={css({ overflow: "auto" })}>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Ex penatibus
            efficitur quis feugiat accumsan ultrices. Id pulvinar venenatis
            posuere aliquam maecenas velit. Cras felis viverra eu class
            fermentum vitae torquent. Porttitor donec consequat dolor odio
            pretium facilisi nisi. Enim ac justo erat; auctor lacus et. Tortor
            tellus nostra convallis blandit felis vulputate. Hendrerit ridiculus
            convallis metus vehicula ut tincidunt. Donec turpis et sociosqu,
            torquent mattis interdum volutpat. Libero sociosqu cras convallis
            tincidunt nulla dictum leo. Pellentesque sociosqu elementum felis
            integer lacinia finibus. Tellus donec primis in dictum; lobortis
            aliquam imperdiet arcu a. Et facilisi eleifend etiam nisl sociosqu.
            Litora sem quam turpis nec ultricies himenaeos scelerisque. Nisi
            urna ullamcorper himenaeos viverra libero. Nostra conubia dui lectus
            accumsan nisl est mi posuere. Ullamcorper facilisis ridiculus
            vivamus urna; metus lacus neque.
          </p>
        </div>
      </div>
      <div
        class={css({
          backgroundColor: "yellow.400/40",
          gridRow: {
            _portrait: "1 / 2",
            _landscape: "2 / 3",
          },
          gridColumn: {
            _portrait: "1 / 2",
            _landscape: "2 / 3",
          },
          height: "min-content",
          width: "min-content",
          padding: "2",
          alignSelf: "end",
          zIndex: "0",
          borderRadius: "sm",
        })}
      >
        <h1 class={css({ fontSize: "xl", fontWeight: "light" })}>Three</h1>
      </div>
    </div>
  );
};

export default App;
