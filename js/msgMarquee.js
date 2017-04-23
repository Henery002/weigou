var time, speed = 50, iliHeight = 22, delay = 3000, delay1 = 1600, timer, iliHeight1 = 24;
area = document.getElementById("rollingMsg");
area.scrollTop = 0;
area.innerHTML += area.innerHTML;
function startScroll() {
    time = setInterval("scrollUp()", speed);
    area.scrollTop++
}
function scrollUp() {
    0 == area.scrollTop % iliHeight ? (clearInterval(time), setTimeout(startScroll, delay)) : (area.scrollTop++, area.scrollTop >= area.scrollHeight / 2 && (area.scrollTop = 0))
}
setTimeout(startScroll, delay);

/*实时信息*/
area1 = document.getElementById("timesNotice");
area1.scrollTop = 0;
area1.innerHTML += area1.innerHTML;
function startScroll1() {
    timer = setInterval("scrollUp1()", speed);
    area1.scrollTop++
}
function scrollUp1() {
    0 == area1.scrollTop % iliHeight1 ? (clearInterval(timer), setTimeout(startScroll1, delay)) : (area1.scrollTop++, area1.scrollTop >= area1.scrollHeight / 2 && (area1.scrollTop = 0))
}
setTimeout(startScroll1, delay1);






