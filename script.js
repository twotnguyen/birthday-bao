/* ============================================================
   Cho Bảo 🎂 — birthday story logic (vanilla JS, no build)
   ============================================================ */

(function () {
  "use strict";

  var story = document.getElementById("story");
  var confettiLayer = document.getElementById("confetti-layer");

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     Lock screen
     ---------------------------------------------------------- */

  var lockSection = document.getElementById("lock");
  var pinBox = document.getElementById("pin-box");
  var dayInput = document.getElementById("birth-day");
  var monthInput = document.getElementById("birth-month");
  var lockBtn = document.getElementById("lock-btn");
  var lockMsg = document.getElementById("lock-msg");

  var wrongAttempts = 0;
  var unlocked = false;

  function sanitize(value) {
    return value.replace(/\D/g, "").slice(0, 2);
  }

  dayInput.addEventListener("input", function () {
    dayInput.value = sanitize(dayInput.value);
    if (dayInput.value.length === 2) monthInput.focus();
  });

  monthInput.addEventListener("input", function () {
    monthInput.value = sanitize(monthInput.value);
  });

  function setMessage(text, kind) {
    lockMsg.textContent = text;
    lockMsg.className = "lock-msg" + (kind ? " lock-msg--" + kind : "");
  }

  function shakePin() {
    pinBox.classList.remove("shake");
    void pinBox.offsetWidth;
    pinBox.classList.add("shake");
  }

  function submitLock() {
    if (unlocked) return;

    var day = parseInt(dayInput.value, 10);
    var month = parseInt(monthInput.value, 10);

    if (day === 15 && month === 8) {
      unlock();
      return;
    }

    wrongAttempts += 1;
    shakePin();

    if (wrongAttempts === 1) {
      setMessage("Hmm… hình như Bảo quên luôn sinh nhật mình rồi 😭", "error");
    } else if (wrongAttempts === 2) {
      setMessage("Sai rồi nha, thử nhớ lại xem 👀", "error");
    } else {
      setMessage("Bảo ơi… cái này bắt đầu đáng lo rồi đó 💀", "error");
    }

    if (navigator.vibrate) navigator.vibrate(120);
  }

  function unlock() {
    if (unlocked) return;
    unlocked = true;

    dayInput.disabled = true;
    monthInput.disabled = true;
    lockBtn.disabled = true;

    if (wrongAttempts === 0) {
      setMessage("Không tệ, ít nhất vẫn nhớ sinh nhật mình 😌", "success");
    }
    lockBtn.textContent = "Đúng là Bảo rồi 🎉";

    burstConfetti(50, "fall");
    if (navigator.vibrate) navigator.vibrate([60, 40, 80]);

    setTimeout(function () {
      lockSection.classList.add("unlocked");
      story.classList.add("scrollable");
      var hero = document.getElementById("hero");
      if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1000);
  }

  lockBtn.addEventListener("click", submitLock);
  lockBtn.addEventListener("keydown", function (event) {
    if (event.key === "Enter") submitLock();
  });
  dayInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      submitLock();
    } else if (
      event.key === "ArrowRight" &&
      dayInput.selectionStart === dayInput.value.length
    ) {
      monthInput.focus();
    }
  });

  monthInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      submitLock();
    } else if (event.key === "Backspace" && monthInput.value.length === 0) {
      dayInput.focus();
    } else if (event.key === "ArrowLeft" && monthInput.selectionStart === 0) {
      dayInput.focus();
    }
  });

  /* ----------------------------------------------------------
     Confetti
     ---------------------------------------------------------- */

  var CONFETTI_COLORS = [
    "#f9a8d4",
    "#c084fc",
    "#fcd34d",
    "#93c5fd",
    "#86efac",
    "#f87171",
    "#ffffff",
  ];

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function configurePiece(piece, mode) {
    var size = randomBetween(6, 12);
    piece.style.width = size + "px";
    piece.style.height = randomBetween(8, 16) + "px";
    piece.style.background =
      CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.setProperty("--rot", randomBetween(180, 720) + "deg");

    if (mode === "burst") {
      piece.style.left = "50%";
      piece.style.top = "50%";
      var angle = randomBetween(0, Math.PI * 2);
      var dist = randomBetween(100, 360);
      piece.style.setProperty("--x1", Math.cos(angle) * dist + "px");
      piece.style.setProperty("--y1", Math.sin(angle) * dist + "px");
      piece.style.animationDuration = randomBetween(1.1, 2.2) + "s";
      piece.classList.add("confetti--burst");
    } else {
      piece.style.left = randomBetween(0, 100) + "%";
      piece.style.top = "-20px";
      piece.style.setProperty("--dx", randomBetween(-120, 120) + "px");
      piece.style.animationDuration = randomBetween(2.2, 3.8) + "s";
      piece.style.animationDelay = randomBetween(0, 0.4) + "s";
      piece.classList.add("confetti--fall");
    }
  }

  function burstConfetti(count, mode) {
    if (reduceMotion) return;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var piece = document.createElement("div");
      piece.className = "confetti";
      configurePiece(piece, mode);

      var delay = parseFloat(piece.style.animationDelay) || 0;
      var duration = parseFloat(piece.style.animationDuration) || 2.5;
      setTimeout(function (el) {
        el.remove();
      }, (delay + duration + 0.25) * 1000, piece);

      fragment.appendChild(piece);
    }
    confettiLayer.appendChild(fragment);
  }

  /* ----------------------------------------------------------
     Particles
     ---------------------------------------------------------- */

  function createParticles(container, count) {
    if (reduceMotion || !container) return;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var particle = document.createElement("span");
      particle.className = "particle";

      var size = randomBetween(3, 7);
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.left = randomBetween(0, 100) + "%";
      particle.style.bottom = randomBetween(-10, 60) + "%";

      particle.style.setProperty("--dx", randomBetween(-60, 60) + "px");
      particle.style.setProperty("--dy", randomBetween(-160, -40) + "px");
      particle.style.setProperty("--o", randomBetween(0.25, 0.8).toFixed(2));
      particle.style.setProperty("--s", randomBetween(0.6, 1.3).toFixed(2));

      particle.style.animationDuration = randomBetween(7, 16) + "s";
      particle.style.animationDelay = randomBetween(0, 16) * -1 + "s";
      fragment.appendChild(particle);
    }
    container.appendChild(fragment);
  }

  createParticles(document.getElementById("lock-particles"), 16);
  createParticles(document.getElementById("hero-particles"), 18);
  createParticles(document.getElementById("age-particles"), 18);

  var particleContainers = document.querySelectorAll(".particles");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var particleObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("is-paused");
          } else {
            entry.target.classList.add("is-paused");
          }
        });
      },
      { threshold: 0 }
    );

    particleContainers.forEach(function (container) {
      particleObserver.observe(container);
    });
  }

  /* ----------------------------------------------------------
     Reveal on scroll (IntersectionObserver)
     ---------------------------------------------------------- */

  var animatedSections = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );

    animatedSections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    animatedSections.forEach(function (section) {
      section.classList.add("active");
    });
  }

  /* ----------------------------------------------------------
     Final surprise
     ---------------------------------------------------------- */

  var finalSection = document.getElementById("final");
  var surpriseBtn = document.getElementById("surprise-btn");
  var celebrated = false;

  surpriseBtn.addEventListener("click", function () {
    if (celebrated) return;
    celebrated = true;

    surpriseBtn.disabled = true;
    finalSection.classList.add("celebrated");
    burstConfetti(80, "burst");
    createBalloons(finalSection);
    createParticles(document.getElementById("final-particles"), 14);

    if (navigator.vibrate) navigator.vibrate([80, 50, 120, 50, 80]);
  });

  function createBalloons(scope) {
    if (reduceMotion) return;

    var layer = scope.querySelector(".balloons");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "balloons";
      scope.appendChild(layer);
    }

    for (var i = 0; i < 12; i++) {
      var balloon = document.createElement("span");
      balloon.className = "balloon";

      var hue = Math.floor(randomBetween(0, 360));
      balloon.style.background = "hsla(" + hue + ", 85%, 65%, 0.92)";
      balloon.style.left = randomBetween(4, 92) + "%";
      balloon.style.setProperty("--dx", randomBetween(-80, 80) + "px");
      balloon.style.setProperty("--sc", randomBetween(0.7, 1.25).toFixed(2));

      balloon.style.animationDuration = randomBetween(4, 7) + "s";
      balloon.style.animationDelay = randomBetween(0, 1.5) + "s";

      var delay = parseFloat(balloon.style.animationDelay) || 0;
      var duration = parseFloat(balloon.style.animationDuration) || 5;
      setTimeout(function (el) {
        el.remove();
      }, (delay + duration + 0.5) * 1000, balloon);

      layer.appendChild(balloon);
    }
  }
})();