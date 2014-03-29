var xStartPos = 320;
var xDelta = 40;
var yStartPos = 40;
var yDelta = 70;
var castlePosArray = [
    // Top
    {
        x: xStartPos,
        y: yStartPos,
        neighbours: [1, 2]
    },
    // Second line
    {
        x: xStartPos - xDelta,
        y: yStartPos + (yDelta * 1),
        neighbours: [0, 2, 3, 4]
    }, {
        x: xStartPos + xDelta,
        y: yStartPos + (yDelta * 1),
        neighbours: [0, 1, 4, 5]
    },
    // Third line
    {
        x: xStartPos - (xDelta * 2),
        y: yStartPos + (yDelta * 2),
        neighbours: [1, 4, 6, 7]
    }, {
        x: xStartPos,
        y: yStartPos + (yDelta * 2),
        neighbours: [1, 2, 3, 5, 7, 8]
    }, {
        x: xStartPos + (xDelta * 2),
        y: yStartPos + (yDelta * 2),
        neighbours: [2, 4, 8, 9]
    },
    // Fourth line
    {
        x: xStartPos - (xDelta * 3),
        y: yStartPos + (yDelta * 3),
        neighbours: [3, 7, 10, 11]
    }, {
        x: xStartPos - xDelta,
        y: yStartPos + (yDelta * 3),
        neighbours: [3, 4, 6, 8, 11, 12]
    }, {
        x: xStartPos + xDelta,
        y: yStartPos + (yDelta * 3),
        neighbours: [4, 5, 7, 9, 12, 13]
    }, {
        x: xStartPos + (xDelta * 3),
        y: yStartPos + (yDelta * 3),
        neighbours: [5, 8, 13, 14]
    },
    // Fifth line
    {
        x: xStartPos - (xDelta * 4),
        y: yStartPos + (yDelta * 4),
        neighbours: [6, 11, 15, 16]
    }, {
        x: xStartPos - (xDelta * 2),
        y: yStartPos + (yDelta * 4),
        neighbours: [6, 7, 10, 12, 16, 17]
    }, {
        x: xStartPos,
        y: yStartPos + (yDelta * 4),
        neighbours: [7, 8, 11, 13, 17, 18]
    }, {
        x: xStartPos + (xDelta * 2),
        y: yStartPos + (yDelta * 4),
        neighbours: [8, 9, 12, 14, 18, 19]
    }, {
        x: xStartPos + (xDelta * 4),
        y: yStartPos + (yDelta * 4),
        neighbours: [9, 13, 19, 20]
    },
    // Sixth line
    {
        x: xStartPos - (xDelta * 5),
        y: yStartPos + (yDelta * 5),
        neighbours: [10, 16]
    }, {
        x: xStartPos - (xDelta * 3),
        y: yStartPos + (yDelta * 5),
        neighbours: [10, 11, 15, 17]
    }, {
        x: xStartPos - (xDelta * 1),
        y: yStartPos + (yDelta * 5),
        neighbours: [11, 12, 16, 18]
    }, {
        x: xStartPos + (xDelta * 1),
        y: yStartPos + (yDelta * 5),
        neighbours: [12, 13, 17, 19]
    }, {
        x: xStartPos + (xDelta * 3),
        y: yStartPos + (yDelta * 5),
        neighbours: [13, 14, 18, 20]
    }, {
        x: xStartPos + (xDelta * 5),
        y: yStartPos + (yDelta * 5),
        neighbours: [14, 19]
    }
];