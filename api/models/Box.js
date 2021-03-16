const Box = data => {
    this.data = data;
};

Box.optimizeBox = () => {
    let data = JSON.parse( JSON.stringify( this.data ))
    let order = orderPriority(data)

    let length = [data[order[0]].length,data[order[1]].length,data[order[2]].length]
    let amount = [data[order[0]].amount,data[order[1]].amount,data[order[2]].amount]
    let width  = [data[order[0]].width,data[order[1]].width,data[order[2]].width]
    let height = [data[order[0]].height,data[order[1]].height,data[order[2]].height]

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
    let debug = []
    let resultCount = {box1:0,box2:0,box3:0}
    let result = {box1:[],box2:[],box3:[], count: resultCount, debug:debug, volume:0}
    let countL = -1;
    let countW = -1;
    let countH = -1;
    let containerAux = JSON.parse( JSON.stringify( container ));
        for(let i = 0; i < 3; i++){
            if (amount[i] > 0
                && length[i] <= containerAux.length
                && width[i] <= containerAux.width
                && height[i] <= containerAux.height)
            {
                let l = containerAux.length ;
                let h = containerAux.height;

                let a = amount[i];


                while (width[i] <= containerAux.width && a > 0){
                    containerAux.width -=width[i]
                    countW++;
                    l = containerAux.length ;
                    h = containerAux.height;
                    while (height[i] <= h && a > 0){

                        h -=height[i]
                        countH++;
                        l = containerAux.length ;
                        while (length[i] <= l && a > 0){
                            countL++;
                            result[priority[i]].push([countW,countH,countL]) // debug.push([countW,countH])
                            l -=length[i]
                            resultCount[priority[i]]++
                            a--;
                        }
                    }
                }
            }
        }

        let volumeBox1 = getVolume(resultCount.box1, length[0],width[0],height[0] )

        let volumeBox2 = getVolume(resultCount.box2, length[1],width[1],height[1] )
        let volumeBox3 = getVolume(resultCount.box3, length[2],width[2],height[2] )

        let volumeContainer = getVolume(1, container.length, container.width, container.height )
        result.volume = ((volumeBox1 + volumeBox2 + volumeBox3) / volumeContainer * 100).toFixed(2)

    return result
}

const getVolume = (amount, length, width, height) =>{
    return amount * ((length*100) * (width*100) * (height*100))/100
}

module.exports = Box;