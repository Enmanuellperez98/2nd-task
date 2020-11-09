const fs = require("fs");
const { argv } = require("process");

const pathOne = argv[2];
const pathTwo = argv[3];
const groupsCount = argv[4];

let sourceOne = fs.readFileSync(pathOne);
let sourceTwo = fs.readFileSync(pathTwo);

sourceOne = sourceOne.toString().split("\n");
sourceTwo = sourceTwo.toString().split("\n");

if(sourceOne.length > groupsCount)
return console.log(`${pathOne} invalid count of elements, have to be bigger or equal to groups count`);
if(sourceTwo.length > groupsCount)
return console.log(`${pathTwo} invalid count of elements, have to be bigger or equal to groups count`);

function getGroups(source,groups,d){
    source = Array.from(source)
                .sort((a,b)=>Math.floor(Math.random()*2)-1);

    let perSourceOne = (source.length / groups);
    let countOne = Math.floor(perSourceOne);
    let r = (perSourceOne - countOne)*10;
    let outputOne = [];

    let e = Array(Math.floor(r)).fill(1).map((e,i)=>i%2==d?i:(groups-1)-i);
    
    for(let i = 0; i < groups;i++){
        let chunk = source.splice(0,countOne);
        if(e.includes(i))chunk.push(source.splice(0,1).shift());
        outputOne.push(chunk);
    }
    
    return outputOne;
}

let outputOne = getGroups(sourceOne,groupsCount,0);
let outputTwo = getGroups(sourceTwo,groupsCount,1);

let merge = outputOne.map((e,i)=>[e,outputTwo[i],e.length+outputTwo[i].length]);

merge.forEach((outputs,i)=>{
    let groupOne = outputs[0];
    let groupTwo = outputs[1];

    console.log(`\nGroup #${i+1}, ${outputs[2]} elements`);
        console.log(`\tSourceOne ${outputs[0].length} elements, PathTwo ${outputs[1].length} elements`);
        console.log(`\t\tSourceOne:`);
        groupOne.forEach((e)=>console.log(`\t\t${e}`));
        console.log(`\n\t\tSourceTwo:`);
        groupTwo.forEach((e)=>console.log(`\t\t${e}`));
});