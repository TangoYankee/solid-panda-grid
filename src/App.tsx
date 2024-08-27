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
            base: "5vh 25vh 30vh 35vh 5vh",
          },
          _landscape: {
            base: "10vh 80vh 10vh",
          },
        },
        gridTemplateColumns: {
          _portrait: {
            base: "100vw",
          },
          _landscape: {
            base: "repeat(3, 33.33vw)",
          },
        },
      })}
    >
      <div
        class={css({
          backgroundColor: "blue.400",
          gridRow: {
            _portrait: {
              base: `1 / ${oneDisplay() === "full" ? "3" : "2"}`,
            },
            _landscape: { base: `1 / ${oneDisplay() === "full" ? "3" : "2"}` },
          },
          gridColumn: { base: "1 / 1" },
          padding: "1",
          margin: "1",
          overflow: "hidden",
          borderRadius: "sm",
          height:  `${oneDisplay() === "full" ? "min-content" : "100%"}`,
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
        onClick={cycleTwoDisplay}
        class={css({
          backgroundColor: "red.400",
          gridRow: {
            _portrait: {
              base: `-1 / ${twoDisplay() === "closed" ? "-2" : twoDisplay() === "half" ? "-3" : "-6"}`,
            },
            _landscape: {
              base: `1 / ${twoDisplay() === "closed" ? "2" : "3"}`,
            },
          },
          gridColumn: {
            _portrait: {
              base: "1 / 1",
            },
            _landscape: {
              base: "3 / 3",
            },
          },
          padding: "1",
          margin: "1",
          borderRadius: "sm",
          overflow: "hidden",
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
            _portrait: { base: "4 / 4" },
            _landscape: { base: "3 / 3" },
          },
          gridColumn: {
            _portrait: {
              base: "1 / 1",
            },
            _landscape: {
              base: "3 / 3",
            },
          },
          height: "min-content",
          width: "min-content",
          padding: "1",
          justifySelf: "end",
          alignSelf: "end",
          zIndex: "-1",
          margin: "1",
          borderRadius: "sm",
        })}
      >
        <h1 class={css({ fontSize: "2xl", fontWeight: "light" })}>Three</h1>
      </div>
    </div>
  );
};

export default App;
