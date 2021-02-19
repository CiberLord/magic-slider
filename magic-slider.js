(function () {


    let m = {};

    let Slider = function () {
        this.currentIndex = 0;//индекс текущего элменета
        this.deltaX = 0;//ширина самого длинного слайла с учетом горизонтального отступа
        this.slides = [];//массив слайдов
        this.viewport = '<div class="magic-viewport"></div>';//то место будут хранится слайдеры
        
        // параметрические свойства
        this.prev = $('<button class="magic-button magic-prev-button">prev</button>');//кнпока назад
        this.next = $('<button class="magic-button magic-next-button">next</button>')//кнопка вперед
        this.infinite=false;
        this.slideToShow=7;//количество которые нужно показать в окне
        this.slideToScroll=1;//на сколько слайдов скролить
    }


    // создание слайдера
    m.create = function (selector, props) {

        

        let s = new Slider();//обьект слайдера

        let maxwidth = 0, maxheight = 0; //слайд с максимальной шириной и высотой
        let querySlides=$(selector).addClass('magic-slider-container').children().addClass('magic-slide').wrapAll(s.viewport).each(function (index, el) {

            //тут идет поиск самого большого слайда без учета маргинов
            let mw = parseFloat($(el).css('width'));
            let mh = parseFloat($(el).css('height'));
            if (mw > maxwidth)
                maxwidth = mw;
            if (mh > maxheight)
                maxheight = mh;
            s.slides.push($(el));
        });

        let itemMarginX = parseFloat(querySlides.css('margin-left'));
        let sliderpaddingX=parseFloat($(selector).css('padding-left'));
        let sliderpaddingY=parseFloat($(selector).css('padding-top'));
        //длина на которую должный смещаться по оси х слайды
        querySlides.css('margin','0px');//обнуление всех маргинов
        s.deltaX = itemMarginX + maxwidth+sliderpaddingX;

        //задание ширины и высоты слайдера как размеры самого большого слайда в контэйнере
        
        $(selector).css({
            'width': s.slideToShow*maxwidth+(s.slideToShow+1)*sliderpaddingX + 'px',
            'height': maxheight+2*sliderpaddingY + 'px'
        }).append(s.prev).append(s.next);
        
        // $('.magic-viewport').css({
        //     'width':maxwidth+'px',
        //     'height':maxheight+'px',
        // });

        //позицинирование слайдов
        let x = 0;
        for (let i = 0; i < s.slides.length; i++) {
            s.slides[i].css('left', x + 'px')
            x += s.deltaX;
        }  

        s.prev.on('click',function(){
            if(!s.infinite){
                
                let countScroll=1;
                let index=s.currentIndex-s.slideToScroll;
                console.log("index="+index)
                if(index>0){
                    countScroll=s.slideToScroll
                    s.currentIndex=index;
                }else{
                    console.log("заработало условие")
                    countScroll=s.slideToScroll+index;
                    s.currentIndex=0;
                }
                console.log("prev "+s.currentIndex)
                console.log("prev count"+countScroll)
                for(let i=0;i<s.slides.length;i++){
                    s.slides[i].animate({
                        left: parseFloat(s.slides[i].css('left'))+countScroll*s.deltaX
                    },300);
                }   
            }
        })
        s.next.on('click',function(){
            if(!s.infinite){
                let countScroll=1;
                let index=s.currentIndex+s.slideToScroll;
                if(index+s.slideToShow<s.slides.length){
                    countScroll=s.slideToScroll
                    s.currentIndex=index;
                }else{
                    let d=s.currentIndex+s.slideToShow;
                    console.log('сработало условие перехода')
                    console.log("d="+d)
                    countScroll=(s.slides.length-d>0)?s.slides.length-d:0;
                    s.currentIndex=s.slides.length-s.slideToShow;
                }
                console.log("next "+s.currentIndex)
                for(let i=0;i<s.slides.length;i++){
                    s.slides[i].animate({
                        left: parseFloat(s.slides[i].css('left'))-countScroll*s.deltaX
                    },300);
                }
            }
        })


    }

    window.Magic = m;

})();