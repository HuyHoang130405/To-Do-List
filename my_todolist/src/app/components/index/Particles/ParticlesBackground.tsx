import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      initParticlesEngine(async (engine) => {
        await loadFull(engine);
      }).then(() => setInit(true));
    }, 800);
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: "#0f172a",
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          resize: { enable: true },
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
        },
      },
      particles: {
        color: { value: ["#3b82f6", "#8b5cf6", "#06b6d4"] },
        links: {
          color: "#3b82f6",
          distance: 80,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          outModes: { default: "bounce" },
        },
        number: {
          value: 10,
          density: {
            enable: true,
            width: 800,
            height: 800,
          },
        },
        opacity: { value: 0.5 },
        shape: { type: "square" },
        size: { value: { min: 3, max: 6 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 z-0"
    />
  );
};