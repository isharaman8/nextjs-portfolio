import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Particles from "react-tsparticles"
import {loadFull} from "tsparticles"

function MyApp({ Component, pageProps }: AppProps) {

   const particlesInit = async (main: any) => {
      console.log(main);
      await loadFull(main);
   };
   const particlesLoaded = (container: any):any => {
      console.log(container);	
   }
   return (
      <>
         <Navbar />
         <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
               background: {
                  opacity: 0,

               },
                  fpsLimit: 120,
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
                           resize: true,
                     },
                        modes: {
                           push: {
                              quantity: 4,
                           },
                              repulse: {
                                 distance: 200,
                                    duration: 0.4,
                              },
                        },
                  },
                  particles: {
                     color: {
                        value: "#5c7aff",
                     },
                        links: {
                           color: "#5c7aff",
                              distance: 150,
                              enable: true,
                              opacity:0.4,
                              width: 1,
                        },

                        collisions: {
                           enable: true,
                        },
                        move: {
                           direction: "none",
                              enable: true,
                              outModes: {
                                 default: "bounce",
                              },
                              random: false,
                              speed: 1,
                              straight: false,
                        },
                        number: {
                           density: {
                              enable: true,
                                 area: 1000,
                           },
                              value: 80,
                        },
                        opacity: {
                           value: 0.5
                        },
                        shape: {
                           type: "circle",
                        },
                        size: {
                           value: { min: 1, max: 5 },
                        },
                  },
                  detectRetina: false,
            }}
         />
         <Component {...pageProps} />;
      </>
   );
}

export default MyApp;
