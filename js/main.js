$(".slider").slick({
    slidesToShow:5,
    slidesToScroll:5,
    dots:true,
    autoplay:true,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
})



// SLIDER 







const navMenu=document.querySelector(".nav-menu")
const menu=document.querySelector("#header .menu")

navMenu.addEventListener("click",function(){
    menu.classList.toggle("menu-active")
})
//--------------------------//
const header=document.getElementById("header")
window.onscroll=function(){
    if(this.scrollY>100){
        header.classList.add("header-active")
    }
    else{
        header.classList.remove("header-active")
    }
}
//-------------------------//
$(function(){
    var cart=[]
    $.ajax({
        url:"../products.json",
        contentType:"json",
        success:function(res){
            for(var product of res){
                $("#products .product-list .row").append(`
                <div class="col-lg-3">
                <div class="product-item">
                <img class="img-fluid" src="${product.image}"/>
                <button class="btn btn-success btn-add-cart" product-id="${product.id}">Add to Card</button>
                </div> 
                </div>
                `)
            }
            $(".btn-add-cart").on("click",function(){
                const productId=$(this).attr("product-id")
                $.ajax({
                    url:"../products.json",
                    contentType:"JSON",
                    success:function(res){
                        for(var pro of res){
                            if(pro.id==productId){
                                var isInCart=cart.filter(c=>c==pro.id).length
                                if(isInCart==0){
                                    cart.push(pro.id)
                                    $("#exampleModal .modal-body").append(`
                                    <div class="col-12">
                                    <div class="product-cart-item d-flex justify-content-between my-2">
                                    <img width="50" class="img-fluid cart-img" src="${pro.image}"/>
                                    <h4 class="product-cart-name">${pro.name}</h4>
                                    <p class="product-cart-price">${pro.price} Azn</p>
                                    </div>
                                    </div> 
                                    `)
                                }
                               
                            }
                        }
                    }
                })
            })
        }
    })
   
})
//--------------------//
const images=[
    "img/slider-1.jpg",
    "img/slider-2.jpg",
    "img/slider-3.jpg",
]
const nextIco=document.querySelector(".next")
const prevIco=document.querySelector(".prev")
const sliderImg=document.querySelector("#slider img")

let currentSlide=0;

sliderImg.src=images[currentSlide]

nextIco.onclick=function(){
    MyInterval(false)
    NextSlider()
    setTimeout(function(){
        MyInterval(true)
    },2000)
}

prevIco.onclick=function(){
    MyInterval(false)
    PrevSlider();
    setTimeout(function(){
        MyInterval(true)
    },2000)
}

var sliderInt=null;


function NextSlider(){
    currentSlide++;
    if(currentSlide==images.length){
        currentSlide=0
    }
    sliderImg.src=images[currentSlide]
    document.querySelector("#slider").classList.add("active")
    setTimeout(()=>{
        document.querySelector("#slider").classList.remove("active")

    },6000)


}

function PrevSlider(){
    currentSlide--;
    if(currentSlide==-1){
        currentSlide=images.length-1
    }
    sliderImg.src=images[currentSlide]
    document.querySelector("#slider").classList.add("active")
    setTimeout(()=>{
        document.querySelector("#slider").classList.remove("active")

    },4000)

}

let MyInterval=function(loop){
    if(loop){
        sliderInt=setInterval(function(){
            NextSlider()
        },5000)
    }else{
        clearInterval(sliderInt)
    }
}
MyInterval(true) 

