import { createSignal, onCleanup, type Component } from "solid-js";
import {
  createMediaQuery,
  makeMediaQueryListener,
} from "@solid-primitives/media";
import { css } from "../styled-system/css";

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

  const [oneDisplay, setOneDisplay] = createSignal<Display>("full");
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

  const cycleTwoDisplay = () => {
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
  };

  return (
    <div
      class={css({
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: {
          _portrait: {
            base: "90vh 10vh",
          },
          _landscape: {
            base: "3vh 94vh 3vh",
          },
        },
        gridTemplateColumns: {
          _portrait: "100vw",
          _landscape: "3vw 27vw 40vw 27vw 3vw",
        },
      })}
    >
      <div
        data-display={oneDisplay()}
        class={css({
          gridRow: {
            _portrait: "1 / 2",
            _landscape: "2 / 3",
          },
          gridColumn: {
            _portrait: "1 / 2",
            _landscape: "2 / 3",
          },
          "&[data-display=closed]": {
            height: "10vh",
          },
          "&[data-display=full]": {
            height: "40vh",
          },
          transition: "height 300ms ease",
          backgroundColor: "blue.400",
          padding: "2",
          overflow: "hidden",
          borderRadius: "sm",
        })}
      >
        <div
          onClick={cycleOneDisplay}
          class={css({
            display: "flex",
            flexDirection: "column",
            height: "100%",
          })}
        >
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
      </div>
      <div
        data-display={twoDisplay()}
        onClick={cycleTwoDisplay}
        class={css({
          gridRow: {
            _portrait: "1 / 3",
            _landscape: "2 / 3",
          },
          "&[data-display=closed]": {
            height: "10vh",
          },
          "&[data-display=half]": {
            _portrait: {
              height: "40vh",
            },
            _landscape: {
              height: "60vh",
            },
          },
          "&[data-display=full]": {
            height: "100vh",
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
        })}
      >
        <div
          class={css({
            display: "flex",
            flexDirection: "column",
            height: "100%",
          })}
        >
          <h1 class={css({ fontSize: "2xl", fontWeight: "light" })}>Two</h1>
          <h2 class={css({ color: "white" })}>State: {twoDisplay()}</h2>
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
          backgroundColor: "yellow.400",
          gridRow: {
            _portrait: "1 / 2",
            _landscape: "2 / 3",
          },
          gridColumn: {
            _portrait: "1 / 2",
            _landscape: "4 / 5",
          },
          height: "min-content",
          width: "min-content",
          padding: "2",
          justifySelf: "end",
          alignSelf: "end",
          zIndex: "-1",
          borderRadius: "sm",
        })}
      >
        <h1 class={css({ fontSize: "2xl", fontWeight: "light" })}>Three</h1>
      </div>
    </div>
  );
};

export default App;
