function showPopup(message) {
    var popup = document.getElementById('popup');
    var popupText = document.getElementById('popupText');
    
    if (popup && popupText) {
        popupText.innerHTML = message;
        popup.style.display = 'flex';
    }
}