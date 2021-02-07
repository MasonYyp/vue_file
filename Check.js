
import {Message} from "element-ui"

// Set the Check

class Check{
    // Remove the space at both ends
    removeSpace(str){
        str = str + '';
        str = str.replace(/(^\s*)|(\s*$)/g, "");
        return str;
    }

    // Remove all the space in the str
    removeAllSpace(str){
        str = str + '';
        str = str.replace(/\s/g, "");
        return str;
    }

    // It is empty
    isEmpty(value, message=''){
        if(value == null||this.removeSpace(value)===""){
            if(message!=''){
                Message.error(message);
            }
            return true;
        }
        return false;
    }

    // Check the username
    username(value, message=''){
        value = this.removeSpace(value);
        if(/^[a-zA-Z]{4,6}$/.test(value)){
            return true;
        }else{
            if(message!=''){
                Message.error(message);
            }
            return false;
        }
    }

    // Check the password
    password(value, message=''){
        value = this.removeSpace(value);
        if(/^[0-9]{6,8}$/.test(value)){
            return true;
        }else{
            if(message!=''){
                Message.error(message);
            }
            return false;
        }
    }

    // Check is positive Integer
    isInteger(value, message=''){
        value = this.removeSpace(value);
        if(/^\+?[1-9][0-9]*$/.test(value)){
            return true;
        }else{
            if(message!=''){
                Message.error(message);
            }
            return false;
        }
    }

    // Check is integer or float
    isNumber(value, message){
        // The value is float 
        var regPos = /^\d+(\.\d+)?$/;
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;

        // Judge float
        if(regPos.test(value) || regNeg.test(value)){
            return true;
        }else{
            if(message!=''){
                Message.error(message);
            }
            return false;
        }        
    }

    // Check the phone
    isPhone(value, message=''){
        value = this.removeSpace(value);
        if(/^[1][3,4,5,7,8][0-9]{9}$/.test(value)){
            return true;
        }else{
            if(message!=''){
                Message.error(message);
            }
            return false;
        }
    }

    // Check the land phone
    isLandPhone(value, message=''){
        value = this.removeSpace(value);
        if(/^0\d{2,3}-?\d{6,8}$/.test(value)){
            return true;
        }else{
            if(message!=''){
                Message.error(message);
            }
            return false;
        }
    }

}


export {Check as default}


