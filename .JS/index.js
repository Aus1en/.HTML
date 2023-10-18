window.onload = function () {
  document.body.style.transform = 'scale(1)';
};
document.addEventListener('DOMContentLoaded', () => {
const header = document.querySelector("header");
const navEnterprise = document.querySelector('header img.Enterprise')
const headerImg = document.querySelector('header img');
const htmlElement = document.querySelector('html');
const bDirIMG = htmlElement.getAttribute('dirimg');
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
const btnGroups = document.querySelectorAll(".btnCmd, .btnDash, .btnHead, .btnLink");
//const btnOptions = document.querySelectorAll(".btnCmd");
const canvas = document.getElementById("canvasHeader");
const ctx = canvas.getContext("2d");
const cirElements = document.querySelectorAll('.fntCir[data-popover]');
const cirStructure = document.querySelector('.cirStructure');
const popover = document.createElement('div');
const runButton = document.getElementById("btnRun");
const homeButton = document.getElementById("btnHome");
const cntctButton = document.getElementById("btnContact");
const engButton = document.getElementById("dshTurnkey");
const desButton = document.getElementById("dshSCADA");
const proButton = document.getElementById("dshPLC");
const porButton = document.getElementById("dshPortal");
const forButton = document.getElementById("dshDraft");
const lgxCarrots = document.querySelectorAll(".lgxCarrots, .brCarrots");
const headerHeight = header.clientHeight;
canvas.width = header.clientWidth; 
canvas.height = headerHeight;
popover.className = 'popover';
document.body.appendChild(popover);
const artist = document.getElementById("drawingCanvas");

let isDrawing = false;

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
navEnterprise.src = `${bDirIMG}Enterprise.png`;
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
  new Circle(0, 10, 8, 1),
  new Circle(5, 26, 13, .6),
  new Circle(5, 23, 20, .2),
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

$(document).ready(function() {
  $('.fntCir').hover(function() {
    var cirColor = $(this).css('background-color');
    
    // Change the background color of all sections
    $('.section').css('background-color', cirColor);
  }, function() {
    // On hover out, reset the background color of all sections to the default
    //$('.section').css('background-color', 'white');
  });
  $('#btnRun').click(function() {
    var cirColor = $('#btnRun').css('background-color');

    // Change the background color of all sections
    $('.section').css('background-color', cirColor);
  });
});

btnGroups.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const id = button.getAttribute("id")
    const sectionId = button.getAttribute("data-sect");
    if (sectionId.charAt(0) != "c") {
      hideSections(sectionId);
      showSection(sectionId, id);
    }
    showOption(sectionId, id); 
  });
});

function showSection(sectionId, id) {
  const btnID = document.getElementById(id);
  const section = document.querySelector(`.${sectionId}`);

  document.querySelectorAll(".btnDash, .btnCmd").forEach(btn => {
    //if (btn.className === "btnCmd") {
    btn.style.backgroundColor = "#f2f2f280";
    btn.style.color = "#000000";
  });
    if (section) {
      // Reset z-index and visibility for all sections
      document.querySelectorAll(".flxMain > div, .cStructure").forEach(sec => {
        sec.style.zIndex = "0";
        sec.style.display= "none";
      });

      // Display the selected section
      section.style.zIndex = "1";
      section.style.display = "flex";

      if (btnID) {
        if (btnID.className === "btnLink") {
          btnID.style.backgroundColor = "transparent"
          if (btnID.id === "lnkEngine") {
            engButton.style.backgroundColor ="#AEE2FC";
          } else if (btnID.id === "lnkDesign") {
            desButton.style.backgroundColor ="#AEE2FC";
          } else if (btnID.id === "lnkProgramming") {
            proButton.style.backgroundColor ="#AEE2FC";
          } else if (btnID.id === "lnkPortal") {
            porButton.style.backgroundColor ="#AEE2FC";
          } else if (btnID.id === "lnkPreForm" || btnID.id === "lnkpgForm" || btnID.id === "lnkHelp") {
            forButton.style.backgroundColor ="#AEE2FC";
          } else if (btnID.id === "lnkContact" || btnID.id === "lnkContact2" || btnID.id === "lnkContact3") {
            cntctButton.style.backgroundColor ="#AEE2FC";
            cntctButton.style.color = "#000000";
          } else if (btnID.id === "lnkCase1" || btnID.id === "lnkCase2" || btnID.id === "lnkCase3") {
          }
     
          showOption();  

        } else if (btnID.className === "btnHead") {
          if (btnID.id === "btnEye") {
            homeButton.style.backgroundColor = "#AEE2FC";
            homeButton.style.color = "#000000";
          } else {
            cntctButton.style.backgroundColor = "#AEE2FC";
            cntctButton.style.color = "#000000";
          }
        } else {
          btnID.style.backgroundColor = "#AEE2FC";
        }
      }
  }
}

function showOption(sectionId, id) {
  const btnID = document.getElementById(id);
  const section = document.querySelector(`.${sectionId}`);

  document.querySelectorAll(".btnCmd").forEach(btn => {
    btn.style.backgroundColor = "#f2f2f280";
  });

  // Reset z-index and visibility for all sections
  document.querySelectorAll(".cStructure, .cForm").forEach(sec => {
    sec.style.display = "none";
    sec.style.zIndex = "0";
  });

  if (section) {
    // Display the selected section
    section.style.display = "flex";
    section.style.zIndex = "1";

    if (btnID) {
      if (btnID.className != "btnLink") {
        btnID.style.backgroundColor = "#AEE2FC";
      }    
    } else {
      document.querySelectorAll(".cStructure, .cForm").forEach(sec => {
      sec.style.display = "none";
    });
  }
}
}

// Attach an event listener to the "Show Home Section" button
document.getElementById('btnHome').addEventListener('click', () => {
  showSection('sectHome', 'btnHome');
});

// Array of section IDs
const sections = ['sectHome', 'sectPerformance', 'sectAbility', 
                        'sectCost', 'sectSafety', 'sectTurnkey', 
                        'sectUpgrade', 'sectFabrication', 'sectSCADA', 
                        'sectHMI', 'sectWeb', 'sectDatabase', 'sectPLC', 
                        'sectForms', 'sectPortal', 'sectContact'];

// Function to hide all but secthome
function StartHomeSections() {
  sections.forEach(sectionId => {
    const section = document.querySelector(`.${sectionId}`);
    if (sectionId != "sectHome") {
      section.style.display = 'none';
    }
  });
}

// Function to hide all but selected
function hideSections(sectId) {
  sections.forEach(sectionId => {
    const section = document.querySelector(`.${sectionId}`);
    if (sectionId != sectId) {
      section.style.display = 'none';
    }
  });
}

// Show home section on startup
showSection('sectHome', 'btnHome');
StartHomeSections();

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
    runButton.style.backgroundColor = "#f2f2f2";
  } else {
    lgxCarrots.forEach(carrot => {
      previousColors.set(carrot, getComputedStyle(carrot).backgroundColor);
      if (carrot.id != "lgxRun") {
        carrot.style.backgroundColor = "#84ffa9";
      }
    });
    isGreen = true;
    runButton.style.backgroundColor = "#AEE2FC";
  }
});

// Add hover effects to lgxCarrots
lgxCarrots.forEach(carrot => {
  const previousColor = carrot.style.backgroundColor;
  carrot.addEventListener("mouseenter", function () {
    previousColors.set(carrot, getComputedStyle(carrot).backgroundColor);
    carrot.style.backgroundColor = "#ffc880";
  });

  carrot.addEventListener("mouseleave", function () {
      carrot.style.backgroundColor = previousColor;
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

    popover.style.display = 'flex';
    popover.style.backgroundColor = '#f2f2f2';
  });

  cirElement.addEventListener('mouseleave', () => {
    popover.style.display = 'none';
  });
});

// JavaScript code to update the clock
//function updateClock() {
  //const now = new Date();
  //const hours = now.getHours().toString().padStart(2, '0');
  //const minutes = now.getMinutes().toString().padStart(2, '0');
  //const seconds = now.getSeconds().toString().padStart(2, '0');
  //const timeString = `${hours}:${minutes}:${seconds}`;

//  document.getElementById("header-clock").textContent = timeString;
//}

      // Update the clock initially and every second
      //updateClock();
      //setInterval(updateClock, 1000);

//Email submition code for contacting.
// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

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
});