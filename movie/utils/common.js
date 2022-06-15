module.exports={
  //数量变化值
  getNumber(num){
    if(num<1000){
      return num
    }else if(num>=1000 && num<10000){
      let n=(num/1000).toFixed(1)+"k"
      return n
    }else if(num>=10000 && num<100000){
      let n=(num/10000).toFixed(1)+'w'
      return n
    }else if(num>=100000){
      return "10w+"
    }else{
      return 0
    }
  },
}