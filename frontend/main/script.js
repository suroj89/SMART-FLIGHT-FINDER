// Navbar Mobile Menu
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

menuBtn.onclick = () => {
    navbar.classList.toggle("active");
};

// Auth Section
const user = JSON.parse(localStorage.getItem("user"));
const authSection = document.getElementById("auth-section");

if (user) {
    authSection.innerHTML = `
        <span class="welcome-text">Hello, ${user.name}</span>
        <button onclick="logout()" class="logout-btn">Sign Out</button>
    `;
} else {
    authSection.innerHTML = `
        <a href="../login_page/login.html" class="signin">Sign In</a>
    `;
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
}

// Class Tabs
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
    });
});

// Dropdown Functions
function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdownMenu");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

function selectTrip(type) {
    const dropbtn = document.getElementById("trip-type");
    dropbtn.innerText = type + " ▼";
    document.getElementById("dropdownMenu").style.display = "none";
}

// Travelers Input Validation
const travelersInput = document.getElementById("travelers");
travelersInput.addEventListener("input", () => {
    let value = travelersInput.value;
    if (value.length > 1) value = value.slice(0, 1);
    if (value === "0") value = "1";
    travelersInput.value = value;
});

// Search Button
document.querySelector(".search-btn").addEventListener("click", () => {
    const from = document.getElementById("from-location").value;
    const to = document.getElementById("to-location").value;
    const checkin = document.getElementById("checkin").value;
    if (from && to && checkin) {
        alert(`Searching flights from ${from} to ${to} on ${checkin}`);
    } else {
        alert("Please fill all required fields");
    }
});

// Flight Box Scroll Animation
const flightBox = document.querySelector(".flight-box");
function revealFlightBox() {
    if (flightBox) {
        const rect = flightBox.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
            flightBox.classList.add("show");
        }
    }
}
window.addEventListener("scroll", revealFlightBox);
window.addEventListener("load", revealFlightBox);

// Travel Images Rotation (3rd Section)
const travelImages = document.querySelector(".travel-images");
if (travelImages) {
    travelImages.addEventListener("click", () => {
        const big = document.querySelector(".big");
        const mid = document.querySelector(".mid");
        const small = document.querySelector(".small");
        
        big.classList.remove("big");
        big.classList.add("mid");
        mid.classList.remove("mid");
        mid.classList.add("small");
        small.classList.remove("small");
        small.classList.add("big");
    });
}

// Feature Cards Hover (4th Section)
document.querySelectorAll('.feature-oval').forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-10px) scale(1.03)';
    });
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'translateY(0) scale(1)';
    });
});

// Minor Lounge Images Swap (5th Section)
const ovalImagesContainer = document.querySelector(".oval-images");
let imagesSwapped = false;
if (ovalImagesContainer) {
    document.querySelectorAll(".oval-images .oval").forEach((oval) => {
        oval.style.transition = "left 0.4s ease, top 0.4s ease, transform 0.3s ease";
    });
    
    ovalImagesContainer.addEventListener("click", () => {
        const img1 = document.querySelector(".img1");
        const img2 = document.querySelector(".img2");
        
        if (!imagesSwapped) {
            img1.style.left = "130px";
            img1.style.top = "50px";
            img1.style.zIndex = "1";
            img2.style.left = "60px";
            img2.style.top = "20px";
            img2.style.zIndex = "2";
            imagesSwapped = true;
        } else {
            img1.style.left = "60px";
            img1.style.top = "20px";
            img1.style.zIndex = "2";
            img2.style.left = "130px";
            img2.style.top = "50px";
            img2.style.zIndex = "1";
            imagesSwapped = false;
        }
        
        img1.style.transform = "scale(1.05)";
        img2.style.transform = "scale(1.05)";
        setTimeout(() => {
            img1.style.transform = "scale(1)";
            img2.style.transform = "scale(1)";
        }, 300);
    });
}

// Travelers Section Pulse (6th Section)
document.querySelectorAll(".travelers-section .oval").forEach((oval) => {
    oval.addEventListener("click", () => {
        oval.style.transform = "scale(1.05)";
        setTimeout(() => {
            oval.style.transform = "scale(1)";
        }, 300);
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
        document.getElementById("dropdownMenu").style.display = "none";
    }
});



// 7th 


document.querySelector(".newsletter-box button").addEventListener("click", async () => {
  const email = document.querySelector(".newsletter-box input").value.trim();

  if (!email) {
    alert("Please enter your email address!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    alert(data.message);
  } catch (error) {
    alert("Something went wrong. Try again later!");
    console.error(error);
  }
});





























// ===== PERFECT LOADER FIX =====

window.addEventListener("load", () => {
  const videoLoader = document.getElementById("loader");
  const spinnerLoader = document.getElementById("spinner-loader");
  const video = document.getElementById("loaderVideo");

  if (!videoLoader || !spinnerLoader) return;

  // ✅ ONLY CHECK THIS (MAIN FIX)
  const isFirstVisit = sessionStorage.getItem("visited") === null;

  if (isFirstVisit) {
    // 🎬 FIRST TIME ONLY → VIDEO
    sessionStorage.setItem("visited", "true");

    videoLoader.style.display = "flex";

    video.play().catch(() => {});

    video.onended = hideVideo;

    setTimeout(hideVideo, 4000);

    function hideVideo() {
      videoLoader.style.opacity = "0";
      setTimeout(() => {
        videoLoader.style.display = "none";
      }, 500);
    }

  } else {
    // 🔄 ALL OTHER CASES → SPINNER ONLY
    spinnerLoader.style.display = "flex";

    setTimeout(() => {
      spinnerLoader.style.display = "none";
    }, 800);

    // 🔥 IMPORTANT: NEVER SHOW VIDEO AGAIN
    videoLoader.style.display = "none";
  }
});