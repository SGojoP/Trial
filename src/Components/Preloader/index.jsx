import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const loaderScreenRef = useRef(null);
  const loaderRef = useRef(null);
  const welcomeRef = useRef(null);
  const progressRef = useRef(null);
  const counter1Ref = useRef(null);
  const counter2Ref = useRef(null);
  const counter3Ref = useRef(null);

  useEffect(() => {
    if (!counter3Ref.current) return;

    // Populate counter-3
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j.toString();
        counter3Ref.current.appendChild(div);
      }
    }
    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3Ref.current.appendChild(finalDiv);

    function animate(counter, duration, delay = 0) {
      const numHeight = counter.querySelector(".num")?.clientHeight || 0;
      const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;

      return gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    }

    const tl = gsap.timeline();

    // Progress bar animation
    tl.to(progressRef.current, {
      width: "100%",
      duration: 6,
      ease: "power1.inOut",
    });

    // Counter animations
    tl.add(animate(counter3Ref.current, 5), 0);
    tl.add(animate(counter2Ref.current, 6), 0);
    tl.add(animate(counter1Ref.current, 2, 4), 0);

    // Staggered animation for digits
    tl.to(".digit", {
      top: "-150px",
      stagger: {
        amount: 0.25,
      },
      duration: 1,
      ease: "power4.inOut",
    });

    // Expand to 75% of screen
    tl.to(loaderRef.current, {
      width: "75vw",
      height: "75vh",
      duration: 0.75,
      ease: "power2.inOut",
    });

    // Welcome text animation
    tl.to(welcomeRef.current, {
      opacity: 1,
      duration: 0.5,
    })
      .to(".welcome span", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
      .to(".welcome span", {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.3,
        ease: "back.in(1.7)",
        delay: 0.5,
      });

    // Expand to fullscreen
    tl.to(loaderRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      duration: 0.75,
      ease: "power2.inOut",
    });

    // Fade out loader screen
    tl.to(loaderScreenRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.25,
      onComplete: () => {
        if (loaderScreenRef.current) {
          loaderScreenRef.current.style.display = "none";
        }
      },
    });
  }, []);

  return (
    <div className="loader-screen" ref={loaderScreenRef}>
      <div className="loader" ref={loaderRef}>
        <div className="progress-container">
          <div className="progress-bar" ref={progressRef}></div>
        </div>
        <div className="welcome" ref={welcomeRef}>
          <span>W</span>
          <span>E</span>
          <span>L</span>
          <span>C</span>
          <span>O</span>
          <span>M</span>
          <span>E</span>
        </div>
      </div>
      <div className="counter">
        <div className="counter-1 digit" ref={counter1Ref}>
          <div className="num">0</div>
          <div className="num num1offset1">1</div>
        </div>
        <div className="counter-2 digit" ref={counter2Ref}>
          <div className="num">0</div>
          <div className="num num1offset2">1</div>
          <div className="num">2</div>
          <div className="num">3</div>
          <div className="num">4</div>
          <div className="num">5</div>
          <div className="num">6</div>
          <div className="num">7</div>
          <div className="num">8</div>
          <div className="num">9</div>
          <div className="num">0</div>
        </div>
        <div className="counter-3 digit" ref={counter3Ref}>
          <div className="num">0</div>
          <div className="num">1</div>
          <div className="num">2</div>
          <div className="num">3</div>
          <div className="num">4</div>
          <div className="num">5</div>
          <div className="num">6</div>
          <div className="num">7</div>
          <div className="num">8</div>
          <div className="num">9</div>
        </div>
      </div>
    </div>
  );
}
