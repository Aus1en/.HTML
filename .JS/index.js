const htmlElement = document.querySelector('html');
const bDirIMG = htmlElement.getAttribute('dirimg');
const navRocket = document.querySelector('header img.rocket')
const headerImg = document.querySelector('header img');
const adImg = document.querySelector('.imgAD');
const ad2Img = document.querySelector('.imgAD2');
const ad3Img = document.querySelector('.imgAD3');
const fmImg = document.querySelector('.imgFM');
const mcImg = document.querySelector('.imgMC');
const adiImg = document.querySelector('.imgADI');
const igImg = document.querySelector('.imgIG');
const avImg = document.querySelector('.imgAV');
const siImg = document.querySelector('.imgSI');
const si2Img = document.querySelector('.imgSI2');
const si3Img = document.querySelector('.imgSI3');
const geImg = document.querySelector('.imgGE');
const weImg = document.querySelector('.imgWE');
const abImg = document.querySelector('.imgAB');
const ab2Img = document.querySelector('.imgAB2');
const rlImg = document.querySelector('.imgRL');
const asImg = document.querySelector('.imgAS');
const icolink = document.querySelector('link[rel="icon"]');
const icoshortLink = document.querySelector('link[rel="shortcut icon"]');
const dashboard = document.querySelector('.dashboard');
const btnGroups = document.querySelectorAll(".btnDash, .btnNav, .btnLink");
const btnOptions = document.querySelectorAll(".btnCmd")
const canvas = document.getElementById("canvasHeader");
const ctx = canvas.getContext("2d");
const header = document.querySelector("header");
const cirElements = document.querySelectorAll('.cir[data-popover]');
const cirStructure = document.querySelector('.cirPara');
const popover = document.createElement('div');
const runButton = document.getElementById("btnRun");
const lgxRun = document.getElementById("lgxRun");
const lgxRunning = document.getElementById("lgxRunning");
const lgxPACS = document.getElementById("lgxPACS");
const lgxCarrots = document.querySelectorAll(".lgxCarrots, .brCarrots");
const headerHeight = header.clientHeight;
canvas.width = header.clientWidth; 
canvas.height = headerHeight;
popover.className = 'popover';
document.body.appendChild(popover);

let offsetX = 0;
let offsetY = 0;
let startX = 0;
let startY = 0;
let startWidth = 0;
let startHeight = 0;
let isDragging = false;
let isResizing = false;
let activeElement = null;
let resizeHandle = null;

// Set the REFs to the images
icolink.href = `${bDirIMG}PACS.ico`;
icoshortLink.href = `${bDirIMG}PACS.ico`;
navRocket.src = `${bDirIMG}Rocket.png`;
headerImg.src = `${bDirIMG}PACSBlacksmall.png`;
adImg.src = `${bDirIMG}AD.png`;
ad2Img.src = `${bDirIMG}AD.png`;
ad3Img.src = `${bDirIMG}AD.png`;
fmImg.src = `${bDirIMG}FM.png`;
mcImg.src = `${bDirIMG}McMc.png`;
adiImg.src = `${bDirIMG}ADI.png`;
igImg.src = `${bDirIMG}IU.png`;
avImg.src = `${bDirIMG}AV.png`;
siImg.src = `${bDirIMG}SI.png`;
si2Img.src = `${bDirIMG}SI.png`;
si3Img.src = `${bDirIMG}SI.png`;
geImg.src = `${bDirIMG}GE.png`;
weImg.src = `${bDirIMG}WE.png`;
abImg.src = `${bDirIMG}AB.png`;
ab2Img.src = `${bDirIMG}AB.png`;
rlImg.src = `${bDirIMG}RL.png`;
asImg.src = `${bDirIMG}AS.png`;

//Circle creation for canvas on header
class Circle {
  constructor(x, y, radius, dx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.dx;
    if (this.x > canvas.width + this.radius) {
      this.x = -this.radius;
    }}
}

const circles = [
  new Circle(25, 50, 10, 2),
  new Circle(5, 20, 20, 1),
  new Circle(50, 5, 20, 3),
];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const circle of circles) {
    circle.update();
    circle.draw();
  }
  requestAnimationFrame(animate);
}
animate();

btnGroups.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const id = button.getAttribute("id")
    const sectionId = button.getAttribute("data-sect");
    showSection(sectionId, id)
  });
});

btnOptions.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const id = button.getAttribute("id")
    const sectionId = button.getAttribute("data-sect");
    showOption(sectionId, id)
  });
});

function showSection(sectionId, id) {
  const btnID = document.getElementById(id);
  const section = document.querySelector(`.${sectionId}`);

  document.querySelectorAll(".btnNav, .btnDash").forEach(btn => {
    if (btn.className === "btnNav") {
      btn.style.backgroundColor = "transparent";
      btn.style.color = "#ffffff";
    } else {
      btn.style.backgroundColor = "#f2f2f2";
    }
  });

  if (section) {
    // Reset z-index and visibility for all sections
    document.querySelectorAll(".mainStructure > div").forEach(sec => {
      sec.style.zIndex = "0";
    });

    // Display the selected section
    section.style.zIndex = "1";

    if (btnID) {
      if (btnID.className === "btnLink") {
      } else {
        btnID.style.backgroundColor = "#AEE2FC";
      }
      if (btnID.className === "btnNav") {
        btnID.style.color = "#000000";
      }
      showOption();
    }
  }
}

function showOption(sectionId, id) {
  const btnID = document.getElementById(id);
  const section = document.querySelector(`.${sectionId}`);

  document.querySelectorAll(".btnCmd").forEach(btn => {
    btn.style.backgroundColor = "#ffffff";
  });

  document.querySelectorAll(".cStructure > div, .cPre").forEach(sec => {
    sec.style.display = "none";
  });

  if (section) {
    // Reset z-index and visibility for all sections
    document.querySelectorAll(".cStructure > div, .cPre").forEach(sec => {
      sec.style.zIndex = "0";
    });

    // Display the selected section
    section.style.display = "block";
    section.style.zIndex = "1";

    if (btnID) {
        btnID.style.backgroundColor = "#AEE2FC";
      }    
    } else {
      document.querySelectorAll(".cStructure > div, .cPre").forEach(sec => {
        sec.style.display = "none";
      });
    }
}

// Array of section IDs to hide initially (excluding 'sectHome')
const sectionsToHide = ['sectPerformance', 'sectAbility', 
                        'sectCost', 'sectSafety', 'sectTurnkey', 
                        'sectUpgrade', 'sectFabrication', 'sectSCADA', 
                        'sectHMI', 'sectWeb', 'sectDatabase', 'sectPLC', 
                        'sectForms', 'sectPortal', 'sectContact'];

// Show home section on startup
showSection('sectHome', 'btnHome');
hideOtherSections();
// Attach an event listener to the "Show Home Section" button
document.getElementById('btnHome').addEventListener('click', () => {
  showSection('sectHome', 'btnHome');
});

// Function to hide all other sections
function hideOtherSections() {
  sectionsToHide.forEach(sectionId => {
    const section = document.querySelector(`.${sectionId}`);
    if (section) {
      section.style.display = 'none';
    }
  });
}

// Ladder logic run/stop from home section.
// Define a Map to store previous background colors
let isGreen = false;
const previousColors = new Map();

// Add a click event listener to the "Run It" button
runButton.addEventListener("click", function () {
  // Toggle the background color of lgxCarrots between green and transparent
  if (isGreen) {
    lgxCarrots.forEach(carrot => {
      const previousColor = previousColors.get(carrot);
      if (previousColor) {
        carrot.style.backgroundColor = previousColor;
      }
    });
    isGreen = false;
    runButton.style.backgroundColor = "#ffffff";
  } else {
    lgxCarrots.forEach(carrot => {
      previousColors.set(carrot, getComputedStyle(carrot).backgroundColor);
      carrot.style.backgroundColor = "#84ffa9";
    });
    isGreen = true;
    runButton.style.backgroundColor = "#AEE2FC";
  }
});

// Add hover effects to lgxCarrots
lgxCarrots.forEach(carrot => {
  carrot.addEventListener("mouseenter", function () {
    if (!isGreen) {
      previousColors.set(carrot, getComputedStyle(carrot).backgroundColor);
      carrot.style.backgroundColor = "#ffbe81";
    }
  });

  carrot.addEventListener("mouseleave", function () {
    if (!isGreen) {
      const previousColor = previousColors.get(carrot);
      if (previousColor) {
        carrot.style.backgroundColor = previousColor;
      }
    }
  });
});

//OEE Hover Popups
cirElements.forEach(cirElement => {
  cirElement.addEventListener('mouseenter', () => {
    const popoverContent = cirElement.getAttribute('data-popover');
    popover.textContent = popoverContent;

    // Position the popover above the cir element
    const rect = cirStructure.getBoundingClientRect();
    popover.style.top = rect.top + 15 + 'px';
    popover.style.left = rect.left + 'px';

    popover.style.display = 'block';
  });

  cirElement.addEventListener('mouseleave', () => {
    popover.style.display = 'none';
  });
});

//Email submition code for contacting.
// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const messageInput = document.getElementById('message');

  // Function to validate the form on submission
  function validateForm(event) {
      event.preventDefault(); // Prevent the default form submission

      // Check if the name field is not empty
      if (nameInput.value.trim() === '') {
          alert('Please enter your name.');
          nameInput.focus();
          return;
      }

      // Check if the email is valid using a simple regular expression
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
          alert('Please enter a valid email address.');
          emailInput.focus();
          return;
      }

      // Submit the form
      alert('Form submitted successfully!');
      form.reset();
  }
  // Attach the form submission event listener
  form.addEventListener('submit', validateForm);
});