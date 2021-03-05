версия 3

Как создать слайдер?
1)задать разметку слайдера в html структуре:
<div class="myslider">
        <div class="myslide-item"></div>
        <div class="myslide-item"></div>
        <div class="myslide-item"></div>
</div>

2) подключить стили:
<link rel="stylesheet" href="magic-slider/magic.css">

3)подключить jquery,затем подключить скрипт слайдера:
<script src="magic-slider/magic-slider.js"></script>

4)в myscript.js задать следующее:
<script>
Magic.create(".myslider",{
    // тут будут находится настройки слайдера
});
</script>

5) все настройки которые можно устанвоить
<script>
Magic.create(".myslider",{
    prevButton: $('<button class="mybutton">')
    nextButton: $('button class="mybuttn"')
    slideToShow: 3 //колчество видимых слайдов
    slideToScroll: 2 //количество перелистований
    hasButton: true //показать кнопки
    dots: true //показать индикатор слайдов
    scroll_bar: false //скрыть скроллбар для слайдов, если ширина индикатора не умещается в ширну слайдера, то автоматически включается скроллбар
    speed: 300 //скоротсь анимации
    breakpoints: [ //
        {
            media:'(max-width: 400px)',
            props:{
                // новые настройки слайдера, можно не указывать
            }, //...другие чекпоинты
        }
    ]
    trackItemclass: "myclassname" //класс ползунка
    scrollTrackclass: "myclassname" //скроллбара
    isTouch: true
});
</script>