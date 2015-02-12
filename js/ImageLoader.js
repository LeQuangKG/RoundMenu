//                 MMMMMMMM         MM    
//                 .MMMMMMMO        MM    
//                   .MMMMMM.       MM.   
//   .                .MMMMMZ       MM.   
//  .                  ..MMMMMMMMMMMMM.   
//   M.                   .MMMMMMMMMMM.   
//  .MM                   .  MMMMMMMMM.   
//  .MMM                       MMMMMMM.   
//  .MMMM..                     .MMMMM.   
//  .MMMMMM.                       MMM.   
//  .MMMMMMM,..                     MM.   
//  .MMMMMMMMM.                    . M.   
//   		  MMMM                     M.   
//          .MMMMM                   .    
//           MMMMMMM.                     
//            MMMMMMMM.                   
//            MMMMMMMMM                   
//            .MMMMMMMMM                  
//              MMMMMMMMM                 
//              .MMMMMMM           
//
// PRODUCED BY SYCOMORE CORP.                  
// Ingenieur: Ngo Anh Khoa
// Maitrise d'ouvrage : Christian Nguyen
// Maitrise d'oeuvre : Ringier Zurich
// Date: 15/03/2011
// Product: Image Loader
// Version 0.15032011

function ImageLoader() {
    this.IL_imgArray = null;
    this.IL_imgTagArray = null;
    this.IL_errorImgCount = 0;
    this.IL_pImgEvent = null;
    this.IL_intervalID = 0;
    this.IL_OnError = null;
    this.IL_OnTimeOut = null;
    this.IL_OnComplete = null;
    var my=this;
    this.IL_fBeginLoadImg = function (_imgArray) {

        if (!_imgArray || _imgArray.length == 0) {
            if (my.IL_OnComplete != null) {
                my.IL_OnComplete(0);
            }
            return;
        }

        my.IL_pImgEvent = new ImageEvent();
        my.IL_imgArray = _imgArray;
        my.IL_imgTagArray = new Array();
        var _count = my.IL_imgArray.length;
        for (var _i = 0; _i < _count; _i++) {

            var _imgObj = new Image();
            _imgObj.onload = my.IL_LoadImgCompleted;
            _imgObj.onerror = my.IL_LoadImgError;
            _imgObj.src = _imgArray[_i];
        }

    }
    //end function code

    this.IL_LoadImgCompleted = function () {
        my.IL_pImgEvent.IEE_pCompleteCount++;
        my.IL_eventCount = 0;
        if (my.IL_pImgEvent.IEE_pCompleteCount == my.IL_imgArray.length - 1) {


            if (my.IL_OnComplete != null) {
                my.IL_OnComplete();
            }

        }

    }
    //end function

    this.IL_LoadImgError = function (_obj) {
        my.IL_errorImgCount++;
        my.IL_eventCount = 0;
        if (!_obj) {
            my.IL_pImgEvent.IEE_pErrorSrc[my.IL_pImgEvent.IEE_pErrorSrc.length] = _obj.src;
        }

        if (my.IL_pImgEvent.IEE_oCompleteCount + my.IL_pImgEvent.IEE_pErrorSrc.length == my.IL_imgArray.length - 1) {
            if (my.IL_OnError != null) {
                my.IL_OnError(my.IL_pImgEvent);
            }
            
        }
    }
    //end function

    
}
//end class code
function ImageEvent() {

    this.IEE_pCompleteCount = 0;
    this.IEE_pErrorSrc = new Array();
    
}