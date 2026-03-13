import ColorGuessGame from "./colorGuess";

export const games = [
  {
    id: "color-guess",
    name: "Color Guess",
    description: "Just a random color generator to identify it on an rgb format",
    thumbnail: null,
    isAvailabe: true,
    component: ColorGuessGame
  },
  {
    id: "test01",
    name: "Test Game01",
    description: "This is a test game that does nothing",
    thumbnail: null,
    isAvailabe: false,
    component: ColorGuessGame
  },
  {
    id: "test02",
    name: "Test Game02",
    description: "This is a test game that does nothing",
    thumbnail: null,
    isAvailabe: false,
    component: ColorGuessGame
  }

];