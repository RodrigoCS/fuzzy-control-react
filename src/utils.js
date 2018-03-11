import { YStateMachine } from 'constants'
export function getYValue(selectedIndex, index) {
    return YStateMachine[selectedIndex][index]
}

export function init2DArray(w, h, val) {
    let arr = [];
    for (let i = 0; i < h; i++) {
        arr[i] = [];
        for (let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}