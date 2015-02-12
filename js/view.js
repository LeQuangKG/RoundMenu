var p_duration='0.3s';
var p_img = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg', 'img/9.jpg',
           'img/10.jpg', 'img/11.jpg', 'img/12.jpg', 'img/13.jpg', 'img/14.jpg', 'img/15.jpg', 'img/16.jpg', 'img/17.jpg', 'img/18.jpg',
           'img/19.jpg', 'img/20.jpg', 'img/21.jpg', 'img/22.jpg', 'img/23.jpg', 'img/24.jpg', 'img/25.jpg', 'img/26.jpg', 'img/27.jpg'];

var p_styleMatrix=[/*[left,top,width,height]*/
                        [12,320,302,220],
                        [45, 295,357,262],
                        [107,256,467,340],
                        [192,197,641,466],
                        [449,256,467,340],
                        [621,296,357,262],
                        [706,321,302,217]
                        ];
p_transitionMatrix=[];
var p_imgTag=[];
var p_endCount=0;
var p_EndTransitionDelegate=null;

//left index, right index
var p_lIndex,p_rIndex;
var p_currX;
var p_isInAni=false;


window.onload=function()
{
    var imgLoader=new ImageLoader();
    imgLoader.IL_OnComplete=AppStart;
    imgLoader.IL_fBeginLoadImg(p_img);
    
    p_lIndex=-3;
    p_rIndex=3;
    
    document.getElementById('button').addEventListener('touchstart',ResetImg,false);
    document.getElementById('button').addEventListener('mousedown',ResetImg,false);
}

function AppStart()
{
    var refPosition=p_styleMatrix[3];
    for(var i=0;i<7;i++)
    {
        //style apply
        var img=document.createElement('img');
        img.id='img'+i;
        img.className='p4';
        img.src=p_img[MapIndex( p_lIndex+i)];
        
        //transform apply
        var deltaL= p_styleMatrix[i][0] - refPosition[0] ;
        var deltaT= p_styleMatrix[i][1] - refPosition[1]  ;
        var deltaW=refPosition[2] -  p_styleMatrix[i][2]  ;
        var deltaH=refPosition[3]  - p_styleMatrix[i][3] ;
        
        var scaleX=Math.abs( p_styleMatrix[i][2]/refPosition[2]);
        var scaleY=Math.abs(p_styleMatrix[i][3]/refPosition[3]);
        
        deltaL=(deltaL - deltaW/2)/scaleX;
        deltaT=(deltaT - deltaH/2)/scaleY;
        
        var transform=img.style.webkitTransform;
        var matrix=new WebKitCSSMatrix(transform);
        matrix=matrix.scale(scaleX,scaleY,1);
        
        matrix=matrix.translate(deltaL,deltaT);
        img.style.webkitTransform=matrix;
        p_transitionMatrix.push(matrix);
        
        img.addEventListener('webkitTransitionEnd',TransitionEnd,false);
        
        document.body.appendChild(img);
        p_imgTag.push(img);
    }
    p_imgTag[0].style.zIndex=1;
    p_imgTag[1].style.zIndex=2;
    p_imgTag[2].style.zIndex=3;
    p_imgTag[3].style.zIndex=4;
    p_imgTag[4].style.zIndex=3;
    p_imgTag[5].style.zIndex=2;
    p_imgTag[6].style.zIndex=1;
    
    var img=document.createElement('img');
    img.id='img7';
    img.className='p4'
    img.style.zIndex=0;
    img.style.webkitTransform=p_transitionMatrix[6];
    img.style.visibility='hidden';
    img.src=p_img[MapIndex( 4)];
    img.addEventListener('webkitTransitionEnd',TransitionEnd,false);
    document.body.appendChild(img);
    p_imgTag.push(img);
    
    document.body.addEventListener('mousedown',MoveLeft,false);
    document.body.addEventListener('touchstart',TouchStart,false);
    document.body.addEventListener('touchmove',TouchMove,false);
    
}



function TouchStart(e)
{
    e.preventDefault();
    p_currX= e.changedTouches[0].clientX;
}//end function

function TouchMove(e)
{
    e.preventDefault();
    var x=e.changedTouches[0].clientX;
    var deltaX=x-p_currX;
    if(Math.abs(deltaX)<20||p_isInAni)
    {
        return;
    }
    p_currX=x;
    
    if(p_isInAni)
    {
        return;
    }
    
    p_isInAni=true;
    if(deltaX>0)
    {
        //move right
        MoveRight();
    }
    else
    {
        //move left
        MoveLeft();
    }
}

function Demo(e)
{
    
}

function MoveLeft()
{
    p_lIndex++;
    p_rIndex++;
    p_isInAni=true;
    
    //p_imgTag[3].style.zIndex=3;
    p_imgTag[4].style.zIndex=6;
    
    p_endCount=0;
    p_EndTransitionDelegate=EndLeftAni;
    p_imgTag[7].style.visibility='visible';
    for(var i=1;i<7;i++)
    {
        Transition(p_imgTag[i],i,i-1);
    }
    
    
    
}//end function

function EndLeftAni()
{
    p_endCount=0;
    p_imgTag[0].style.webkitTransitionDuration='0s';
    p_imgTag[1].style.webkitTransitionDuration='0s';
    p_imgTag[2].style.webkitTransitionDuration='0s';
    p_imgTag[3].style.webkitTransitionDuration='0s';
    p_imgTag[4].style.webkitTransitionDuration='0s';
    p_imgTag[5].style.webkitTransitionDuration='0s';
    p_imgTag[6].style.webkitTransitionDuration='0s';
    p_imgTag[7].style.webkitTransitionDuration='0s';
    
    p_imgTag[1].style.zIndex=1;
    p_imgTag[2].style.zIndex=2;
    p_imgTag[3].style.zIndex=3;
    p_imgTag[4].style.zIndex=4;
    p_imgTag[5].style.zIndex=3;
    p_imgTag[6].style.zIndex=2;
    p_imgTag[7].style.zIndex=1;
    
    
    var img=p_imgTag.shift();
    
    img.style.webkitTransform=p_transitionMatrix[6];
    img.style.visibility='hidden';
    img.style.zIndex=0;
    img.src=p_img[ MapIndex(p_rIndex+1)];
    
    p_imgTag.push(img);
    p_isInAni=false;
    
}//end function

function MoveRight()
{
    
    p_lIndex--;
    p_rIndex--;
    p_isInAni=true;
    
    
    var img=p_imgTag.pop();
    img.style.webkitTransform=p_transitionMatrix[0];
    img.style.visibility='visible';
    img.src=p_img[MapIndex(p_lIndex)];
    p_imgTag.unshift(img);
    
    p_imgTag[3].style.zIndex=6;
    
    p_endCount=0;
    p_EndTransitionDelegate=EndRightAni;
    
    for(var i=1;i<7;i++)
    {
        Transition(p_imgTag[i],i-1,i);
    }
    
    
    
}//end function

function EndRightAni()
{
    p_endCount=0;
    p_imgTag[0].style.visibility='visible';
    
    p_imgTag[0].style.zIndex=1;
    p_imgTag[1].style.zIndex=2;
    p_imgTag[2].style.zIndex=3;
    p_imgTag[3].style.zIndex=4;
    p_imgTag[4].style.zIndex=3;
    p_imgTag[5].style.zIndex=2;
    p_imgTag[6].style.zIndex=1;
    
    p_imgTag[0].style.webkitTransitionDuration='0s';
    p_imgTag[1].style.webkitTransitionDuration='0s';
    p_imgTag[2].style.webkitTransitionDuration='0s';
    p_imgTag[3].style.webkitTransitionDuration='0s';
    p_imgTag[4].style.webkitTransitionDuration='0s';
    p_imgTag[5].style.webkitTransitionDuration='0s';
    p_imgTag[6].style.webkitTransitionDuration='0s';
    p_imgTag[7].style.webkitTransitionDuration='0s';
    
    p_imgTag[7].style.visibility='hidden';
    p_imgTag[7].src=p_img[ MapIndex(p_rIndex+1)];
    p_imgTag[7].style.zIndex=0;
    p_isInAni=false;
}//end function

//event handler function
function TransitionEnd()
{
    p_endCount++;
    if(p_endCount>=6)
    {
        if(p_EndTransitionDelegate!=null)
        {
            p_EndTransitionDelegate();
        }
    }
    
}//end function

function MapIndex(index)
{
    
    var count=p_img.length;
    
    if(index<0)
    {
        return ( count + index%count)%count;
        
    }
    else
    {
        return index%count;
    }
}//end function

//make transition
//<p1> from </p1>
//<p2> to <p2>
function Transition(element,p1,p2)
{
    var sty1=p_transitionMatrix[p1];
    var sty2=p_transitionMatrix[p2];
    element.style.webkitTransitionDuration=p_duration;
    element.style.webkitTransform=sty2;
    
    
    
}//end function
function ResetImg()
{

    p_lIndex=-3;
    p_rIndex=3;
    
    p_imgTag[0].src=p_img[MapIndex( p_lIndex++)];
    p_imgTag[1].src=p_img[MapIndex( p_lIndex++)];
    p_imgTag[2].src=p_img[MapIndex( p_lIndex++)];
    p_imgTag[3].src=p_img[MapIndex( p_lIndex++)];
    p_imgTag[4].src=p_img[MapIndex( p_lIndex++)];
    p_imgTag[5].src=p_img[MapIndex( p_lIndex++)];
    p_imgTag[6].src=p_img[MapIndex( p_lIndex++)];
}
