import type { Component } from "solid-js";
import { css } from "../styled-system/css";

const App: Component = () => {
  return (
    <div
      class={css({
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: {
          _portrait: {
            base:  "30vh 30vh 30vh 10vh",
            md:   "repeat(3, 33.33vh)"
          },
          _landscape: {
            base:  "45vh 45vh 10vh",
            md:   "repeat(3, 33.33vh)"
          }
        },
        gridTemplateColumns: {
          _portrait: {
            base: "100vw",
            md: "repeat(3, 33.33vw)"
          },
          _landscape: {
            base: "repeat(3, 33.33vw)" 
          }
        },
      })}
    >
      <div
        class={css({
          backgroundColor: "blue.400",
          gridRow: { base: "1 / 1" },
          gridColumn: { base: "1 / 1" },
          padding: "3",
        })}
      >
        <div
          class={css({
            display: "flex",
            flexDirection: "column",
            height: "100%",
          })}
        >
          <h1 class={css({ fontSize: "2xl", fontWeight: "light" })}>One</h1>
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
          backgroundColor: "red.400",
          gridRow: { base: "2 / 2" },
          gridColumn: {
            _portrait: {
              base: "1 / 1",
              md: "2 / 2"
            },
            _landscape: {
              base: "3 / 3"
            }
          },
          padding: "3",
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
          gridRow: { base: "3 / 3" },
          gridColumn: {
            _portrait: {
              base: "1 / 1",
              md: "3 / 3"
            },
            _landscape: {
              base: "3 / 3"
            }
          },
          height: "min-content",
          width: "min-content",
          padding: "3",
          justifySelf: "end",
          alignSelf: "end",
        })}
      >
        <h1 class={css({ fontSize: "2xl", fontWeight: "light" })}>Three</h1>
      </div>
    </div>
  );
};

export default App;
