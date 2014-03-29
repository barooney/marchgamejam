var xStartPos = 320;
var xDelta = 40;
var yStartPos = 40;
var yDelta = 70;
var castlePosArray = [
    // Top
    {
        id: 0,
        x: xStartPos,
        y: yStartPos,
        neighbours: [1, 2],
        owner: 1
    },
    // Second line
    {
        id: 1,
        x: xStartPos - xDelta,
        y: yStartPos + (yDelta * 1),
        neighbours: [0, 2, 3, 4],
        owner: 0
    }, {
        id: 2,
        x: xStartPos + xDelta,
        y: yStartPos + (yDelta * 1),
        neighbours: [0, 1, 4, 5],
        owner: 0
    },
    // Third line
    {
        id: 3,
        x: xStartPos - (xDelta * 2),
        y: yStartPos + (yDelta * 2),
        neighbours: [1, 4, 6, 7],
        owner: 0
    }, {
        id: 4,
        x: xStartPos,
        y: yStartPos + (yDelta * 2),
        neighbours: [1, 2, 3, 5, 7, 8],
        owner: 0
    }, {
        id: 5,
        x: xStartPos + (xDelta * 2),
        y: yStartPos + (yDelta * 2),
        neighbours: [2, 4, 8, 9],
        owner: 0
    },
    // Fourth line
    {
        id: 6,
        x: xStartPos - (xDelta * 3),
        y: yStartPos + (yDelta * 3),
        neighbours: [3, 7, 10, 11],
        owner: 0
    }, {
        id: 7,
        x: xStartPos - xDelta,
        y: yStartPos + (yDelta * 3),
        neighbours: [3, 4, 6, 8, 11, 12],
        owner: 0
    }, {
        id: 8,
        x: xStartPos + xDelta,
        y: yStartPos + (yDelta * 3),
        neighbours: [4, 5, 7, 9, 12, 13],
        owner: 0
    }, {
        id: 9,
        x: xStartPos + (xDelta * 3),
        y: yStartPos + (yDelta * 3),
        neighbours: [5, 8, 13, 14],
        owner: 0
    },
    // Fifth line
    {
        id: 10,
        x: xStartPos - (xDelta * 4),
        y: yStartPos + (yDelta * 4),
        neighbours: [6, 11, 15, 16],
        owner: 0
    }, {
        id: 11,
        x: xStartPos - (xDelta * 2),
        y: yStartPos + (yDelta * 4),
        neighbours: [6, 7, 10, 12, 16, 17],
        owner: 0
    }, {
        id: 12,
        x: xStartPos,
        y: yStartPos + (yDelta * 4),
        neighbours: [7, 8, 11, 13, 17, 18],
        owner: 0
    }, {
        id: 13,
        x: xStartPos + (xDelta * 2),
        y: yStartPos + (yDelta * 4),
        neighbours: [8, 9, 12, 14, 18, 19],
        owner: 0
    }, {
        id: 14,
        x: xStartPos + (xDelta * 4),
        y: yStartPos + (yDelta * 4),
        neighbours: [9, 13, 19, 20],
        owner: 0
    },
    // Sixth line
    {
        id: 15,
        x: xStartPos - (xDelta * 5),
        y: yStartPos + (yDelta * 5),
        neighbours: [10, 16],
        owner: 2
    }, {
        id: 16,
        x: xStartPos - (xDelta * 3),
        y: yStartPos + (yDelta * 5),
        neighbours: [10, 11, 15, 17],
        owner: 0
    }, {
        id: 17,
        x: xStartPos - (xDelta * 1),
        y: yStartPos + (yDelta * 5),
        neighbours: [11, 12, 16, 18],
        owner: 0
    }, {
        id: 18,
        x: xStartPos + (xDelta * 1),
        y: yStartPos + (yDelta * 5),
        neighbours: [12, 13, 17, 19],
        owner: 0
    }, {
        id: 19,
        x: xStartPos + (xDelta * 3),
        y: yStartPos + (yDelta * 5),
        neighbours: [13, 14, 18, 20],
        owner: 0
    }, {
        id: 20,
        x: xStartPos + (xDelta * 5),
        y: yStartPos + (yDelta * 5),
        neighbours: [14, 19],
        owner: 3
    }
];