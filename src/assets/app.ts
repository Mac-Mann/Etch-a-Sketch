// Initialize Bindings

const blackBtn = $("#blackBtn");
const rainbowBtn = $("#rainbowBtn");
const transparentBtn = $("#transparentBtn");
const lightGradientBtn = $("#lightGradientBtn");
const darkGradientBtn = $("#darkGradientBtn");
const colorBtns = $(".color");
const clearBtn = $("#clearBtn");
const newGridBtn = $("#newGridBtn");
const propagateBtn = $("#propagatebtn");
let container: any = $(".container");
let boxes: JQuery<HTMLElement>;

// Initialize Initial State

populateGrid(16);

const selections: any = {
    color: "black",
    propagate: false,
};

// Initialize Event Listeners

blackBtn.click(() => selections.color = "black");
rainbowBtn.click(() => selections.color = "rainbow");
transparentBtn.click(() => selections.color = "transparent");
lightGradientBtn.click(() => selections.color = "Light Gradient");
darkGradientBtn.click(() => selections.color = "Dark Gradient");
clearBtn.click(clearGrid);
newGridBtn.click(newGrid);
propagateBtn.click(() => selections.propagate === true ? selections.propagate = false : selections.propagate = true);

// Initialize Function Logic

function populateGrid(gridsize: number) {
    container.attr("style", `grid-template: repeat(${gridsize}, 1fr) / repeat(${gridsize}, 1fr);`);
    for (let i: number = 1; i <= gridsize; i++) {
        for (let j: number = 1; j <= gridsize; j++) {
            const box: any = $(`<div></div>`);
            box.addClass(`box x${j}y${i}`);
            box.attr("style", "background-color: white;");
            container.append(box);
        }
    }
    boxes = $(".box");
    $(".box").on("mouseenter", mouseOver);
}

function mouseOver(this: any) {

    switch (selections.color) {
        case "black":
        $(this).css({backgroundColor: "black", borderColor: "#44c2fc"});
        break;

        case "rainbow":
        $(this).css({backgroundColor: randomColor().generate, borderColor: "#44c2fc"});
        break;

        case "transparent":
        $(this).css({backgroundColor: "transparent", borderColor: "transparent"});
        break;

        case "Light Gradient":
        changeGradient($(this), -51);
        break;

        case "Dark Gradient":
        changeGradient($(this), 51);
        break;
    }
}

function clearGrid() {
    boxes.each((index: number, box: any) => {
        $(box).css({backgroundColor: "white", borderColor: "#44c2fc"});
    });
}

function newGrid() {
    const newSize: any = prompt("How many squares would you like per side? (128 max)");

    if (newSize === null || newSize === undefined || newSize === "") {
        alert("cancelled");
    } else if (!isNaN(newSize) && newSize <= 128) {
        boxes.each((index: number, box: any) => box.remove());
        populateGrid(newSize);
    } else {
        alert("Please enter a valid number that's less than 128.");
    }
}

function randomColor() {
    const r: number = Math.floor(Math.random() * 255);
    const g: number = Math.floor(Math.random() * 255);
    const b: number = Math.floor(Math.random() * 255);
    const generate: string = `rgb(${r}, ${g}, ${b})`;
    return {
        generate,
    };
}

function changeGradient(self: any, changeAmount: number) {
    const color: any = $(self).css("backgroundColor").split(",");
    let r = color[0].split("(")[color[0].split("(").length - 1];
    let g = color[1];
    let b = color[2].split(")")[color[1].split(")").length - 1];

    r -= changeAmount;
    g -= changeAmount;
    b -= changeAmount;
    $(self).css({backgroundColor: `rgb(${r}, ${g}, ${b})`, borderColor: "#44c2fc"});
}
