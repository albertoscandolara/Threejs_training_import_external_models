// Model informations
export const info = {
  models: [
    {
      title: `Pirate Island - Cargo Bay`,
      author: `YanoClaeys`,
      link: `https://sketchfab.com/3d-models/pirate-island-cargo-bay-a45eb7d3f0c9475cb696b2a8fdfe4c1e`,
    },
  ],
  sounds: [
    {
      title: `Stormy sea`,
      author: `desdur`,
      link: `https://freesound.org/people/desdur/sounds/347707/`,
    },
  ],
};

export const gltfFolderName = "Pirate Island - Cargo Bay";
export const gltfFileName = "scene";

//////////////////////////
//      Nodes names     //
//////////////////////////

// Flags
export const flagsNodeName = "Flags";
export const burgeesNodeName = "Burgees";
export const burgeeNodeName = "Burgee";
export const topFlagNodeName = "Top_flag";

export const seaNodeName = "Sea";
export const sharksNodeName = "Sharks";
export const sharkNodeName = "Shark_";

export const ropesNodeName = "Pending_ropes";
export const ropeNodeName = "Pending_rope_";

export const signboardNodeName = "Signboard";

export const windForce = {
  x: 0.02,
  y: 0.02,
  z: 0.04,
};

// Flags
export const flags = {};

// Sea
export const sea = {
  offset: {
    x: 0,
    y: 0,
    z: 0,
  },
  animation: {
    speed: {
      x: 0,
      y: 1,
      z: 0,
    },
    trajectory: {
      x: (x) => {
        return x;
      },
      y: (x) => {
        return Math.sin(x) * 7;
      },
      z: (x) => {
        return x;
      },
    },
  },
};

// Sharks
export const sharks = {
  prefix: "shark",
  offset: {
    x: 0,
    y: 0,
    z: 550,
  },
  shark1: {
    animation: {
      speed: {
        x: 0.2,
        y: 0.3,
        z: 0.5,
      },
      trajectory: {
        x: (x) => {
          return Math.sin(x) * 1600;
        },
        y: (x) => {
          return Math.cos(x) * 100;
        },
        z: (x) => {
          return Math.sin(x) * Math.cos(x) * 600;
        },
      },
    },
  },

  shark2: {
    animation: {
      speed: {
        x: 1,
        y: 1,
        z: 1,
      },
      trajectory: {
        x: (x) => {
          return Math.sin(x) * 100;
        },
        y: (x) => {
          return Math.cos(x) * 100;
        },
        z: (x) => {
          return Math.sin(x) * 100;
        },
      },
    },
  },

  shark3: {
    animation: {
      speed: {
        x: 1,
        y: 1,
        z: 1,
      },
      trajectory: {
        x: (x) => {
          return Math.sin(x) * 300;
        },
        y: (x) => {
          return Math.cos(x) * 100;
        },
        z: (x) => {
          return Math.sin(x) * Math.cos(x) * 300;
        },
      },
    },
  },
};

// Sea
export const signBoard = {
  offset: {
    x: 0,
    y: 0,
    z: 0,
  },
  animation: {
    speed: {
      x: 1,
      y: 1,
      z: 1,
    },
    trajectory: {
      x: (t) => {
        return Math.sin(t) * 0.01;
      },
      y: (t) => {
        return Math.sin(t) * 0.1;
      },
      z: (t) => {
        return 0;
      },
    },
  },
};

// Sounds
export const stormySeaSoundFileName = "Stormy sea";

// Colors
export const lightBlue = "#d4ebf2";
