import { useContext, useEffect, useState } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { ThemeContext } from "../theme/ThemeContext";

export default function Parts() {
  const [init, setInit] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });

    return () => {
      setInit(false);
    };
  }, []);

  const particlesLoaded = async (): Promise<void> => {};

  const options: ISourceOptions = {
    background: {
      color: {
        value: theme === "dark" ? "#000" : "#262f5e",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 6,
        },
        repulse: {
          distance: 40,
          duration: 4,
          opacity: 0.5,

          size: 40,
        },
      },
    },
    particles: {
      color: {
        value: theme === "dark" ? "#f59504" : "#fff",
      },
      links: {
        color: theme === "dark" ? "#f59504" : "#fff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        enable: true,
        random: false,
        speed: 1.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 120,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
}
