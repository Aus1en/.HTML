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
const widgets = document.querySelectorAll('.widget');
const resizerEast = document.querySelectorAll('.resizer-se');
const resizerWest = document.querySelectorAll('.resizer-sw');
const resizers = document.querySelectorAll('.resizer');
const btnGroups = document.querySelectorAll(".btnDash, .btnNav, .btnLink");
const btnOptions = document.querySelectorAll(".btnCmd")
const canvas = document.getElementById("canvasHeader");
const ctx = canvas.getContext("2d");
const header = document.querySelector("header");
const cirElements = document.querySelectorAll('.cir[data-popover]');
const cirStructure = document.querySelector('.cirPara');
const popover = document.createElement('div');
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
    console.log("Mapped section ID:", sectionId);
    showSection(sectionId, id)
  });
});

btnOptions.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const id = button.getAttribute("id")
    const sectionId = button.getAttribute("data-sect");
    console.log("Mapped section ID:", sectionId);
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

// Show sectHome on startup
showSection("sectHome");

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



widgets.forEach(widget => {
  widget.addEventListener('mousedown', (event) => {
    isDragging = true;
    activeElement = widget;
    startX = event.clientX - widget.offsetLeft; // Calculate the offset from the left edge of the widget
    startY = event.clientY - widget.offsetTop;  // Calculate the offset from the top edge of the widget

    activeElement.classList.add('dragging'); // Add the dragging class
    event.preventDefault();
  });
});

resizers.forEach(resizer => {
  resizer.addEventListener('mousedown', (event) => {
    activeElement = resizer.parentElement;
    startLeft = activeElement.offsetLeft;
    startTop = activeElement.offsetTop;
    startWidth = activeElement.offsetWidth;
    startHeight = activeElement.offsetHeight;
    startX = event.clientX;
    startY = event.clientY;
    resizeHandle = resizer;
    isResizing = true;
    event.stopPropagation();
    event.preventDefault();
  });
});

document.addEventListener('mousemove', (event) => {
  if (isDragging && activeElement && !isResizing) {
    const maxX = dashboard.offsetWidth - activeElement.offsetWidth;
    const maxY = dashboard.offsetHeight - activeElement.offsetHeight;
    const newX = event.clientX - startX;
    const newY = event.clientY - startY;

    activeElement.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
    activeElement.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
  }

  if (isResizing && activeElement) {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    let newWidth = startWidth + (resizeHandle.classList.contains('resizer-se') ? deltaX : -deltaX);
    let newHeight = startHeight + deltaY;

    newWidth = Math.max(50, newWidth);
    newHeight = Math.max(50, newHeight);

    activeElement.style.width = newWidth + 'px';
    activeElement.style.height = newHeight + 'px';
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  isResizing = false;
  activeElement = null;

  widgets.forEach(widget => {
    widget.classList.remove('dragging'); // Remove the dragging class
  });
});

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

// Function to show the modal popup
function showPopup() {
    document.getElementById("popup-container").style.display = "block";
}

// Function to close the modal popup
function closePopup() {
    document.getElementById("popup-container").style.display = "none";
}

// Check if a success message element exists
const successMessage = document.getElementById("success-message");
if (successMessage) {
    showPopup();
}

// Close the popup when the "Close" button is clicked
document.getElementById("close-popup").addEventListener("click", closePopup);