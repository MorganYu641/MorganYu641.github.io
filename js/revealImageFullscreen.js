function toggleImgFullscreen(id) {
    var b = document.getElementById(id);
    if (b.style.display === "none") {
        b.style.display = "grid";
    }else {
        b.style.display = "none";
    }
}