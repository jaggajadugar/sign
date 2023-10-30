var canvas = document.getElementById('canv');
ctx = canvas.getContext('2d');
img = document.getElementById('image');
var priceDefLine1='{"w10":55,"w14":75,"w17":89,"w19":105,"w21":119,"w23":139,"w25":165,"w27":189,"w30":205,"w32":225,"w35":259,"w40":289,"w45":349,"w50":479,"w55":539,"w60":589}';
var priceDefLine2='{"w10":85,"w14":109,"w17":125,"w19":145,"w21":179,"w23":209,"w25":235,"w27":267,"w30":299,"w32":325,"w35":359,"w40":425,"w45":525,"w50":625,"w55":725,"w60":850}';
var priceDefLine3='{"w10":110,"w14":149,"w17":179,"w19":209,"w21":239,"w23":289,"w25":329,"w27":369,"w30":399,"w32":425,"w35":469,"w40":559,"w45":679,"w50":869,"w55":1098,"w60":1260}';
var priceDefBoard='{"Transparent":0,"Black":0}';
var priceDefUse='{"Indoor":0,"Waterproof":30}';
var priceDefShape='{"CutShape":0,"CutRectangle":5}';
var priceDefPower='{"12V No Adapter":0,"12V Black":15,"12V White":25,"USB":5}';
var priceDefDimmer='{"No Dimmer":0,"Black Dimmer":5,"White Dimmer":7,"Remote":12}';
var priceDefMount='{"Wall":0,"Chains":5,"Ceiling":12}';
function grow(el) {
	el.style.height = "10rem";
	el.style.height = (el.scrollHeight)+"px";
}
function getRadioValue(chkObjs){
	for(var i=0;i<chkObjs.length;i++){
		if(chkObjs[i].checked){
			font=chkObjs[i].value;
		}
	}
	return font;
}
function drawArrow(ctx, fromX, fromY, toX, toY,theta,headlen,width,color) {
 
    theta = typeof(theta) != 'undefined' ? theta : 30;
    headlen = typeof(theta) != 'undefined' ? headlen : 10;
    width = typeof(width) != 'undefined' ? width : 1;
    color = typeof(color) != 'color' ? color : '#000';
 
    // 计算各角度和对应的P2,P3坐标
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
 
    ctx.save();
    ctx.beginPath();
 
    var arrowX = fromX - topX,
        arrowY = fromY - topY;
 
    ctx.moveTo(arrowX, arrowY);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
}
function setFont(){

}
var generate = function() {
	if(checkform()==false){
		return false;
	}
	var line =getRadioValue(document.getElementsByName("line"));//not lines,lines for text input
	var size =getRadioValue(document.getElementsByName("size"));
	var text = document.getElementById('text').value.split("\n").join("\n");
	var color = document.getElementById('color').value;
    var notes = document.getElementById('notes').value;
	var select=document.getElementById('color'); //���select����
	var colorName=select.options[select.selectedIndex].text; 

	var board =getRadioValue(document.getElementsByName("board"));
	var use =getRadioValue(document.getElementsByName("use"));
	var shape =getRadioValue(document.getElementsByName("shape"));
	var power =getRadioValue(document.getElementsByName("power"));
	var dimmer =getRadioValue(document.getElementsByName("dimmer"));
	var mounting =getRadioValue(document.getElementsByName("mounting"));
    var mounting =getRadioValue(document.getElementsByName("mounting"));
    var font_apply = document.getElementById('font_apply').value;
    var font =getRadioValue(document.getElementsByName("font"));
    if(font_apply==0){
        document.getElementById('font_1st').setAttribute('value',font);
        document.getElementById('font_2nd').setAttribute('value',font);
        document.getElementById('font_3rd').setAttribute('value',font);
	}else{
    	if(font_apply==1){
            document.getElementById('font_1st').setAttribute('value',font);
		}else if(font_apply==2){
            document.getElementById('font_2nd').setAttribute('value',font);
        }else if(font_apply==3){
            document.getElementById('font_3rd').setAttribute('value',font);
        }
	}

	var line_fonts= new Array(document.getElementById('font_1st').value,document.getElementById('font_2nd').value,document.getElementById('font_3rd').value);

    var color_apply = document.getElementById('color_apply').value;
    if(color_apply==0){
        document.getElementById('color_1st').setAttribute('value',color);
        document.getElementById('color_2nd').setAttribute('value',color);
        document.getElementById('color_3rd').setAttribute('value',color);
    }else{
        if(color_apply==1){
            document.getElementById('color_1st').setAttribute('value',color);
        }else if(color_apply==2){
            document.getElementById('color_2nd').setAttribute('value',color);
        }else if(color_apply==3){
            document.getElementById('color_3rd').setAttribute('value',color);
        }
    }

    var line_colors= new Array(document.getElementById('color_1st').value,document.getElementById('color_2nd').value,document.getElementById('color_3rd').value);


	var x = 80;
	var y = 90;
	var lineheight = 80;
	var lines = text.split('\n');
	var lineLengthOrder = lines.slice(0).sort(function(a, b) {
		return b.length - a.length;
	});
	ctx.canvas.width = ctx.measureText(lineLengthOrder[0]).width + 100;
	ctx.canvas.height = (lines.length * lineheight) + 100;
	if(ctx.canvas.width<350) ctx.canvas.width=350;
	if(ctx.canvas.height<350) ctx.canvas.height=350;
	maxWidth=350;

	if(board=='Black'){
		ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

	}else{
		ctx.fillStyle = "#525B62";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        fixedImage(ctx, 'http://www.custom-make.com/neon/img/background_400.jpg', 350, 350, 20, 28)
    }
	//ctx.fillText(size, x, y + (i*lineheight),maxWidth );

	ctx.textBaseline = "middle";
	var maxLen=0;
	for (var i = 0; i<lines.length; i++){
		var numOfLetters=lines[i].length;
		if(numOfLetters>maxLen) maxLen=numOfLetters;
	}
	x=(ctx.canvas.width)/2;
	if(x<25) x=25;
	if(x>250)x=250;


	var fontPx=Math.round(450/maxLen);
	if(fontPx>65) fontPx=65;
	if(fontPx<40) fontPx=40;
	ctx.font=fontPx+"px "+font;
//	ctx.fillStyle = "#0000FF";
	ctx.fillStyle = color;
	ctx.textAlign='center';
	var title_font='';
    var title_color='';
    var add_heart=0;

    if(lines.length==1 && add_heart==1){lines[0]=lines[0]+'♡'}
	for (var i = 0; i<lines.length; i++){
        ctx.font=fontPx+"px "+line_fonts[i];
        ctx.fillStyle = line_colors[i];
        title_color +='/'+ line_colors[i];
        title_font +='/'+ line_fonts[i];
		ctx.textAlign='center';
		ctx.shadowOffsetX=0;
        ctx.shadowOffsetY=0;
        ctx.shadowBlur=25;
        ctx.shadowColor= line_colors[i];
		ctx.fillText(lines[i], x, y + (i*lineheight),maxWidth );

        ctx.shadowColor = line_colors[i];;
        ctx.shadowBlur = 45;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.beginPath();
        ctx.fillStyle = line_colors[i];
        ctx.fillText(lines[i], x, y + (i*lineheight),maxWidth );

        ctx.shadowColor = line_colors[i];;
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = -0;
        ctx.shadowOffsetY = -0;
        ctx.beginPath();
        ctx.fillStyle = line_colors[i];
        ctx.fillText(lines[i], x, y + (i*lineheight),maxWidth );

        ctx.shadowColor = line_colors[i];;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = -0;
        ctx.shadowOffsetY = -0;
        ctx.beginPath();
        ctx.fillStyle = line_colors[i];
        ctx.fillText(lines[i], x, y + (i*lineheight),maxWidth );

	}

    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = -0;
    ctx.shadowOffsetY = -0;
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
	ctx.font="11px Arial";
	ctx.fillStyle = "#00F0FF";
	ctx.textAlign='left';
	ctx.fillText("LN:"+line+"/"+size+'"/'+title_font+'/'+title_color,4,canvas.height-75);
	ctx.fillText('SAY:'+text+'',4,canvas.height-60);
    ctx.fillText("BD:"+board+"/"+shape,4,canvas.height-45);
	ctx.fillText('WP:'+use+'/'+power+'/'+dimmer+'/'+mounting+'/',4,canvas.height-30);
    ctx.fillText(''+notes,4,canvas.height-15);
    ctx.font="15px Arial";
    var price=calPrice(line,size,board,shape,use,power,dimmer,mounting);
    ctx.fillText('$'+Math.round(price/1.2)+' USD',canvas.width-80,20);

    ctx.fillText('custom-neon-sign.com',10,10);

	drawArrow(ctx, 70, 40, 270,40,10,20,3,'#FCFFCF');
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(size+" inches", 120, 30);


	img.src = ctx.canvas.toDataURL();


}

document.getElementById('submit').addEventListener('click', function (){
	document.getElementById("image").style.display = 'block';
	generate();
});

document.getElementById('text').addEventListener('keyup', function (){
	document.getElementById("image").style.display = 'block';
	generate();
});

document.getElementById('color').addEventListener('change', function (){
	document.getElementById("image").style.display = 'block';
	generate();
});

document.getElementById('image').addEventListener('click', function (){
	document.getElementById("font").style.display = 'block';
	generate();
});
generate();
function downLoadImage() {
	if(checkform()==false){
		alert("Some option conflits. please fix before download design");
		return false;
	}
	var img=document.getElementById('image');
	var name='Neon_'+document.getElementById('text').value.split("\n").join("\t")+'.png';
    var a = document.createElement("a");
    a.href = img.src;
    a.download = name;
    a.click();
}
function calPrice(line,size,board,shape,use,power,dimmer,mounting){

	if(line==1){
		var obj=JSON.parse(priceDefLine1);
	}else if(line==2){
        var obj=JSON.parse(priceDefLine2);
	}else if(line==3){
        var obj=JSON.parse(priceDefLine3);
    }
    var keyName='w'+size.trim();
    var basePrice=0;
    basePrice=parseFloat(obj[keyName]);
    if(basePrice<=0) return 0;
    var boardPrice=JSON.parse(priceDefBoard);
    var shapePrice=JSON.parse(priceDefShape);
    var usePrice=JSON.parse(priceDefUse);
    var powerPrice=JSON.parse(priceDefPower);
    var dimmerPrice=JSON.parse(priceDefDimmer);
    var mountPrice=JSON.parse(priceDefMount);

    var price;
    price=basePrice+parseFloat(boardPrice[board]);
    price=price+parseFloat(shapePrice[shape]);
    price=price+parseFloat(usePrice[use]);
    price=price+parseFloat(powerPrice[power]);
    price=price+parseFloat(dimmerPrice[dimmer]);
    price=price+parseFloat(mountPrice[mounting]);
    return price ;
}
function checkform() {

    var span = document.getElementById("tip").innerHTML="";
    var line =getRadioValue(document.getElementsByName("line"));//not lines,lines for text input
    var size =getRadioValue(document.getElementsByName("size"));
    var text = document.getElementById('text').value.replace(/^\s\r*\n/g, "").split("\n").join("\n");
    var power =getRadioValue(document.getElementsByName("power"));
    var lines = text.split('\n');
    var maxLen=0;
    var totalLen=0;

    for (var i = 0; i<lines.length; i++){
        var numOfLetters=lines[i].trim().length;
        totalLen=totalLen+lines[i].trim().length;
        if(numOfLetters>maxLen) maxLen=numOfLetters;
    }
	if((totalLen>15 && power=='USB') ||(size>30 && power=='USB') ){
        document.getElementById("tip").innerHTML="<span class='tip'>USB Operated not for big sign.</span>";
        return false;
	}
	if(maxLen*2>size){
        document.getElementById("tip").innerHTML="Wrong size,need bigger than "+maxLen*2+" inches" ;
        return false;
	}
    if(lines.length!=line){
        document.getElementById("tip").innerHTML="Please choose "+lines.length+"-line";
        return false;
	}else{
        document.getElementById("tip").innerHTML="";
	}
    document.getElementById("tip").innerHTML="";
    if(totalLen<3){
    	if(totalLen<=0){
            document.getElementById("tip").innerHTML="Please enter letters." ;

		}else{
            document.getElementById("tip").innerHTML="<span class='tip'>Enter at least 3 letters</span>" ;
		}
    }

}


// 背景图片宽度自适应
/*
 url:图片地址
 width  图片容器的宽度
 height 图片容器的高度
 startX  图片放置的X轴位置
 startY  图片放置的Y轴位置
 isCrossOrigin 图片是否支持跨域
*/
//fixedImage(ctx, 'http://www.custom-make.com/custom-neon/img/background_400.jpg', 400, 350, 20, 28)

function fixedImage(ctx, url, width, height, startX, startY, isCrossOrigin = true){
        const oldWidth = this.width  //图片实际宽度
        const oldHeight = this.height  //图片实际高度
        const dw = width/oldWidth  //容器宽度 /图片实际宽度
        const dh = height/oldHeight //容器高度/ 图片实际高度

        if(oldWidth>width && oldHeight>height || oldWidth<width && oldHeight<height){ //图片宽高都偏大&宽高都偏小
            if(dw > dh){ //偏宽
                ctx.drawImage(img, 0, (oldHeight-height/dw)/2,oldWidth,height/dw,startX,startY, width, height)
            }else{
                ctx.drawImage(img, (oldWidth-width/dh)/2,0,width/dh,oldHeight,startX,startY, width, height)
            }
        }else{ //拉伸图片
            if(oldWidth<width){
                ctx.drawImage(img, 0, (oldHeight-height/dw)/2,oldWidth,height/dw,startX,startY, width, height)
            }else{
                ctx.drawImage(img, (oldWidth-width/dh)/2,0,width/dh,oldHeight,startX,startY, width, height)
            }
        }
      img.src = url
}