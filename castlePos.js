var xStartPos = 320;
var xDelta = 40;
var yStartPos = 40;
var yDelta = 70;
var castlePosArray = [
    // Top
    {
        x: xStartPos,
        y: yStartPos
    },
    // Second line
    {
        x: xStartPos - xDelta,
        y: yStartPos + (yDelta * 1)
    }, {
        x: xStartPos + xDelta,
        y: yStartPos + (yDelta * 1)
    },
    // Third line
    {
        x: xStartPos - (xDelta * 2),
        y: yStartPos + (yDelta * 2)
    }, {
        x: xStartPos,
        y: yStartPos + (yDelta * 2)
    }, {
        x: xStartPos + (xDelta * 2),
        y: yStartPos + (yDelta * 2)
    },
    // Fourth line
    {
        x: xStartPos - (xDelta * 3),
        y: yStartPos + (yDelta * 3)
    }, {
        x: xStartPos - xDelta,
        y: yStartPos + (yDelta * 3)
    }, {
        x: xStartPos + xDelta,
        y: yStartPos + (yDelta * 3)
    }, {
        x: xStartPos + (xDelta * 3),
        y: yStartPos + (yDelta * 3)
    },
    // Fifth line
    {
        x: xStartPos - (xDelta * 4),
        y: yStartPos + (yDelta * 4)
    }, {
        x: xStartPos - (xDelta * 2),
        y: yStartPos + (yDelta * 4)
    }, {
        x: xStartPos,
        y: yStartPos + (yDelta * 4)
    }, {
        x: xStartPos + (xDelta * 2),
        y: yStartPos + (yDelta * 4)
    }, {
        x: xStartPos + (xDelta * 4),
        y: yStartPos + (yDelta * 4)
    },
    // Sixth line
    {
        x: xStartPos - (xDelta * 5),
        y: yStartPos + (yDelta * 5)
    }, {
        x: xStartPos - (xDelta * 3),
        y: yStartPos + (yDelta * 5)
    }, {
        x: xStartPos - (xDelta * 1),
        y: yStartPos + (yDelta * 5)
    }, {
        x: xStartPos + (xDelta * 1),
        y: yStartPos + (yDelta * 5)
    }, {
        x: xStartPos + (xDelta * 3),
        y: yStartPos + (yDelta * 5)
    }, {
        x: xStartPos + (xDelta * 5),
        y: yStartPos + (yDelta * 5)
    }
];