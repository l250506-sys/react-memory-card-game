function showCard(id){
    setCardsArray(prevArray=>{
      let count = 0;
      const valuesArray = [];
      let newArray=[];
      prevArray.forEach((obj,index)=>{
        if(obj.open){
          valuesArray.push({value:obj.value,index:index})
          count++
        }
      });
      console.log(valuesArray);
      console.log(count)
      if(count==2){
        if(valuesArray[0].value === valuesArray[1].value){
          newArray = prevArray.map((obj,index)=>
            valuesArray[0].index||valuesArray[1].index === index?{
              ...obj,
              disabled:true
            }:obj
          )
        }else{
          newArray = prevArray.map(obj=>
            obj.open && !obj.disabled?{
              ...obj,
              open:false
            }:obj.id===id?{
              ...obj,
              open:true
            }:obj
          )
        }
      }else{
        newArray = prevArray.map(obj=>
          obj.id === id?{
            ...obj,
            open:true
          }:obj
        )
      }
      return newArray
    }
    )
  }