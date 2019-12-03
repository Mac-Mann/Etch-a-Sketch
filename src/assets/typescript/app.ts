// Block Scope Closure
{
    // Initialize Bindings
    const blackBtn: JQuery < HTMLElement > = $("#blackBtn");
    const rainbowBtn: JQuery < HTMLElement > = $("#rainbowBtn");
    const transparentBtn: JQuery < HTMLElement > = $("#transparentBtn");
    const lightGradientBtn: JQuery < HTMLElement > = $("#lightGradientBtn");
    const darkGradientBtn: JQuery < HTMLElement > = $("#darkGradientBtn");
    const colorBtns: JQuery < HTMLElement > = $(".color");
    const clearBtn: JQuery < HTMLElement > = $("#clearBtn");
    const newGridBtn: JQuery < HTMLElement > = $("#newGridBtn");
    const propagateBtn: JQuery < HTMLElement > = $("#propagateBtn");
    const container: JQuery < HTMLElement > = $(".container");
    let boxes: JQuery < HTMLElement > ;

    // Initialize Initial State
    populateGrid(16);

    const selections: any = {
        color: "black",
        propagate: "off",
    };

    // Initialize Event Listeners
    blackBtn.click(() => selections.color = "black");
    rainbowBtn.click(() => selections.color = "rainbow");
    transparentBtn.click(() => selections.color = "transparent");
    lightGradientBtn.click(() => selections.color = "Light Gradient");
    darkGradientBtn.click(() => selections.color = "Dark Gradient");
    clearBtn.click(clearGrid);
    newGridBtn.click(newGrid);
    propagateBtn.click(propagateToggle);

    // Initialize Function Logic
    function populateGrid(gridsize: number) {
        container.attr("style", `grid-template: repeat(${gridsize}, 1fr) / repeat(${gridsize}, 1fr);`);
        for (let i: number = 1; i <= gridsize; i++) {
            for (let j: number = 1; j <= gridsize; j++) {
                const box: JQuery < HTMLElement > = $(`<div></div>`);
                box.addClass(`box x${j}y${i}`);
                box.on("transitionend webkitTransitionEnd oTransitionEnd", propagate);
                box.attr("style", "background-color: white;");
                box.attr("tabindex", 0);
                container.append(box);
            }
        }
        boxes = $(".box");
        $(".box").on("mouseenter keypress", mouseOver);
    }

    function mouseOver(this: any, prop: any) {
        switch (selections.color) {
            case "black":
                $(this).css({ backgroundColor: "black", borderColor: "#44c2fc" });
                $(prop).css({ backgroundColor: "black", borderColor: "#44c2fc" });
                break;

            case "rainbow":
                randomColor($(this));
                randomColor($(prop));
                break;

            case "transparent":
                $(this).css({ backgroundColor: "transparent", borderColor: "transparent" });
                $(prop).css({ backgroundColor: "transparent", borderColor: "transparent" });
                break;

            case "Light Gradient":
                changeGradient($(this), -51);
                break;

            case "Dark Gradient":
                changeGradient($(this), 51);
                break;
        }
    }

    function propagateGradient(prop: any) {
        selections.color === "Light Gradient" ? changeGradient($(prop), -51) : changeGradient($(prop), 51);
    }

    function clearGrid() {
        boxes.each((index: number, box: any) => {
            $(box).css({ backgroundColor: "white", borderColor: "#44c2fc" });
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

    function randomColor(self: JQuery < HTMLElement > ) {
        const r: number = Math.floor(Math.random() * 255);
        const g: number = Math.floor(Math.random() * 255);
        const b: number = Math.floor(Math.random() * 255);
        const generate: string = `rgb(${r}, ${g}, ${b})`;
        $(self).css({ backgroundColor: generate, borderColor: "#44c2fc" });
    }

    function changeGradient(self: JQuery < HTMLElement > , changeAmount: number) {
        const color: any = $(self).css("backgroundColor").split(",");
        let r = color[0].split("(")[color[0].split("(").length - 1];
        let g = color[1];
        let b = color[2].split(")")[color[1].split(")").length - 1];

        r -= changeAmount;
        g -= changeAmount;
        b -= changeAmount;
        $(self).css({ backgroundColor: `rgb(${r}, ${g}, ${b})`, borderColor: "#44c2fc" });
    }

    function propagate(this: any) {
        if (selections.propagate === "on") {
            const thisY: number = parseInt(this.classList[1].split("y")[1], 10);
            const thisX: number = parseInt(this.classList[1].split("y")[0].split("x")[1], 10);
            const maxSize: number = Math.sqrt(container.children().length);

            for (let i: number = -1; i <= 1; i++) {
                for (let j: number = -1; j <= 1; j++) {
                    const tempX: number = thisX + i;
                    const tempY: number = thisY + j;
                    if ((i === 0 && j !== 0) || (i !== 0 && j === 0)) {
                        if (tempX >= 1 && tempX <= maxSize && tempY >= 1 && tempY <= maxSize) {
                            const propElement: JQuery < HTMLElement > = $(".x" + tempX + "y" + tempY);
                            selections.color !== "Light Gradient" && selections.color !== "Dark Gradient" ?
                                mouseOver(propElement) : propagateGradient(propElement);
                        }
                    }
                }
            }
        }
    }

    function propagateToggle() {
        selections.propagate === "off" ? selections.propagate = "on" : selections.propagate = "off";
        selections.propagate === "off" ? propagateBtn.css("backgroundColor", "darkred") : propagateBtn.css("backgroundColor", "darkgreen");
    }
}
