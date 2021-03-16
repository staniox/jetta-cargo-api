const Box = data => {
    this.data = data;
};

Box.optimizeBox = () => {
    let data = JSON.parse( JSON.stringify( this.data ))
    let order = orderPriority(data)

    let length = [parseFloat(data[order[0]].length),parseFloat(data[order[1]].length),parseFloat(data[order[2]].length)]
    let amount = [parseFloat(data[order[0]].amount),parseFloat(data[order[1]].amount),parseFloat(data[order[2]].amount)]
    let width  = [parseFloat(data[order[0]].width),parseFloat(data[order[1]].width),parseFloat(data[order[2]].width)]
    let height = [parseFloat(data[order[0]].height),parseFloat(data[order[1]].height),parseFloat(data[order[2]].height)]

    let calculate = getCalc(length, amount,width,height,data.container, order)


    return calculate
}

const orderPriority = (data) =>{
    let priority =[];
    if (data.box1.length > data.box2.length && data.box1.length > data.box3.length ){
        priority.push("box1")
        if (data.box2.length > data.box3.length)
            priority.push("box2", "box3")
        else
            priority.push("box3", "box2")
    }
    else if (data.box2.length > data.box1.length && data.box2.length > data.box3.length ) {
        priority.push("box2")
        if (data.box1.length > data.box3.length)
            priority.push("box1", "box3")
        else
            priority.push("box1", "box3")
    }
    else
        {
            priority.push("box3")
            if (data.box1.length > data.box2.length)
                priority.push(["box1", "box2"])
            else
                priority.push(["box2", "box1"])

        }
    if(data[priority[0]].length === data[priority[1]].length){
        let temp;

        if(data[priority[1]].length === data[priority[2]].length && data[priority[2]].amount > data[priority[1]].amount){
            temp = priority[1];
            priority[1] = priority[2];
            priority[2] = temp;
        }
        if (data[priority[1]].amount > data[priority[0]].amount){
            temp = priority[0];
            priority[0] = priority[1];
            priority[1] = temp;
        }
    }
    return priority;
}

const getCalc =(length, amount, width, height, container, priority) =>{
    let result = {box1:0,box2:0,box3:0}
       let loadedContainerL = parseFloat(container.length);
       let loadedContainerW = parseFloat(container.width);
       let loadedContainerH = parseFloat(container.height);
       let debug = []
        for(let i = 0; i < 3; i++){
           // debug.push(['resultCount',i])
            // debug.push(['i',length[i],width[i], height[i]])
            // debug.push(['container',i, amount[i],length[i],loadedContainerL,  loadedContainerW, loadedContainerH]);
            // debug.push([length[i] <= loadedContainerL,width[i] <= loadedContainerW,height[i] <= loadedContainerH])
            if (amount[i] > 0
                && (length[i] <= loadedContainerL
                || width[i] <= loadedContainerW
                || height[i] <= loadedContainerH))
            {
             //   debug.push([i,length[i]]);
                let countFree=0;
                //debug.push(['countfree',countFree])
                let l = length[i] <= loadedContainerL ? loadedContainerL : container.length ;
                if(l!=container.length){
                    countFree++;
                }
               // debug.push(['countfree',countFree])
                let w = width[i] <= loadedContainerW ? loadedContainerW : container.width;
                if(w!=container.width){
                    debug.push(['countfree',countFree,length[i], loadedContainerW,container.width])
                    if(countFree>0){
                        countFree++;
                        w=container.width
                    }
                }
               // debug.push(['countfree',countFree,w!=container.width])
                let h = height[i] <= loadedContainerH ? loadedContainerH : container.height;
                if(h!=container.height){
                    if(countFree>0){
                        countFree++;
                        h=container.height
                    }
                }
                //debug.push(['countfree',countFree])

                //debug.push([l,container.length,l!=container.length,w,container.width,w!=container.width, h,container.height,h!=container.height])
                if(countFree >1)
                    --i < 0 ? i=0 : i--
                let a = amount[i];
                let countL = 0;
                let countW = 0;
                let countH = 0;
                while (length[i] <= l && a > 0){
                    l -= length[i]
                    countL++;
                    a--;
                }
                while (width[i] <= w && a > 0){
                    w -= width[i]
                    countW++;
                    a--;
                }
                while (height[i] <= h && a > 0){
                    h -= height[i]
                    countH++;
                    a--;
                }
                let resultCount = countL * countW * countH
             // debug.push(['resultCount',resultCount,  countL , countW , countH])

                if( resultCount <= amount[i] ){
                    result[priority[i]] = resultCount
                    if(countFree >0){
                        loadedContainerL -= l;
                        loadedContainerW -= w;
                        loadedContainerH -= h;
                    }
                    else {
                        loadedContainerL = l;
                        loadedContainerW = w;
                        loadedContainerH = h;
                    }

                }
                else {
                    result[priority[i]] = amount[i]
                   // debug.push([loadedContainerL,loadedContainerW, loadedContainerH])
                    loadedContainerL -= (countL*length[i]);
                    loadedContainerW -= (countW*width[i]);
                    loadedContainerH -= (countH*height[i]);
                    //amount[i] = 0
                    // debug.push([amount[i],length[i] , width[i] , height[i]])
                    // debug.push([amount[i]*length[i],amount[i]*width[i],amount[i]*height[i]])
                    // debug.push([loadedContainerL,loadedContainerW, loadedContainerH])
                }
            }
        }
    return result
}

module.exports = Box;